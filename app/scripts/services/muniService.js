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
	var routeConfigStore = [];

	function fetchData(url, processedData) {
		var deferred = $q.defer();
		var requestTimes = 0;

		$http.get(url)
			 .success(function(data) {
			 	var json = $.xml2json(data);
			 	deferred.resolve(json.body.route);
			 })
			 .error(function(error) {
			 	deferred.reject(error);
			 });

		return deferred.promise;
	}

	function fetchRouteData(routeTag) {
		return fetchData(routeConfigUrl(routeTag));
	}

	function fetchBusData() {
		return;
	}
	return {
		fetchRouteData: fetchRouteData,
		fetchBusData: fetchBusData
	};
}]);
