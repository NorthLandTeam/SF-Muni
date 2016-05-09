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
	var basePath = 'http://webservices.nextbus.com/service/publicXMLFeed?';
	var agency = 'sf-muni';

	/* General */
	function formatUrl(data) {
		return basePath + $.param(data);
	}

	/* Routes */
	function routeConfigUrl(routeTag) {
		var routeConfigData = {
			command: 'routeConfig',
			a: agency
		};

		if(routeTag) {
			routeConfigData.r = routeTag;
		}

		return formatUrl(routeConfigData);
	}

	/* Bus */
	function busConfigUrl(routeTag) {
		var busConfigData = {
			command: 'vehicleLocations',
			a: agency,
			r: routeTag,
			t: new Date().valueOf() - 900000
		};
		
		return formatUrl(busConfigData);
	}

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
