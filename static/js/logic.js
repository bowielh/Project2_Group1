// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

//List of states that have legalized Recreational Marijuana.
// Each state object contains the state's name, location, population and GDP 
var states = [
  {
    name: "Alaska",
    location: [64.2008,-149.4937],
    population: "739,795",
    GDP: "44.52 billion USD"
  },
  {
    name: "California",
    location: [36.7783,-119.4179],
    population: "39.54 million",
    GDP: "2.448 trillion USD"
  },
  {
    name: "Colorado",
    location: [39.5501,-105.7821],
    population: "5.607 million",
    GDP: "295.3 billion USD"
  },
  {
    name: "Maine",
    location: [45.2538,-69.4455],
    population: "1.336 million",
    GDP: "48.11 billion USD"
  },
  {
    name: "Massachusetts",
    location: [42.4072,-71.3824],
    population: "6.86 million",
    GDP: "351.5 billion USD"
  },
  {
    name: "Nevada",
    location: [38.8026,-116.4194],
    population: "2.998 million",
    GDP: "127.2 billion USD"
  },
  {
    name: "Oregon",
    location: [43.8041,-120.5542],
    population: "4.143 million",
    GDP: "158.2 billion USD"
  },
  {
    name: "Vermont",
    location: [44.5588,-72.5778],
    population: "623,657",
    GDP: "24.54 billion USD"
  },
  {
    name: "Washington",
    location: [47.7511,-120.7401],
    population: "7.406 million",
    GDP: "311.3 billion USD"
  },
  {
    name: "The District of Columbia",
    location: [38.9072,-77.0369],
    population: "693,972",
    GDP: "93.82 billion USD"
  }
];

// Loop through the states array and create one marker for each state object
for (var i = 0; i < states.length; i++) {
  L.circle(states[i].location, {
    fillOpacity: 0.75,
    color: "purple",
    fillColor: "green",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: 100000
  }).bindPopup("<h1>" + states[i].name + "</h1> <hr> <h3>Population: " + states[i].population + "</h3>"+"</h1> <hr> <h3>GDP: " + states[i].GDP + "</h3>").addTo(myMap);
}
