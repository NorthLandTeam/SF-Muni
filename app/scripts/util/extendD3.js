'use strict';

/* Map visibility */
d3.selection.prototype.hide = function() {
	return this.style("visibility", "hidden");
};

d3.selection.prototype.show = function() {
	return this.style("visibility", "visible");
};

d3.selection.prototype.hideMap = function() {
	return this.style("stroke-opacity", 0.5);
};

d3.selection.prototype.showMap = function() {
	return this.style("stroke-opacity", 0.7);
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
d3.selection.prototype.routeShow = function() {
	return this.style("stroke-opacity", 1).attr("stroke-width", 3);
};

d3.selection.prototype.routeHide = function() {
	return this.style("stroke-opacity", 0.05).attr("stroke-width", 2);
};

d3.selection.prototype.routeNormal = function() {
	return this.style("stroke-opacity", 0.3).attr("stroke-width", 2);
};

/* Buses */
d3.selection.prototype.drawVehicle = function( json ) {
	var draw = this
		.data(json);

	/*
		TODO: IMPROVE ARROW DIRECTION WITH
		ANGLE: d.$.heading
	 */
	draw.enter()
		.append( 'circle' )
		.attr("r", "4px")
		.attr("fill", "black");

	draw.exit()
		.remove();


	draw.attr("class", vehicle.className )
		.attr("data-route-tag", function (d) { return d.$.routeTag; } )
		.attr("data-dir-tag", function (d) { return d.$.dirTag; } )
		.attr("data-heading", function (d) { return d.$.heading; } )
		.attr("data-id", function (d) { return d.$.id; } )
		.each(function(d,i){
			var dirTag = d.$.dirTag,
				dirTitle = false,
				route = webservice.routeConfigStorage[d.$.routeTag];
			if(route ){
				if(route.direction ){
					if( route.direction.$){
						if(route.direction.$.tag == dirTag){
							dirTitle = route.direction.$.title;
						} else {
							dirTitle = route.$.title;
						}
					} else {
						$.each(route.direction,function(k,v){
							if(v.$.tag == dirTag){
								dirTitle = v.$.title;
							} else {
								dirTitle = route.$.title;
							}
						})
					}
				}

				$(this).popover({
					'title': dirTitle ? dirTitle : ( route.$.title ? route.$.title : d.$.routeTag ),
					'content': popoverTemplate( d.$ ),
					'placement': 'top'
				});
			}
		})
		.on('mouseenter', function(d){
			route.select(d.$.routeTag)
		})
		.on('mouseleave', route.deselect )
		.transition()
		.attr("cx", function (d) { return projection([d.$.lon,d.$.lat])[0]; })
		.attr("cy", function (d) { return projection([d.$.lon,d.$.lat])[1]; })

	return draw;
};

d3.selection.prototype.vehicleShow = function() {
	return this.style("opacity", 1);
};

d3.selection.prototype.vehicleHide = function() {
	return this.style("opacity", 0.3);
};