'use strict';

/**
 * @ngdoc d3
 * @name d3.D3Service
 * @description
 * # D3Service
 * Factory in the d3.
 */
angular.module('d3', ['SFM'])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        // need to find a better way to do the extension
        window.d3.selection.prototype.drawBuses = function(busData, projection) {
				var buses = this.data(busData);

				//find it impossible to redraw the pin
				//use simple symbole circle instead
				buses.enter()
					.append('circle')
					.attr('r', 10)
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
					.attr("cx", function (d) { 
						return projection([d.$.lon,d.$.lat])[0]; 
					})
					.attr("cy", function (d) { 
						return projection([d.$.lon,d.$.lat])[1]; 
					});
					/*
					.append("svg:title")
					.text(function(d) { 
						return d.$.id + ' to ' + d.$.dirTag;
					});
					*/	


				return buses;
			};

        $rootScope.$apply(function() { 
        	d.resolve(window.d3); 
        });
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
