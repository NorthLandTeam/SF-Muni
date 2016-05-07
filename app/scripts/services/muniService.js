'use strict';

/**
 * @ngdoc service
 * @name SFM.muniService
 * @description
 * # muniService
 * Factory in the SFM.
 */
angular.module('SFM')
.factory('muniService', ['$http', '$q', function($http, $q) {
	function fetchData(url) {
		var deferred = $q.defer();

		$http.get(url)
			 .success(function(data) {
			 	var json = $.xml2json(data);
			 	deferred.resolve(json.body);
			 })
			 .error(function(error) {
			 	deferred.reject(error);
			 });

		return deferred.promise;
	}

	function fetchRouteData(routeTag) {
		return fetchData(routeConfigUrl(routeTag));
	}

	function fetchBusData(routeTag) {
		return fetchData(busConfigUrl(routeTag));
	}

	return {
		fetchRouteData: fetchRouteData,
		fetchBusData: fetchBusData
	};
}]);
