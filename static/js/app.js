var svgWidth = 1350;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 100,
  bottom: 20,
  left: 150
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#line")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Retrieve data from the CSV file and execute everything below
// var employ = "../db/employmentFinal.csv"
// var natGDP = "../db/nationalGDPFinal.csv"
// var natunemploy = "../db/nationalUnemploymentFinal.csv"
// var pop = "../db/populationFinal.csv"
// var stateGDP = "../db/stateGDPFinal.csv"
// var stateunemploy = "../db/stateUnemploymentFinal.csv"

var parseTime = d3.timeParse("%Y");

var rawData = [{
  y: "employment #",
  series: [{name: "Alabama", values: [10,20,30]},
           {name: "Alaska", values: [40,50,60]},
           {name: "Arizona", values: [70,80,90]}],
  dates: [1998, 1999, 2000]
},
{
  y: "population #",
  series: [{name: "Alabama", values: [5,10,15]},
           {name: "Alaska", values: [20,25,30]},
           {name: "Arizona", values: [35,40,45]}],
  dates: [1998, 1999, 2000]
}];

// rawData.forEach(function(data) {
  // console.log(data.dates)
  // data.dates.forEach(function(dd) {console.log(parseTime(dd))})
  // data.series.forEach(function(ds) {console.log(ds); ds.values = +ds.values})
  // data.dates = parseTime(data.dates);
  // data.series.values = +data.series.values;
// });

// var xLinearScale = xScale(rawData, chosenXAxis);   // xLinearScale function above csv import
// var yLinearScale = yScale(rawData, chosenYAxis);   // Create y scale function

// first data set
var xTimeScale1 = d3.scaleTime()
  .domain(d3.extent(rawData[0].dates))
  .range([0, width]);

var yLinearScale1 = d3.scaleLinear()
  .domain([0, d3.max(rawData[0].series, d => d3.max(d.values))]).nice()
  .range([height, 0]);

// Create initial axis functions
var bottomAxis = d3.axisBottom(xTimeScale1);
var leftAxis = d3.axisLeft(yLinearScale1);

// append x axis
var xAxis = chartGroup.append("g")
  .classed("x-axis", true)
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

// append y axis
var yAxis = chartGroup.append("g")
  .classed("y-axis", true)
  .call(leftAxis);

// create group for data
var dataGroup = chartGroup.append("g")
  .classed("data-group", true);

var line = d3.line()
  .defined(d => !isNaN(d))
  .x((d,i) => xTimeScale1(rawData[0].dates[i]))
  .y(d => yLinearScale1(d));

dataGroup.selectAll("path")
  .data(rawData[0].series)
  .enter()
  .append("path")
  .style("mix-blend-mode", "multiply")
  .attr("d", d => line(d.values))
  .classed("line green", true);


var xlabelsGroup = chartGroup.append("g")  // Create group for  3 x-axis labels
  .attr("transform", `translate(${width}, ${height + 20})`);

var ylabelsGroup = chartGroup.append("g") // Create group for  3 y-axis labels
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

for (i = 0; i < rawData.length; i++) {
  xlabelsGroup.append("text")
    .attr("x", - svgWidth + margin.left - 40)
    .attr("y", 0 - svgHeight+margin.top + i*20)
    .attr("value", rawData[i].y) // value to grab for event listener
    .classed("active", true)
    .text(rawData[i].y);

  for (j = 0; j < rawData[i].series.length; j++) {
    ylabelsGroup.append("text")
      .attr("x", margin.right + 480)
      .attr("y", 0 - svgHeight+margin.top + j*20)
      .attr("value", rawData[i].series[j].name) // value to grab for event listener
      .classed("active", true)
      .text(rawData[i].series[j].name);
  };
}
