'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:map
 * @description
 * # map
 */
angular.module('SFM')
	.directive('map', ['d3Service', 'muniService', 'mapService', 'routeService', function(d3Service, muniService, mapService, routeService) {
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

					var zoom = d3.behavior.zoom()
								 .scaleExtent([-1, 2]);

					var projection = mapService.projection;

					//Define path generator
					var path = mapService.getPathWithProjection(projection);

					var svg = mapService.getSvg(zoom, redraw);

					d3.json('../maps/streets.json', function(error, json) {
						DrawMap.drawMap(svg, json, 'streets', path);

						d3.json('../maps/arteries.json', function(error, json) {
							drawMap(svg, json, 'arteries', path);

							d3.json('../maps/freeways.json', function(error, json) {
								drawMap(svg, json, 'freeways', path);

								d3.json('../maps/neighborhoods.json', function(error, json) {
									drawMap(svg, json, 'neighborhoods', path);

									scope.$watch('routes', function() {
										var routes = scope.routes;
										$.each(routes, function(key, value) {
											routeService.renderRoute(svg, projection, value);
										});
									})
								});
							});
						});
					});
				});
			}
		};
}]);