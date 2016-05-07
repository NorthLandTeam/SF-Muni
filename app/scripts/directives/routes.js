'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:routes
 * @description
 * # routes
 */

angular.module('SFM')
	.directive('routes', function() {
		return {
			require: 'map',
			link: function(scope, element, attrs, main) {
				console.log(main.awesomeThings);
			}
		}

});