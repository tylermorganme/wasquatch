// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

var imgURLstr = 'https://[%farm%].staticflickr.com/[%server%]/[%id%]_[%sercret%].jpg';
var flickrAPIURL = 'https://api.flickr.com/services/rest/';

var nytAPIKey = "2bdef7d706bc8030ab9d2d31b5580154:7:70540436";
var nytAPIURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";


var $list = $('#location-list');
var $window = $(window);
var $map = $('.map-container');

$(function() {
	resize();
	$window.resize(resize);
	$('#menu-toggle span').click(function(){
		$(this).toggleClass("icon-search").toggleClass("icon-cross");
		$('#list-view').toggleClass("hidden-left");
		$('.map-container').toggleClass("full");
	});

});

var resize = function() {
	var w = $window.width();
	$list.height($window.height() - 50);
	$list.css({"padding-top": 0, "top": "50px"});
}

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
	lng: -118.9000,
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
	lng: -121.9000,
	sightings: 17
	},
	{
	county: "Yakima",
	lat: 46.4600,
	lng: -120.7400,
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
	self.Location = function(title, lat, lng, count) {
	  	var _location = this;
	  	this.county = title;
	  	this.lat = lat;
	  	this.lng = lng;
	  	this.visible = ko.observable(true);
	  	this.count = count;
	  	this.html = '<h3>' + title + '</h3>' +
		    '<h5>Sightings: ' + count + '</h5>' +
		    '<p>[%message%]</p>' +
	  		'<div class="images"><img src="[%image%]"></div>',

	  	this.setIconPath = function(count) {
	  		if (count > 49) {
	  			return 'http://maps.google.com/mapfiles/kml/pal3/icon37.png';
	  		} else if (count > 0) {
	  			return 'http://maps.google.com/mapfiles/kml/pal3/icon45.png';
	  		}
	  		return 'http://maps.google.com/mapfiles/kml/pal2/icon4.png';
 	  	};

	  	this.marker = new google.maps.Marker({
		    position: new google.maps.LatLng(lat,lng),
		    visible: true,
		    map: self.map,
		    //animation: google.maps.Animation.DROP,
		    title: title,
		    sightings: count,
		    icon: _location.setIconPath(_location.count)
	  		});
	  	this.infowindow = new google.maps.InfoWindow({
			content: "There is currently no data.",
			maxWidth: 250
		});
		this.click = function() {
			_location.getLocationData("bigfoot,sasquatch,yeti");
	    	_location.marker.setIcon('http://maps.google.com/mapfiles/kml/pal4/icon47.png');
		};
	  	google.maps.event.addListener(this.marker, 'click', function() {
	    	_location.click();
		});
	  	google.maps.event.addListener(this.infowindow, 'closeclick', function() {
	    	_location.marker.setIcon(_location.setIconPath(_location.count));
		});

		this.getLocationData = function(tags) {
			$.ajax({
				url: flickrAPIURL,
				type: 'POST',
				data: {
					method: 'flickr.photos.search',
					api_key: '77557c7eaccf5752d7dbe6a356f98f36',
					tags: tags,
					sort: 'interestingness-desc',
					has_geo: 1,
					content_type: 1,
					lat: _location.lat,
					lon: _location.lng,
					radius: 32,
					format: 'json',
					nojsoncallback: 1
				},
				success: function(rsp) {
					if (rsp.photos.photo.length === 0) {
						_location.infowindow.setContent(_location.html
							.replace('[%image%]', 'http://upload.wikimedia.org/wikipedia/commons/f/f6/Swiss_National_Park_131.JPG')
							.replace('[%message%]', "We couldn't find any pictures... but I'm sure the Wasquatch is out there somewhere!"));
	    				_location.infowindow.open(self.map, _location.marker);
						return;
					}
					_location.photos = rsp.photos.photo;
					var imgURLstr = 'https://farm[%farm%].staticflickr.com/[%server%]/[%id%]_[%sercret%]_q.jpg';
					_location.img = imgURLstr.replace('[%farm%]', _location.photos[0].farm)
						.replace('[%server%]', _location.photos[0].server)
						.replace('[%id%]', _location.photos[0].id)
						.replace('[%sercret%]', _location.photos[0].secret);
					_location.infowindow.setContent(_location.html
						.replace('[%image%]', _location.img)
						.replace('[%message%]', "Here is the latest pic of a Wasquatch for this area."));
	    			_location.infowindow.open(self.map, _location.marker);
				},
				error: function() {
					_location.infowindow.setContent(_location.html
							.replace('[%image%]', 'http://upload.wikimedia.org/wikipedia/commons/f/f6/Swiss_National_Park_131.JPG')
							.replace('[%message%]', "We couldn't find any pictures... but I'm sure the Wasquatch is out there somewhere!"));
	    				_location.infowindow.open(self.map, _location.marker);
    				_location.infowindow.open(self.map, _location.marker);
				}
			});
		}
	}

	this.setLocations = function(locations) {
		var length = locations.length;
		var loc;
		for (var i = 0; i < length; i++){
			loc = locations[i];
			self.locations.push(new self.Location(loc.county, loc.lat, loc.lng, loc.sightings));
		}
		self.resizeMap();
	}

	this.resizeMap = function() {
		var length = self.locations().length;
		var bounds = new google.maps.LatLngBounds();
		for(i=0;i<length;i++) {
			bounds.extend(self.locations()[i].marker.getPosition());
		}
		self.map.fitBounds(bounds);
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
		var loc;
		for (var i = 0; i < length; i++) {
			loc = self.locations()[i];
			loc.visible(model.fuzzyCompare(term, loc.county));
			loc.marker.setVisible(loc.visible());
			if (!model.fuzzyCompare(term, loc.county)) {
				loc.infowindow.close();
				loc.marker.setIcon(loc.setIconPath(loc.count));
			}
		}
	});
};

ko.applyBindings(new ViewModel());

