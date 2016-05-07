'use strict';

/**
 * @ngdoc directive
 * @name SFM.directive:menu
 * @description
 * # menu
 */

angular.module('SFM')
  	.directive('menu', ['muniService', function(muniService) {
    	return {
	      restrict: 'EA',
	      // isolate scope from parents's
	      replace: true,
	      //controller: controller,
	      //controllerAs: 'routeCtr',
    	  templateUrl: '/views/menu.html',
        link: function(scope, element, attrs) {
          //todo 
          $('.sidenav li').hover(function() {

          }, function() {
            
          });

          $('.sidenav').on('click', 'li', function() {
              var hasClass = $(this).hasClass('selected');
              var routeTag = $(this).data('tag');

              if(hasClass) {
                $(this).removeClass('selected');
                Interaction.deSelectRoute(routeTag);
              } else {
                // TODO: selected route(s):
                // add class selected to li (checked)
                // hide unselected routes on map (checked)
                // hide buses of unselected routes on map
                $(this).addClass('selected');
                Interaction.selectRoute(routeTag);
              }
          });
        }
	  	};
}]);
