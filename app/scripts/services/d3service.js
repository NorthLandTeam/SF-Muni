'use strict';

/**
 * @ngdoc d3
 * @name d3.D3Service
 * @description
 * # D3Service
 * Factory in the d3.
 */
angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        window.d3.selection.prototype.drawBuses = function(busData, projection) {
			var buses = this.data(busData);

			/*
				TODO: IMPROVE ARROW DIRECTION WITH
				ANGLE: d.$.heading
			 */
			buses.enter()
				.append('svg:path')
				.attr('d', 'M0,0l-8.8-17.7C-12.1-24.3-7.4-32,0-32h0c7.4,0,12.1,7.7,8.8,14.3L0,0z')
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
				});
				/*
				.append("svg:title")
				.text(function(d) { 
					return d.$.id + ' to ' + d.$.dirTag;
				});
				*/	


			return buses;
		};
		
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'bower_components/d3/d3.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;
 
      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);
 
      return {
        d3: function() { return d.promise; }
      };
}]);
