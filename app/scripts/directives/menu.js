'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:menu
 * @description
 * # menu
 */

angular.module('SFM')
  	.directive('menu', function() {
    	return {
	      restrict: 'EA',
	      replace: true,
    	  templateUrl: '/views/menu.html'
	  	};
});
