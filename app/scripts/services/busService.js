'use strict';

/**
 * @ngdoc service
 * @name SFM.busService
 * @description
 * # busService
 * Factory in the SFM.
 */
angular.module('SFM')
	.factory('busService', ['mapService', function(mapService){
		var className = 'bus';
		var projection = mapService.projection;

		function getLocation (argument) {
			return ;
		}

		function renderBuses(svg, busData) {
			if(!busData) {
				return;
			} 
			var busTag = '.' + className;
			var routeTag = busData.routeTag;
			var lon = parseFloat(busData.lon);
			var lat = parseFloat(busData.lat);
			//console.log(busData);

			if(routeTag) {
				busTag += '[data-route-tag="' + routeTag + '"]';
			}

			/*
				TODO: IMPROVE ARROW DIRECTION WITH
				ANGLE: d.$.heading
			 */
			svg.append('circle')
					.attr('r', 6)
					.attr('fill', 'black')
					.attr("class", className)
					.attr("data-route-tag", routeTag)
					.attr("data-dir-tag", busData.dirTag)
					.attr("data-heading", busData.heading)
					.attr("data-id", busData.id)
					.transition()
					.attr("cx", function (d) { return projection([lon,lat])[0]; })
					.attr("cy", function (d) { return projection([lon,lat])[1]; });
		}

		return {
			renderBuses: renderBuses
		};
	}])