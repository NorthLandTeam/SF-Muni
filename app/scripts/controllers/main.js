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
    $scope.int = {};

	if(!$scope.routes) {
		muniService.fetchRouteData().then(function(data) {
			$scope.routes = data.route;
		});
	}

	$scope.makeHexColor = function(hex) {
		return ('#' + hex);
	};
  }]);
