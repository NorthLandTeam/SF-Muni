'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:map
 * @description
 * # map
 */
angular.module('SFM')
	.directive('map', ['d3Service', function(d3Service) {
    	return {
			restrict: 'EA',
			scope: {},
			link: function(scope, element, attrs) {
				var height = element[0].parentNode.offsetHeight;
				element[0].style.height = height - 100 + 'px';
				d3Service.d3().then(function(d3) {
					var width = element[0].style.width,
    					height = element[0].style.height;

					var zoom = d3.behavior.zoom()
								 .scaleExtent([-.15, 7]);

					var projection = d3.geo.mercator()
											.scale(200000)
											.center([-122.38, 37.75]);

					//Define path generator
					var path = d3.geo.path()
					    		 .projection(projection);

					var svg = d3.select('.map-container').append('svg')
								.attr('width', '100%')
								.attr('height', '100%')
								.call(zoom.on('zoom', redraw));

					d3.json('../maps/streets.json', function(error, json) {
						drawMap(svg, json, 'streets', path);

						d3.json('../maps/arteries.json', function(error, json) {
							drawMap(svg, json, 'arteries', path);

							d3.json('../maps/freeways.json', function(error, json) {
								drawMap(svg, json, 'freeways', path);

								d3.json('../maps/neighborhoods.json', function(error, json) {
									drawMap(svg, json, 'neighborhoods', path);

									//mapsLoaded();
								});
							});
						});
					});
				});
	}};
}]);