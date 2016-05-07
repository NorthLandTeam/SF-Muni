'use strict';

/**
 * @ngdoc function
 * @name SFM.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the SFM
 */
angular.module('SFM')
  .controller('MainCtrl', ['$scope', 'muniService', function ($scope, muniService) {
    if(!localStorage.getItem('routes') || !$scope.routes) {
		muniService.fetchRouteData().then(function(data) {
			localStorage.setItem('routes', JSON.stringify(data.route));
			$scope.routes = data.route;
			console.log(data.route);
		});
	} else {
		$scope.routes = localStorage.getItem('routes');
	}

	$scope.$watch('routes', function() {
		$.each($scope.routes, function(key, value) {
			muniService.fetchBusData(value.$.tag).then(function(data) {
				console.log(data);
			});
		});
	})

	$scope.makeHexColor = function(hex) {
		return ('#' + hex);
	};
  }]);
