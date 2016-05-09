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
				console.log(d3.event.translate);
				console.log(d3.event.scale);
				var trans = d3.event.translate;
				var scale = d3.event.scale;
				d3.selectAll('.map, .route').attr('transform', 'translate(' + trans[0] + ',' + trans[1] + ')' + ' scale(' + scale + ')');
				d3.selectAll('.bus').each(function(){
					var transform = d3.select(this).attr('transform');
					var x = getTranslate(transform)[0] + trans[0];
					var y = getTranslate(transform)[1] + trans[1];
					
					d3.select(this).attr('transform', 'translate(' + x + ',' + y + ')' + ' scale(' + scale + ')')
				})
			}		

			function getTranslate(transform) {
				var translate = transform.split(' ')[0];
				var temp = translate.split(',');

				var x = parseFloat(temp[0].substring(10));
				var y = parseFloat(temp[1].substring(0,temp[1].length-2));

				return [x, y];
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
