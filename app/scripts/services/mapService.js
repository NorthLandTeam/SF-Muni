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
			return {
				getSvg: function(zoom, draw) {
					return d3.select(".map-container").append("svg")
								.attr("width", '100%')
								.attr("height", '100%')
								.call(zoom.on("zoom", draw))
				},
				projection: d3.geo.mercator()
								.scale(200000)
								.center([-122.45, 37.75]),
				getPathWithProjection: function(projection) {
					return d3.geo.path()
    						 .projection(projection);
				}			
		}
});
