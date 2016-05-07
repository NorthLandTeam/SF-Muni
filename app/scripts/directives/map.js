'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:map
 * @description
 * # map
 */
angular.module('SFM')
	.directive('map', ['d3Service', 'muniService', 'mapService', 'routeService', 'busService', function(d3Service, muniService, mapService, routeService, busService) {
    	return {
			restrict: 'EA',
			link: function(scope, element, attrs) {
				var height = element[0].parentNode.offsetHeight;
				element[0].style.height = height - 100 + 'px';

				d3Service.d3().then(function(d3) {
					var width = element[0].style.width,
    					height = element[0].style.height;

    				var drawMap = DrawMap.drawMap,
    					redraw = DrawMap.redraw;

					var zoom = mapService.zoom,
						projection = mapService.projection,
						path = mapService.getPathWithProjection(projection),
						svg = mapService.getSvg()
									.call(zoom.on("zoom", redraw));

					d3.json('../maps/streets.json', function(error, json) {
						drawMap(svg, json, 'streets', path);

						d3.json('../maps/arteries.json', function(error, json) {
							drawMap(svg, json, 'arteries', path);

							d3.json('../maps/freeways.json', function(error, json) {
								drawMap(svg, json, 'freeways', path);

								d3.json('../maps/neighborhoods.json', function(error, json) {
									drawMap(svg, json, 'neighborhoods', path);

									muniService.fetchRouteData().then(function(data) {
										scope.routes = data.route;
										renderRoutes(svg, scope.routes);
										fetchBusData(svg, scope.buses, scope.routes);
									});
								});
							});
						});
					});
				});

				function fetchBusData(svg, store, routes) {
					$.each(routes, function(key, value) {
						var tag = value.$.tag;

						muniService.fetchBusData(tag).then(function(data) {
							var vehicles = data.vehicle;
							$.each(vehicles, function(key, value) {
								//console.log(value.$);
								store.push(value.$);
							});
							renderBuses(svg, scope.buses);
						});
					});
				}

				function renderRoutes(svg, routes) {
					$.each(routes, function(key, value) {
						routeService.renderRoute(svg, value);
					});
				}

				function renderBuses(svg, buses) {
					$.each(buses, function(key, value) {
						busService.renderBuses(svg, value);
					});
				}
			}
		};
}]);