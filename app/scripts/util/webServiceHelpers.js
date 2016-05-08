'use strict';

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