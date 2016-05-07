'use strict';

function drawMap(svg, json, className, path) {
	return svg
				.append('path')
				.datum(json)
				.attr('class', 'map ' + className)
				.style('fill', 'none')
				.attr('d', path);
}

function redraw() {
	var trans = d3.event.translate;
	var scale = d3.event.scale;
	d3.selectAll('path, circle').attr('transform', 'translate(' + trans + ')' + ' scale(' + scale + ')');
}

/* Routes */
