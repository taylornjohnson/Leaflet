// query url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// insert map
var myMap = L.map("mapid", {
  center: [45.52, -122.67],
  zoom: 13
});

//GET request 
d3.json(queryUrl).then(function(data) {
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {

    // map layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
  
    // base maps
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };
  
    //overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  };