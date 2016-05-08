'use strict';

/* Buses */
d3.selection.prototype.drawVehicle = function(busData, projection) {
	var draw = this.data(busData);

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


	draw.attr("class", 'bus')
		.attr("data-route-tag", function (d) { 
			if(!d.$) {return; } 
			return d.$.routeTag; 
		})
		.attr("data-dir-tag", function (d) { 
			if(!d.$) {return; } 
			return d.$.dirTag; 
		})
		.attr("data-heading", function (d) { 
			if(!d.$) {return; } 
			return d.$.heading; 
		})
		.attr("data-id", function (d) { 
			if(!d.$) {return; } 
			return d.$.id; 
		})
		/*
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
		*/
		.attr("cx", function (d) { 
			if(!d.$) {return; } 
			return projection([d.$.lon,d.$.lat])[0]; 
		})
		.attr("cy", function (d) { 
			if(!d.$) {return; } 
			return projection([d.$.lon,d.$.lat])[1]; 
		})

	return draw;
};

d3.selection.prototype.vehicleShow = function() {
	return this.style("opacity", 1);
};

d3.selection.prototype.vehicleHide = function() {
	return this.style("opacity", 0.3);
};