'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:menu
 * @description
 * # menu
 */

angular.module('SFM')
  	.directive('menu', ['$interval', 'muniService', 'interactionService', 
      function($interval, muniService, interactionService) {
      	return {
  	      restrict: 'EA',
  	      // isolate scope from parents's
  	      replace: true,
  	      //controller: controller,
  	      //controllerAs: 'routeCtr',
      	  templateUrl: '/views/menu.html',
          link: function(scope, element, attrs) {
            $('.sidenav').on({
                mouseenter: function() {
                              var routeTag = $(this).data('tag');
                              interactionService.selectRoute(routeTag);
                            }, 
                mouseleave: function() {
                            var routeTag = $(this).data('tag');
                            interactionService.deSelectRoute(routeTag);
                          }
            }, 'li');

            $('.sidenav').on('click', 'li', function() {
                var hasClass = $(this).hasClass('selected');
                var routeTag = $(this).data('tag');

                if(hasClass) {
                  $(this).removeClass('selected');
                  interactionService.deSelectRoute(routeTag);
                } else {
                  $(this).addClass('selected');
                  interactionService.selectRoute(routeTag);
                }
            });

            //some animation
            $('#tm').on('click', function() {
              $('.jumbotron').toggleClass('focusOnPage');
            });

          }
  	  	};
}]);
