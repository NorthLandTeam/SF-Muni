'use strict';

/**
 * @ngdoc service
 * @name SFM.routeService
 * @description
 * # routeService
 * Factory in the SFM.
 */
angular.module('SFM')
.factory('routeService', [function() {
	function renderRoute(svg, projection, routeData) {
		var routeLineFunction = d3.svg.line()
		.x(function(d) { return projection([d.$.lon,d.$.lat])[0]; })
		.y(function(d) { return projection([d.$.lon,d.$.lat])[1]; })
		.interpolate('linear');

		return $.each(routeData.path,function(key,path){
					svg.append('path')
						.attr("d", routeLineFunction(path.point) )
						.attr("class", "route" )
						.attr("data-tag", routeData.$.tag )
						.attr("stroke", '#' + routeData.$.color )
						.attr("stroke-width", 2)
						.style("stroke-opacity", 0.3)
						.attr("fill", "none");

					svg.append("path")
						.attr("d", routeLineFunction(path.point) )
						.attr("data-tag", routeData.$.tag )
						.attr("stroke", 'transparent' )
						.attr("stroke-width", 10)
						.attr("fill", "none")
						.each( function(){
							$(this).tooltip({
								'title': routeData.$.title,
								'space': 40
							});
						})
						/*
						.on('mouseenter', function(){
							route.select(routeData.$.tag)
						})
						.on('mouseleave', route.deselect );
						*/
						console.log(svg);
						return svg;

		});
	}

	return {
		renderRoute: renderRoute
	};
}]);