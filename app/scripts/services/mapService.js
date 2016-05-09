'use strict';

/**
 * @ngdoc service
 * @name SFM.mapService
 * @description
 * # mapService
 * Factory in the SFM.
 */
angular.module('SFM')
		.factory('mapService', function(){
			var projection = d3.geo.mercator()
								.scale(400000)
								.center([-122.45, 37.75]);

			function getPathWithProjection(projection) {
				return d3.geo.path()
						 .projection(projection);
			}

			function drawMap(svg, json, className) {
				var path = getPathWithProjection(projection)
				return svg
						.append('path')
						.datum(json)
						.attr('class', 'map ' + className)
						.style('fill', 'none')
						.attr('d', path);
			}

			function redraw() {
				var trans = d3.event.translate;
				var scale = d3.event.scale;
				d3.selectAll('.map, .route, .bus').attr('transform', 'translate(' + trans[0] + ',' + trans[1] + ')' + ' scale(' + scale + ')');
			}		

			return {
				getSvg: function() {
					return d3.select(".map-container").append("svg")
								.attr("width", '100%')
								.attr("height", '100%');
				},

				projection: projection,

				getPathWithProjection: getPathWithProjection,

				drawMap: drawMap,

				redraw: redraw	
		}
});
