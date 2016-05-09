'use strict';

/**
 * @ngdoc service
 * @name SFM.interactionService
 * @description
 * # interactionService
 * Factory in the SFM.
 */
angular.module('SFM')
		.factory('interactionService', function(){
			var selectedRoutes = [];

			function selectRoute(routeTag) {
				var route = '.route[data-tag="' + routeTag + '"]';
				selectedRoutes.push(route);

				d3.selectAll('.map').style("stroke-opacity", 0.3);
				d3.selectAll('.route').style("stroke-opacity", 0.05).attr("stroke-width", 2);

				$.each(selectedRoutes, function(key, route) {
					d3.selectAll(route).style("stroke-opacity", 1).attr("stroke-width", 5);
				})
				d3.selectAll('.bus').style("opacity", 0.25);
				$.each(selectedRoutes, function(key, value) {
					var routeTag = value.substring(6,12) + 'route-' + value.substring(12);
					console.log(routeTag);
					var buses = '.bus' + routeTag;
					d3.selectAll(buses).style("opacity", 1);
				});
			}

			function deSelectRoute(routeTag) {
				var route = '.route[data-tag="' + routeTag + '"]';
				var buses = '.bus' + '[data-route-tag="' + routeTag + '"]';
				var index = selectedRoutes.indexOf(route);
				selectedRoutes.splice(index,1);

				if(selectedRoutes.length === 0) {
					d3.selectAll('.map').style("stroke-opacity", 0.8);
					d3.selectAll('.route').style("stroke-opacity", 1).attr("stroke-width", 5);
					d3.selectAll('.bus').style("opacity", 0.75);
				} else {
					d3.selectAll(route).style("stroke-opacity", 0.05).attr("stroke-width", 2);
					d3.selectAll(buses).style("opacity", 0.25);

				}
			}
			return {
				selectRoute: selectRoute,
				deSelectRoute: deSelectRoute
			}
		});