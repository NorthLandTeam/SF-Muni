'use strict';

/* Buses */
d3.selection.prototype.drawVehicle = function(busData, projection) {
	var buses = this.data(busData);

	/*
		TODO: IMPROVE ARROW DIRECTION WITH
		ANGLE: d.$.heading
	 */
	buses.enter()
		.append( 'circle' )
		.attr("r", "4px")
		.attr("fill", "black");

	buses.exit()
		.remove();


	buses.attr("class", 'bus')
		.attr("data-route-tag", function (d) { 
			return d.$.routeTag; 
		})
		.attr("data-dir-tag", function (d) { 
			return d.$.dirTag; 
		})
		.attr("data-heading", function (d) { 
			return d.$.heading; 
		})
		.attr("data-id", function (d) { 
			return d.$.id; 
		})
		.attr("cx", function (d) { 
			return projection([d.$.lon,d.$.lat])[0]; 
		})
		.attr("cy", function (d) { 
			return projection([d.$.lon,d.$.lat])[1]; 
		})

	return buses;
};

d3.selection.prototype.vehicleShow = function() {
	return this.style("opacity", 1);
};

d3.selection.prototype.vehicleHide = function() {
	return this.style("opacity", 0.3);
};