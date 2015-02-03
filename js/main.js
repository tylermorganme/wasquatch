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

var testLocs = [
	{
		title: 'Space Needle',
		lat:47.6204,
		lng:-122.3491
	},
	{
		title: 'City Center',
		lat: 47.6097,
		lng: -122.3331
	},
	{
		title: 'Airport',
		lat: 47.4489,
		lng: -122.3094
	},
	{
		title: 'Green Lake',
		lat: 47.6779,
		lng: -122.3369
	}
];

var ViewModel = function(){
	var self = this;
	this.markers = ko.observableArray([]);
	this.mapOptions = {
		center: {lat: 47.6097, lng: -122.3331},
		zoom: 11,
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

	this.map = new google.maps.Map(document.getElementById('map-canvas'),self.mapOptions);

	this.searchTerm = ko.observable('test');

	this.autoCompService = new google.maps.places.AutocompleteService();

	// Add a marker to the map and push to the array.
	this.addMarker = function(title, lat, lng) {
	  var marker = new google.maps.Marker({
	    title: title,
	    position: new google.maps.LatLng(lat,lng),
	    animation: google.maps.Animation.DROP
	  });
	  self.markers().push(marker);
	}

	this.setMarkers = function(markers) {
		var length = markers.length;
		for (var i = 0; i < length; i++){
			var marker = markers[i];
			self.addMarker(marker.title, marker.lat, marker.lng)
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

	this.setMarkers(testLocs);
	this.setAllMap(self.map);

	this.recommendations = ko.observableArray();

	this.searchTerm.subscribe(function(term) {
	    self.autoCompService.getQueryPredictions({ input: term}, function(recs){
	    	if (status == google.maps.places.PlacesServiceStatus.OK) {
		    	recs.length!==0?self.recommendations(recs):self.recommendations([]);
			}
			});
	});
};

ko.applyBindings(new ViewModel());

function initialize() {

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
};
