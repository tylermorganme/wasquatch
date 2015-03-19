/**
 * A container to make sure that the DOM is loaded before running the ViewModel code
 */
$(function() {
	ko.applyBindings(new ViewModel());
});

/**
 * The data model for the applications.
 * @type {Object}
 */
var model = {
	/**
	 * An array of objects containing all of the counties in Washignton, their latitude and longitude, and the number of sasquatch sightings according to http://www.bfro.net.
	 * @type {Array}
	 */
	countySightings: [
	{
	county: "Adams",
	lat: 46.9900,
	lng: -118.5600,
	sightings: 0
	}, {
	county: "Asotin",
	lat: 46.1800,
	lng: -117.1900,
	sightings: 0
	}, {
	county: "Benton",
	lat: 46.2500,
	lng: -119.5000,
	sightings: 2
	}, {
	county: "Chelan",
	lat: 47.8800,
	lng: -120.6400,
	sightings: 16
	}, {
	county: "Clallam",
	lat: 48.1125,
	lng: -123.4408,
	sightings: 16
	}, {
	county: "Clark",
	lat: 45.7700,
	lng: -122.4800,
	sightings: 9
	}, {
	county: "Columbia",
	lat: 46.3000,
	lng: -117.9200,
	sightings: 4
	}, {
	county: "Cowlitz",
	lat: 46.1900,
	lng: -122.6800,
	sightings: 15
	}, {
	county: "Douglas",
	lat: 47.7400,
	lng: -119.6900,
	sightings: 0
	}, {
	county: "Ferry",
	lat: 48.4700,
	lng: -118.5100,
	sightings: 5
	}, {
	county: "Franklin",
	lat: 46.5400,
	lng: -118.9000,
	sightings: 0
	}, {
	county: "Garfield",
	lat: 46.475,
	lng: -117.601111,
	sightings: 0
	}, {
	county: "Grant",
	lat: 47.2100,
	lng: -119.4700,
	sightings: 0
	}, {
	county: "Grays Harbor",
	lat: 47.1500,
	lng: -123.8300,
	sightings: 41
	}, {
	county: "Island",
	lat: 48.1500,
	lng: -122.5800,
	sightings: 5
	}, {
	county: "Jefferson",
	lat: 47.8400,
	lng: -123.5800,
	sightings: 21
	}, {
	county: "King",
	lat: 47.4700,
	lng: -121.8400,
	sightings: 45
	}, {
	county: "Kitsap",
	lat: 47.6400,
	lng: -122.6500,
	sightings: 15
	}, {
	county: "Kittitas",
	lat: 47.1200,
	lng: -120.8600,
	sightings: 17
	}, {
	county: "Klickitat",
	lat: 45.8700,
	lng: -120.7900,
	sightings: 9
	}, {
	county: "Lewis",
	lat: 46.5800,
	lng: -122.4000,
	sightings: 40
	}, {
	county: "Lincoln",
	lat: 47.5700,
	lng: -118.4100,
	sightings: 2
	}, {
	county: "Mason",
	lat: 47.3500,
	lng: -123.1800,
	sightings: 21
	}, {
	county: "Okanogan",
	lat: 48.5500,
	lng: -119.7500,
	sightings: 17
	}, {
	county: "Pacific",
	lat: 46.5600,
	lng: -123.7800,
	sightings: 6
	}, {
	county: "Pend Oreille",
	lat: 48.5300,
	lng: -117.2280,
	sightings: 7
	}, {
	county: "Pierce",
	lat: 47.0500,
	lng: -122.1100,
	sightings: 69
	}, {
	county: "San Juan",
	lat: 48.533333,
	lng: -123.083333,
	sightings: 0
	}, {
	county: "Skagit",
	lat: 48.4800,
	lng: -121.7800,
	sightings: 10
	}, {
	county: "Skamania",
	lat: 46.0300,
	lng: -121.9100,
	sightings: 54
	}, {
	county: "Snohomish",
	lat: 48.0400,
	lng: -121.7100,
	sightings: 54
	}, {
	county: "Spokane",
	lat: 47.6200,
	lng: -117.4000,
	sightings: 3
	}, {
	county: "Stevens",
	lat: 48.4000,
	lng: -117.8500,
	sightings: 8
	}, {
	county: "Thurston",
	lat: 46.9300,
	lng: -122.8300,
	sightings: 16
	}, {
	county: "Wahkiakum",
	lat: 46.2900,
	lng: -123.4300,
	sightings: 2
	}, {
	county: "Walla Walla",
	lat: 46.2300,
	lng: -118.4800,
	sightings: 14
	}, {
	county: "Whatcom",
	lat: 48.8300,
	lng: -121.9000,
	sightings: 17
	}, {
	county: "Yakima",
	lat: 46.4600,
	lng: -120.7400,
	sightings: 24
	}
	],
	/**
	 * Checks to see if a string contains all of the letter in a search string.
	 * @param  {string} search The characters to be searched for.
	 * @param  {string} inStr  The string to search for the characters in.
	 * @return {boolean}        Whether or not all of the characters were found.
	 */
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
	}
};

/**
 * The ViewModel for the application
 */
var ViewModel = function(){
	/**
	 * An abstraction of the 'this' variable.
	 */
	var self = this;

	/**
	 * A template for the string used to create a flickr iamge URL.
	 * @type {String}
	 */
	var imgURLstr = 'https://[%farm%].staticflickr.com/[%server%]/[%id%]_[%sercret%].jpg';

	/**
	 * The base URL for the flickr API
	 * @type {String}
	 */
	var flickrAPIURL = 'https://api.flickr.com/services/rest/';


	/**
	 * TODO: Add news feed functionality
	 */

	/**
	 * API key for the New York Times API
	 * @type {String}
	 */
	//var nytAPIKey = "2bdef7d706bc8030ab9d2d31b5580154:7:70540436";
	/**
	 * The base URL for the New York Times API
	 * @type {String}
	 */
	//var nytAPIURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";

	/**
	 * The default image to appear when the flickr API is unable to return photos
	 * @type {String}
	 */
	var defaultImage = 'http://upload.wikimedia.org/wikipedia/commons/f/f6/Swiss_National_Park_131.JPG';

	/**
	 * The default message to appear when the flickr API is unable to return photos
	 * @type {String}
	 */
	var defaultMessage = "We couldn't find any pictures... but I'm sure the Wasquatch is out there somewhere!";

	/**
	 * The template for building the markup to fill the list view
	 * @type {String}
	 */
	var listContentTemplate = '<p>[%message%]</p><div class="images"><img src="[%image%]"></div>';

	/**
	 * The default markup for the list view if the flickr API is unable to return photos
	 * @type {[type]}
	 */
	var defaultContent = listContentTemplate 
						.replace('[%image%]', defaultImage)
						.replace('[%message%]', defaultMessage);

	/**
	 * Returns the URL photo for the objects returned from the flickr search API
	 * @param  {object} data Photo object returned from the flickr API
	 * @return {String}      The URL for the given flickr data object.
	 */
	var makeFlickrURL = function(data) {
		var imgURLstr = 'https://farm[%farm%].staticflickr.com/[%server%]/[%id%]_[%sercret%]_q.jpg';
		return imgURLstr.replace('[%farm%]', data.farm)
			.replace('[%server%]', data.server)
			.replace('[%id%]', data.id)
			.replace('[%sercret%]', data.secret);
	};

	/**
	 * Holds a jQuery object for the list view DOM object
	 * @type {object}
	 */
	var $list = $('#location-list');

	/**
	 * Holds a jQuery object for the window
	 * @type {object}
	 */
	var $window = $(window);

	/**
	 * Holds a jQuery object for div that contains the map view
	 * @type {object}
	 */
	var $map = $('.map-container');

	/**
	 * Resizes the list and map DOM elements and zooms the map to fit and center on all points
	 */
	var resize = function() {
		var w = $window.width();
		$list.height($window.height() - 50);
		$list.css({"padding-top": 0, "top": "50px"});
		self.resizeMap();
	};

	/**
	 * Add an event handler that fires the resize function on window resize
	 */
	$window.resize(resize);

	/**
	 * Adds a click handler to open and close the sidebar, resizes the sidebar and map container, and zooms the map
	 */
	$('.menu-toggle span').click(function(){
		menuToggle();
		resize();
	});

	function menuToggle(){
		$('.menu-toggle span').toggleClass("icon-search").toggleClass("icon-cross");
		$('#list-view').toggleClass("hidden-left");
		$('.map-container').toggleClass("full");
		$('.menu-toggle').toggleClass("menu-left");
	}

	/**
	 * Holds location objects for all of the counties and their data
	 * @type {Observable Array}
	 */
	self.locations = ko.observableArray([]);

	/**
	 * The default options for the Google map
	 * @type {Object}
	 */
	self.mapOptions = {
		center: {lat: 47.5000, lng: -120.5000},
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: true,
		minZoom: 6,
		mapTypeControl: true,
		scaleControl: true,
		streetViewControl: true,
		overviewMapControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.DEFAULT
		}
	};

	/**
	 * The Google map object
	 * @type {Map}
	 */
	self.map = new google.maps.Map(document.getElementById('map-canvas'),self.mapOptions);

	/**
	 * The search term that is used to filter the locations.
	 * @type {Observable}
	 */
	self.searchTerm = ko.observable();

	/**
	 * Constructor function for a location object representing a county
	 * @param {string} title Name of the county
	 * @param {number} lat   Latitude of the county
	 * @param {nunber} lng   Longitude of the county
	 * @param {number} count Number of sasquatch sightings
	 * @param {Map} map   Map that the location will be associated with
	 * @param {index} index A number to identify the index of the location. Used for auto scrolling.
	 */
	Location = function(title, lat, lng, count, map, index) {
	  	var _location = this;
	  	this.index = index;
	  	this.county = title;
	  	this.lat = lat;
	  	this.lng = lng;
	  	this.count = count;
	  	/**
	  	 * Whether or not the location should be displayed inthe list and map views
	  	 * @type {Boolean}
	  	 */
	  	this.isVisible = ko.observable(true);

	  	/**
	  	 * The markup that is displayed in the map infowindow
	  	 * @type {string}
	  	 */
	  	this.infoHTML = ko.observable('<h3>' + title + '</h3>' +
		    '<h5>Sightings: ' + count + '</h5>');
	  	/**
	  	 * The default markup that is displayed in the list view when expanded
	  	 * @type {String}
	  	 */
	  	this.listHTML = ko.observable("Scanning for Wasquatches...");
	  	/**
	  	 * Whether or not the location should be displaying additional information
	  	 * @type {Boolean}
	  	 */
	  	this.isOpen = ko.observable(false);

	  	/**
	  	 * The map marker for the location
	  	 * @type {Marker}
	  	 */
	  	this.marker = new google.maps.Marker({
			    position: new google.maps.LatLng(lat,lng),
			    visible: true,
			    map: map,
			    title: title,
			    sightings: count,
			    icon: this.iconPath(this.count)
			});
	  	/**
	  	 * The map infowindow for the location Marker
	  	 * @type {InfoWindow}
	  	 */
	  	this.infowindow = new google.maps.InfoWindow({
			content: this.infoHTML(),
			maxWidth: 250
		});
	  	/** Adds a click event for the map Marker */
	  	google.maps.event.addListener(this.marker, 'click', function() {
	    	_location.click();
		});
	  	/** Add the close event for the InfoWindow */
	  	google.maps.event.addListener(this.infowindow, 'closeclick', function() {
	    	_location.marker.setIcon(_location.iconPath(_location.count));
		});

	};

	/**
	 * Determined the icon that should be showed based on the number of sasquatch sightings
	 * @param  {number} count Count of sasquatching sightings
	 * @return {string}       The URL of the location icon
	 */
  	Location.prototype.iconPath = function(count) {
  		if (count > 49) {
  			return 'http://maps.google.com/mapfiles/kml/pal3/icon37.png';
  		} else if (count > 0) {
  			return 'http://maps.google.com/mapfiles/kml/pal3/icon45.png';
  		}
  		return 'http://maps.google.com/mapfiles/kml/pal2/icon4.png';
 	 };

 	 /**
 	  * The event that should be fired on the click of a location on the map on in the list
 	  */
	Location.prototype.click = function() {
		if (this.isOpen()) {
			this.close();
    	} else {
    		this.open();
    		/** Scroll the selected location to the top of the list */
			$('#location-list').animate({
				scrollTop: $('#location-list').scrollTop() + $('#location-list li').eq(this.index).offset().top -50
			},1000);
    	}
    	if ($window.width()<=600) {
    		menuToggle();
    	}
    	this.isOpen(!this.isOpen());
	};

	/** The function to be fired when an open list item is clicked or the close function is triggered on an infowindow */
	Location.prototype.close = function() {
		this.infowindow.close();
		this.marker.setIcon(this.iconPath(this.count));
	};

	/** The function to be fired when a close list view item or map icon is clicked */
	Location.prototype.open = function() {
		if (!this.photos) {
			this.getLocationData("bigfoot,sasquatch,yeti");
		}
		this.infowindow.open(self.map, this.marker);
		this.marker.setIcon('http://maps.google.com/mapfiles/kml/pal4/icon47.png');
	};

	/**
	 * AJAX call to the flickr API that return photos tagged within 32 kilometers of the location that contain the tags. Adds the returned photos as properties of the location object this function is called on.
	 * @param  {string} tags Comma seperated list of search terms.
	 */
	Location.prototype.getLocationData = function(tags) {
		var _location = this;
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
				lat: this.lat,
				lon: this.lng,
				radius: 32,
				format: 'json',
				nojsoncallback: 1
			},
			/**
			 * Add photos to the location.
			 */
			success: function(rsp) {
				/** Uses the default content is there are no photos that meet the criteria */
				if (rsp.photos.photo.length === 0) {
					_location.listHTML(defaultContent);
					return;
				}
				_location.listHTML(listContentTemplate
					.replace('[%image%]', makeFlickrURL(rsp.photos.photo[0]))
					.replace('[%message%]', "Here is the latest pic of a Wasquatch for this area."));
			},
			/** Sets the markup to the defaul photo on error */
			error: function() {
				_location.listHTML(defaultContent);
			}
		});
	};

	/** Populates the location observable array with Locations
	/* @param  {Array} tags An array of objects containing location data.
	*/
	this.setLocations = function(locations) {
		var length = locations.length;
		var loc;
		for (var i = 0; i < length; i++){
			loc = locations[i];
			self.locations.push(new Location(loc.county, loc.lat, loc.lng, loc.sightings, self.map, i));
		}
		self.resizeMap();
	};

	/** Resizes the map to fit all of the locations */
	this.resizeMap = function() {
		var length = self.locations().length;
		var bounds = new google.maps.LatLngBounds();
		for(i=0;i<length;i++) {
			bounds.extend(self.locations()[i].marker.getPosition());
		}
		self.map.fitBounds(bounds);
		console.log("Auto zoom is: " + self.map.getZoom());
		self.map.setZoom(self.map.getZoom() + 1);
		self.map.setCenter(self.mapOptions.center);
		console.log("New zoom is: " + self.map.getZoom());
	};

	/**
	 * Sets the map for all of the markers
	 * @param {Map} map
	 */
	this.setAllMap = function (map) {
		var length = self.markers().length;
		for (var i = 0; i < length; i++) {
			self.markers()[i].setMap(map);
		}
	};

	/** Clears all of the markers from a map */

	this.clearMarkers = function() {
	  this.setAllMap(null);
	};

	/** Shows all markers on a map */
	this.showMarkers = function() {
	  this.setAllMap(map);
	};

	/** deletes all markers and removes them from the map */
	this.deleteMarkers = function() {
	  this.clearMarkers();
	  self.markers([]);
	};

	this.setLocations(model.countySightings);

	/**
	 * Filters displayed locations to match search term
	 * @param  {string} term The search term to be matched
	 */
	this.searchTerm.subscribe(function(term) {
		var length = self.locations().length;
		var loc;
		for (var i = 0; i < length; i++) {
			loc = self.locations()[i];
			loc.isVisible(model.fuzzyCompare(term, loc.county));
			loc.marker.setVisible(loc.isVisible());
			if (!model.fuzzyCompare(term, loc.county)) {
				loc.infowindow.close();
				loc.marker.setIcon(loc.iconPath(loc.count));
			}
		}
	});
	resize();
};


