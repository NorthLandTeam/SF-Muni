'use strict';

/**
 * @ngdoc overview
 * @name SFM
 * @description
 * # SFM
 *
 * Main module of the application.
 */
angular
  .module('SFM', [
    'ngResource',
    'ngRoute',
    'd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
