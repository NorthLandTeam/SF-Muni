'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:map
 * @description
 * # map
 */
angular.module('SFM')
	.directive('map', ['d3Service', 'mapService', 'routeService', function(d3Service, mapService, routeService) {
		function controller(routeService, $scope) {
			$scope.routes = JSON.parse(localStorage.getItem('routes'));
		}

    	return {
			restrict: 'EA',
			scope: {},
			controller: controller,
			controllerAs: 'mapCtr',
			link: function(scope, element, attrs) {
				var height = element[0].parentNode.offsetHeight;
				element[0].style.height = height - 100 + 'px';

				d3Service.d3().then(function(d3) {
					var width = element[0].style.width,
    					height = element[0].style.height;

					var zoom = d3.behavior.zoom()
								 .scaleExtent([-1, 2]);

					var projection = mapService.projection;

					console.log(projection);

					//Define path generator
					var path = mapService.getPathWithProjection(projection);

					var svg = mapService.getSvg(zoom, redraw);

					d3.json('../maps/streets.json', function(error, json) {
						drawMap(svg, json, 'streets', path);

						d3.json('../maps/arteries.json', function(error, json) {
							drawMap(svg, json, 'arteries', path);

							d3.json('../maps/freeways.json', function(error, json) {
								drawMap(svg, json, 'freeways', path);

								d3.json('../maps/neighborhoods.json', function(error, json) {
									drawMap(svg, json, 'neighborhoods', path);

									var routes = scope.routes;
									console.log(routes);
									$.each(routes, function(key, value) {
										routeService.renderRoute(svg, projection, value);
									});
								});
							});
						});
					});
				});
			}
		};
}]);