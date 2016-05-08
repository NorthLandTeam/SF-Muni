'use strict';

/* Buses */
d3.selection.prototype.drawVehicle = function(busData, projection) {
	var buses = this.data(busData);

	/*
		TODO: IMPROVE ARROW DIRECTION WITH
		ANGLE: d.$.heading
	 */
	buses.enter()
		.append('svg:path')
		.attr('d', 'M0,0l-8.8-17.7C-12.1-24.3-7.4-32,0-32h0c7.4,0,12.1,7.7,8.8,14.3L0,0z')
		//.attr("r", "4px")
		.attr('fill', '#31558d')
		.attr('fill-opacity', '0.75');

	buses.exit()
		.remove();


	buses.attr('class', 'bus')
		.attr('data-route-tag', function (d) {
			return d.$.routeTag; 
		})
		.attr('data-dir-tag', function (d) { 
			return d.$.dirTag; 
		})
		.attr('data-heading', function (d) { 
			return d.$.heading; 
		})
		.attr('data-id', function (d) { 
			return d.$.id; 
		})
		.attr("transform", function(d) {
			return "translate(" 
				+ projection([d.$.lon,d.$.lat])[0] + "," 
				+ projection([d.$.lon,d.$.lat])[1] + ") scale(.75)";
		})
		.append("svg:title")
		.text(function(d) { 
			return d.$.id + ' to ' + d.$.dirTag;
		});

	return buses;
};

d3.selection.prototype.vehicleShow = function() {
	return this.style("opacity", 1);
};

d3.selection.prototype.vehicleHide = function() {
	return this.style("opacity", 0.3);
};