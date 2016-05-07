'use strict';

var Interaction = {
	selectedRoutes: [],
	selectRoute: function(routeTag) {
		var route = '.route[data-tag="' + routeTag + '"]';
		this.selectedRoutes.push(route);
		//var vehicleClass = '.' + vehicle.className + '[data-route-tag="' + routeTag + '"]';

		d3.selectAll('.map').style("stroke-opacity", 0.3);
		d3.selectAll('.route:not(.selected)').style("stroke-opacity", 0.05).attr("stroke-width", 2);
		//d3.selectAll('.' + vehicle.className + ':not(.active)').vehicleHide();
		d3.selectAll(route).style("stroke-opacity", 1).attr("stroke-width", 5);
		//d3.selectAll( vehicleClass ).vehicleShow();
	},

	deSelectRoute: function(routeTag) {
		var route = '.route[data-tag="' + routeTag + '"]';
		var index = this.selectedRoutes.indexOf(route);
		this.selectedRoutes.splice(index,1);

		console.log(this.selectedRoutes);
		if(this.selectedRoutes.length === 0) {
			d3.selectAll('.map').style("stroke-opacity", 0.8);
			d3.selectAll('.route').style("stroke-opacity", 1).attr("stroke-width", 5);
		} else {
			d3.selectAll(route).style("stroke-opacity", 0.05).attr("stroke-width", 2);

		}
	}
}