'use strict';

var Interaction = {
	selectedRoutes: [],
	selectRoute: function(routeTag) {
		var route = '.route[data-tag="' + routeTag + '"]';
		var buses = '.bus' + '[data-route-tag="' + routeTag + '"]';
		this.selectedRoutes.push(route);

		d3.selectAll('.map').style("stroke-opacity", 0.3);
		d3.selectAll('.route').style("stroke-opacity", 0.05).attr("stroke-width", 2);

		$.each(this.selectedRoutes, function(key, route) {
			d3.selectAll(route).style("stroke-opacity", 1).attr("stroke-width", 5);
		})
		d3.selectAll('.bus').style("opacity", 0.25);
		d3.selectAll(buses).style("opacity", 1);
	},

	deSelectRoute: function(routeTag) {
		var route = '.route[data-tag="' + routeTag + '"]';
		var buses = '.bus' + '[data-route-tag="' + routeTag + '"]';
		var index = this.selectedRoutes.indexOf(route);
		this.selectedRoutes.splice(index,1);

		if(this.selectedRoutes.length === 0) {
			d3.selectAll('.map').style("stroke-opacity", 0.8);
			d3.selectAll('.route').style("stroke-opacity", 1).attr("stroke-width", 5);
			d3.selectAll('.bus').style("opacity", 0.75);
		} else {
			d3.selectAll(route).style("stroke-opacity", 0.05).attr("stroke-width", 2);
			d3.selectAll(buses).style("opacity", 0.25);

		}
	}
}