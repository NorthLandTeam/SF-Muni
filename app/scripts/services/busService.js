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
			/*
				TODO: IMPROVE ARROW DIRECTION WITH
				ANGLE: d.$.heading
			 */
			var busTag = '.' + className;
			var buses = svg.selectAll('circle').data(busData);
			/*
			if(buses.length === 0) {
				buses = svg
			}*/
			buses
					.enter()
					.append('circle')
					.attr('r', 6)
					.attr('fill', 'black');

			buses.exit().remove();

			buses.attr("class", className)
					.attr("data-route-tag", function (d) { return d.$.routeTag;})
					.attr("data-dir-tag", function (d) { return d.$.busData.dirTag})
					.attr("data-heading", function (d) { return d.$.busData.heading})
					.attr("data-id", function (d) { return d.$.busData.id})
					.transition()
					.attr("cx", function (d) { return projection([d.$.lon,d.$.lat])[0];})
					.attr("cy", function (d) { return projection([d.$.lon,d.$.lat])[1];});
		}

		return {
			renderBuses: renderBuses
		};
	}])