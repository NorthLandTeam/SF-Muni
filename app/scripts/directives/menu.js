'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:menu
 * @description
 * # menu
 */

angular.module('SFM')
  	.directive('menu', ['muniService', function(muniService) {
  		var controller = function($scope) {
  			if(!localStorage.getItem('routes') || !$scope.routes) {
  				muniService.fetchRouteData(false).then(function(routes) {
  					localStorage.setItem('routes', JSON.stringify(routes));
  					$scope.routes = routes;
  					console.log(routes);
  				});
  			}

  			$scope.makeHexColor = function(hex) {
  				return ('#' + hex);
  			};
  		};

    	return {
	      restrict: 'EA',
	      // isolate scope from parents's
	      scope: {},
	      replace: true,
	      controller: controller,
	      controllerAs: 'routeCtr',
    	  templateUrl: '/views/menu.html'
	  	};
}]);
