var rawData = rawData;

// Initial Params
var metricSelection = "Employment (M)"
var stateSelection = ["Alabama"]

var metricIndex = rawData.findIndex(d => d.y === metricSelection)
var stateIndex = rawData[metricIndex].series.findIndex(d => d.name === stateSelection)

var svgWidth = 1350;
var svgHeight = 600;

var margin = {
  top: 50,
  right: 100,
  bottom: 50,
  left: 75
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#line")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create user selection groups for metric and state
var metricSelectionGroup = chartGroup.append("g")
  .classed("metric-group", true)
  .attr("transform", `translate(${width}, ${height + 20})`);

var stateSelectionGroup = chartGroup.append("g")
  .classed("state-group", true)
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

// Loop through data to population metric selection group
for (i = 0; i < rawData.length; i++) {
  if (rawData[i].y === metricSelection) {
    metricSelectionGroup.append("text")
      .attr("x", (-svgWidth/2) + i*200)
      .attr("y", -svgHeight + margin.top)
      .attr("value", rawData[i].y) // value to grab for event listener
      .classed("metric-group", true)
      .text(rawData[i].y)
      .style("fill","red");
    }
  else {
    metricSelectionGroup.append("text")
      .attr("x", (-svgWidth/2) + i*200)
      .attr("y", -svgHeight + margin.top)
      .attr("value", rawData[i].y) // value to grab for event listener
      .classed("metric-group", true)
      .text(rawData[i].y);
  }};

// Loop through states to population state selection group
for (j = 0; j < rawData[0].series.length; j++) {
  if (stateSelection.includes(rawData[0].series[j].name)) {
    stateSelectionGroup.append("text")
      .attr("x", margin.right + 500)
      .attr("y", 0 - svgHeight+margin.top + j*20)
      .attr("value", rawData[0].series[j].name) // value to grab for event listener
      .classed("state-group", true)
      .text(rawData[0].series[j].name)
      .style("fill","red");
    }
  else {
    stateSelectionGroup.append("text")
      .attr("x", margin.right + 500)
      .attr("y", 0 - svgHeight+margin.top + j*20)
      .attr("value", rawData[0].series[j].name) // value to grab for event listener
      .classed("state-group", true)
      .text(rawData[0].series[j].name)
  }};

// Event listners
stateSelectionGroup.selectAll("text")
  .on("click", function() {
    var value = d3.select(this).attr("value");

    if (stateSelection.includes(value)) {
      stateSelection = stateSelection.filter(function removeData(data) {return data !== value});
      d3.select(this).style("fill","black");
    }
    else {
      stateSelection.push(value);
      d3.select(this).style("fill","red");
    };

  rebuildData(metricSelection, stateSelection)
  });

metricSelectionGroup.selectAll("text")
  .on("click", function() {
    var value = d3.select(this).attr("value");

    if (metricSelection !== value) {
      metricSelection = value
      metricSelectionGroup.selectAll("text").style("fill","black")
      d3.select(this).style("fill","red");
    }

  rebuildData(metricSelection, stateSelection)
  });

function rebuildData(metricSelection, stateSelection){
  var newMetricIndex = rawData.findIndex(d => d.y === metricSelection)
  var newStateIndex = rawData[metricIndex].series.findIndex(d => d.name === stateSelection)
  var newMetricData = rawData.slice(newMetricIndex,newMetricIndex + 1)
  var newStateData = newMetricData[0].series.filter(d => stateSelection.includes(d.name))
  var newData = [{y: metricSelection, series: newStateData, dates: rawData[newMetricIndex].dates}]

  buildGraph(newData, newMetricIndex, newStateIndex)
}

function buildGraph(buildData, metricIndex, stateIndex) {
  d3.select(".x-axis").remove()
  d3.select(".y-axis").remove()
  d3.select(".data-group").remove()

  var xTimeScale1 = d3.scaleTime()
    .domain(d3.extent(buildData[0].dates))
    .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(buildData[0].series, d => d3.max(d.values))]).nice()
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
    .x((d,i) => xTimeScale1(buildData[0].dates[i]))
    .y(d => yLinearScale1(d));

  dataGroup.selectAll("path")
    .data(buildData[0].series)
    .enter()
    .append("path")
    .style("mix-blend-mode", "multiply")
    .attr("d", d => line(d.values))
    .classed("line green", true);
}

var parseTime = d3.timeParse("%Y");


rebuildData(metricSelection, stateSelection);
