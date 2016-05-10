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

			function selectRoutes() {
				if(selectedRoutes.length === 0) {
					return;
				} 

				d3.selectAll('.map').style("stroke-opacity", 0.3);
				d3.selectAll('.route').style("stroke-opacity", 0.05).attr("stroke-width", 2);

				$.each(selectedRoutes, function(key, route) {
					var routeTag = '.route[data-tag="' + route + '"]';
					d3.selectAll(routeTag).style("stroke-opacity", 1).attr("stroke-width", 5);
				});

				d3.selectAll('.bus').style("opacity", 0.25);
				$.each(selectedRoutes, function(key, value) {
					console.log(value);
					var buses = '.bus[data-route-tag="' + value + '"]';
					d3.selectAll(buses).style("opacity", 1);
				});

			}

			function selectRoute(routeTag) {
				selectedRoutes.push(routeTag);
				selectRoutes();
			}

			function deSelectRoute(routeTag) {
				var route = '.route[data-tag="' + routeTag + '"]';
				var buses = '.bus[data-route-tag="' + routeTag + '"]';
				var index = selectedRoutes.lastIndexOf(routeTag);
				selectedRoutes.splice(index,1);

				if(selectedRoutes.length === 0) {
					d3.selectAll('.map').style("stroke-opacity", 0.8);
					d3.selectAll('.route').style("stroke-opacity", 1).attr("stroke-width", 2);
					d3.selectAll('.bus').style("opacity", 0.75);
				} else {
					console.log(route, buses);
					d3.selectAll(route).style("stroke-opacity", 0.05).attr("stroke-width", 2);
					d3.selectAll(buses).style("opacity", 0.25);

				}
			}
			return {
				selectedRoutes: selectedRoutes,
				selectRoute: selectRoute,
				selectRoutes: selectRoutes,
				deSelectRoute: deSelectRoute
			}
		});