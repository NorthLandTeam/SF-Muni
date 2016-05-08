'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:map
 * @description
 * # map
 */
angular.module('SFM')
	.directive('map', ['$interval', 'd3Service', 'muniService', 'mapService', 'routeService', 'busService', function($interval, d3Service, muniService, mapService, routeService, busService) {
    	return {
			restrict: 'EA',
			link: function(scope, element, attrs) {
				var height = element[0].parentNode.offsetHeight;
				element[0].style.height = height - 100 + 'px';

				var width = element[0].style.width,
					height = element[0].style.height;

				var drawMap = DrawMap.drawMap,
					redraw = DrawMap.redraw;

				d3Service.d3().then(function(d3) {

				});

				var zoom = d3.behavior.zoom()
							 .scaleExtent([-1, 2]),
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
									fetchBusData(svg, scope.buses, scope.routes, projection);
								});
							});

						});
					});
				});
				$interval(function(){ 
					fetchBusData(svg, scope.buses, scope.routes, projection) 
				},15000);

				function fetchBusData(svg, store, routes, projection) {
					console.log('executed');
					store = [];
					$.each(routes, function(key, value) {
						var tag = value.$.tag;

						muniService.fetchBusData(tag).then(function(data) {
							var vehicles = data.vehicle;
							$.each(vehicles, function(key, value) {
								store.push(value);
								
							});
							//console.log(d3.selection.prototype.drawVehicle);
							svg.selectAll('.bus').drawVehicle(store, projection);
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