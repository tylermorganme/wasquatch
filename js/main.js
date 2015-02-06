// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

var imgURLstr = 'https://[%farm%].staticflickr.com/[%server%]/[%id%]_[%sercret%].jpg';
var apiURL = 'https://api.flickr.com/services/rest';
$.ajax({
	url: apiURL,
	type: 'GET',
	data: {
		method: 'flickr.photos.search',
		format: 'json',
		lat: 48.858844,
		lng: 2.294351,
		api_key: '77557c7eaccf5752d7dbe6a356f98f36'
	},
	success: function(response) {
		console.log(response);
	}
});

var model = {
	countySightings: [
	{
	county: "Adams",
	lat: 46.9900,
	lng: -118.5600,
	sightings: 0
	},
	{
	county: "Asotin",
	lat: 46.1800,
	lng: -117.1900,
	sightings: 0
	},
	{
	county: "Benton",
	lat: 46.2500,
	lng: -119.5000,
	sightings: 2
	},
	{
	county: "Chelan",
	lat: 47.8800,
	lng: -120.6400,
	sightings: 16
	},
	{
	county: "Clallam",
	lat: 48.1125,
	lng: -123.4408,
	sightings: 16
	},
	{
	county: "Clark",
	lat: 45.7700,
	lng: -122.4800,
	sightings: 9
	},
	{
	county: "Columbia",
	lat: 47.8800,
	lng: -120.6400,
	sightings: 4
	},
	{
	county: "Cowlitz",
	lat: 46.1900,
	lng: -122.6800,
	sightings: 15
	},
	{
	county: "Douglas",
	lat: 47.7400,
	lng: -119.6900,
	sightings: 0
	},
	{
	county: "Ferry",
	lat: 48.4700,
	lng: -118.5100,
	sightings: 5
	},
	{
	county: "Franklin",
	lat: 46.5400,
	lng: 118.9000,
	sightings: 0
	},
	{
	county: "Garfield",
	lat: 46.475,
	lng: -117.601111,
	sightings: 0
	},
	{
	county: "Grant",
	lat: 47.2100,
	lng: -119.4700,
	sightings: 0
	},
	{
	county: "Grays Harbor",
	lat: 47.1500,
	lng: -123.8300,
	sightings: 41
	},
	{
	county: "Island",
	lat: 48.1500,
	lng: -122.5800,
	sightings: 5
	},
	{
	county: "Jefferson",
	lat: 47.8400,
	lng: -123.5800,
	sightings: 21
	},
	{
	county: "King",
	lat: 47.4700,
	lng: -121.8400,
	sightings: 45
	},
	{
	county: "Kitsap",
	lat: 47.6400,
	lng: -122.6500,
	sightings: 15
	},
	{
	county: "Kittitas",
	lat: 47.1200,
	lng: -120.8600,
	sightings: 17
	},
	{
	county: "Klickitat",
	lat: 45.8700,
	lng: -120.7900,
	sightings: 9
	},
	{
	county: "Lewis",
	lat: 46.5800,
	lng: -122.4000,
	sightings: 40
	},
	{
	county: "Lincoln",
	lat: 47.5700,
	lng: -118.4100,
	sightings: 2
	},
	{
	county: "Mason",
	lat: 47.3500,
	lng: -123.1800,
	sightings: 21
	},
	{
	county: "Okanogan",
	lat: 48.5500,
	lng: -119.7500,
	sightings: 17
	},
	{
	county: "Pacific",
	lat: 46.5600,
	lng: -123.7800,
	sightings: 6
	},
	{
	county: "Pend Oreille",
	lat: 48.5300,
	lng: -117.2280,
	sightings: 7
	},
	{
	county: "Pierce",
	lat: 47.0500,
	lng: -122.1100,
	sightings: 69
	},
	{
	county: "San Juan",
	lat: 48.533333,
	lng: -123.083333,
	sightings: 0
	},
	{
	county: "Skagit",
	lat: 48.4800,
	lng: -121.7800,
	sightings: 10
	},
	{
	county: "Skamania",
	lat: 46.0300,
	lng: -121.9100,
	sightings: 54
	},
	{
	county: "Snohomish",
	lat: 48.0400,
	lng: -121.7100,
	sightings: 54
	},
	{
	county: "Spokane",
	lat: 47.6200,
	lng: -117.4000,
	sightings: 3
	},
	{
	county: "Stevens",
	lat: 48.4000,
	lng: -117.8500,
	sightings: 8
	},
	{
	county: "Thurston",
	lat: 46.9300,
	lng: -122.8300,
	sightings: 16
	},
	{
	county: "Wahkiakum",
	lat: 46.2900,
	lng: -123.4300,
	sightings: 2
	},
	{
	county: "Walla Walla",
	lat: 46.2300,
	lng: -118.4800,
	sightings: 14
	},
	{
	county: "Whatcom",
	lat: 48.8300,
	lng: 121.9000,
	sightings: 17
	},
	{
	county: "Yakima",
	lat: 46.4600,
	lng: 120.7400,
	sightings: 24
	}
	],
	fuzzyCompare: function(search, inStr) {
		var lengthSearch = search.length;
		var lengthInStr = inStr.length;
		var found;
		for (var i = 0; i < lengthSearch; i++) {
			for (var j = 0; j < lengthInStr; j++) {
				found = false;
				if (search[i].toLowerCase() === inStr[j].toLowerCase()) {
					found = true;
					break;
				}
			}
			if (!found) return false;
		}
		return true;
	},
	getFuzzyMatches: function(search) {
		if (!search) return model.countySightings;
		var length = model.countySightings.length;
		var result = [];
		for (var i = 0; i < length; i++) {
			if(model.fuzzyCompare(search, model.countySightings[i].county)) {
				result.push(model.countySightings[i]);
			}
		}
		return result;
	}
};

var ViewModel = function(){
	var self = this;

	self.locations = ko.observableArray([]);

	this.mapOptions = {
		center: {lat: 47.5000, lng: -120.5000},
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: true,
		mapTypeControl: true,
		scaleControl: true,
		streetViewControl: true,
		overviewMapControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.DEFAULT
		}
	}

	self.map = new google.maps.Map(document.getElementById('map-canvas'),self.mapOptions);

	self.searchTerm = ko.observable();

	// Add a marker to the map and push to the array.
	self.Location = function(title, lat, lng) {
	  	this.county = title;
	  	this.marker = new google.maps.Marker({
		    position: new google.maps.LatLng(lat,lng),
		    visible: true,
		    map: self.map,
		    animation: google.maps.Animation.DROP
	  		});
	}

	this.setLocations = function(locations) {
		var length = locations.length;
		var location;
		for (var i = 0; i < length; i++){
			location = locations[i];
			self.locations.push(new self.Location(location.county, location.lat, location.lng));
		}
	}

	// Sets the map on all markers in the array.
	this.setAllMap = function (map) {
		var length = self.markers().length;
		for (var i = 0; i < length; i++) {
			self.markers()[i].setMap(map);
		}
	}

	// Removes the markers from the map, but keeps them in the array.
	this.clearMarkers = function() {
	  this.setAllMap(null);
	}

	// Shows any markers currently in the array.
	this.showMarkers = function() {
	  this.setAllMap(map);
	}

	// Deletes all markers in the array by removing references to them.
	this.deleteMarkers = function() {
	  this.clearMarkers();
	  self.markers([]);
	}

	this.setLocations(model.countySightings);

	this.searchTerm.subscribe(function(term) {
		var length = self.locations().length;
		var location;
		for (var i = 0; i < length; i++) {
			self
			.locations()[i]
			.marker
			.setVisible(model.fuzzyCompare(term, self.locations()[i].county));
		}
	});
};

ko.applyBindings(new ViewModel());

