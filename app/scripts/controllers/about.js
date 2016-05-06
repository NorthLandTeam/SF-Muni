'use strict';

/**
 * @ngdoc function
 * @name SFM.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the SFM
 */
angular.module('SFM')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
