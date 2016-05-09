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
    //initialize 
	$scope.buses = [];
	muniService.fetchRouteData().then(function(data) {
		$scope.routes = data.route;

		//initialize tooltip
		$('[data-toggle="tooltip"]').tooltip(); 
	});

	$scope.makeHexColor = function(hex) {
		return ('#' + hex);
	};
  }]);
