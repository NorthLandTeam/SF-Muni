'use strict';

/* Map visibility */
d3.selection.prototype.hide = function() {
	return this.style("visibility", "hidden");
};

d3.selection.prototype.show = function() {
	return this.style("visibility", "visible");
};

/* Map rendering */
d3.selection.prototype.drawMap = function(json, className) {
	return this
		.append("path")
		.datum(json)
		.attr("class", 'map ' + className)
		.style("fill", "none")
		.attr("d", path);
};

/* Routes display */
d3.selection.prototype.vehicleShow = function() {
	return this.style("opacity", 1);
};

d3.selection.prototype.vehicleHide = function() {
	return this.style("opacity", 0.3);
};

d3.selection.prototype.routeHide = function() {
	return this.style("stroke-opacity", 0.05).attr("stroke-width", 2);
};

d3.selection.prototype.routeNormal = function() {
	return this.style("stroke-opacity", 0.3).attr("stroke-width", 2);
};

d3.selection.prototype.routeShow = function() {
	return this.style("stroke-opacity", 1).attr("stroke-width", 3);
};

d3.selection.prototype.hideMap = function() {
	return this.style("stroke-opacity", 0.5);
};

d3.selection.prototype.showMap = function() {
	return this.style("stroke-opacity", 0.7);
};