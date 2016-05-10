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

	$scope.$watch('int', function(newV, old){
		console.log('mainctrl', newV, old);
	})

	$scope.makeHexColor = function(hex) {
		return ('#' + hex);
	};
  }]);
