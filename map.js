
mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1b3JhbmxpdSIsImEiOiJjbGQxbDR6M2QyN2s5M3BudnhrZGV0bTRyIn0.dG9Q884uSu_yGHLnc0KLnA'; // Put your Mapbox Public Access token here
  
// Load a new map in the 'map' HTML div
// var map = new mapboxgl.Map({
// container: 'map', // container id
// style: 'mapbox://styles/jiaxuanfan/clhdjukc3015a01qygcofgut3', // map background layer location
//  // starting position [lng, lat]
// zoom: 9, // starting zoom
// center: [-74.0060, 40.7128]
// });

var map = new mapboxgl.Map({
    container: 'map', // The id of the div you want to contain the map
    style: 'mapbox://styles/zhuoranliu/clhoxbtj401v201p69opy47jq', // The style URL for the map you created in Mapbox Studio
    center: [-74.0060, 40.7128], // [longitude, latitude] of the center of the map
    zoom: 9.5 // starting zoom level
});

map.addControl(new mapboxgl.NavigationControl());

// map.on('load', function() {

//Event listener for layer switch
document.getElementById("layer1").addEventListener("click", function(){
    map.setPaintProperty('PPC','fill-opacity',1);
    map.setPaintProperty('WNH_PPC','fill-opacity',0);
    });
    
    document.getElementById("layer2").addEventListener("click", function(){
    map.setPaintProperty('PPC','fill-opacity',0);
    map.setPaintProperty('WNH_PPC','fill-opacity',1);
    });
    