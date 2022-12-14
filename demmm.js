
var dimens = {
    width: 560,
    height: 460,
    margin: {
        top: 20,
        bottom: 21,
        right: 10,
        left: 90
    }
}
dimens.boundedWidth = dimens.width - dimens.margin.right - dimens.margin.left
dimens.boundedHeight = dimens.height - dimens.margin.top - dimens.margin.bottom

// append the svg object to the body of the page
const Svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", dimens.width)
    .attr("height", dimens.height)

// Read data
d3.csv("bubble1.csv").then( function(data) {
console.log();
  // Filter a bit the data -> more than 1 million inhabitants
  data = data.filter(function(d){ return d.V_bug>0 })

  // Color palette for continents?
 const color = d3.scaleOrdinal()
    .domain([""])
    .range(d3.schemeSet1);



  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 50])
    .range([10,200])  // circle will be between 7 and 55 px wide

  // create a tooltip
  const Tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "2px")
    .style("padding", "5px")


  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event, d) {
    Tooltip
      .style("opacity", 1)
  }
  const mousemove = function(event, d) {
    Tooltip
      .html('<u>' + d.Name + '</u>' + "<br>" + d.V_bug + " % ")
      .style("left", (event.x/2+20) + "px")
      .style("top", (event.y/2-30) + "px")
  }
  var mouseleave = function(event, d) {
    Tooltip
      .style("opacity", 0)
  }

console.log(data);
  // Initialize the circle: all located at the center of the svg area
  var node = Svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.V_bug))
      .attr("cx", dimens.width / 2)
      .attr("cy", dimens.height / 2)
      .style("fill", d => color(d.Name))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(dimens.width / 2).y(dimens.height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.V_bug)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }




//buton 1

  d3.select("#Burgalary_sum4").on("click",function(){
    //const svg = d3.select("#my_dataviz")
   /* .append("svg")
      .attr("width", width)
      .attr("height", height)
      */



    Svg.selectAll("*").remove();
    var dimens = {
        width: 560,
        height: 460,
        margin: {
            top: 20,
            bottom: 21,
            right: 10,
            left: 90
        }
    }
    dimens.boundedWidth = dimens.width - dimens.margin.right - dimens.margin.left
    dimens.boundedHeight = dimens.height - dimens.margin.top - dimens.margin.bottom
  // Filter a bit the data -> more than 1 million inhabitants
  data = data.filter(function(d){ return d.V_bug>0 })

  // Color palette for continents?
  const color = d3.scaleOrdinal()
    .domain([""])
    .range(d3.schemeSet1);

  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 50])
    .range([10,200])   // circle will be between 7 and 55 px wide

  // create a tooltip

  // Initialize the circle: all located at the center of the svg area
  var node = Svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.V_bug))
      .attr("cx", dimens.width / 2)
      .attr("cy", dimens.height / 2)
      .style("fill", d => color(d.Name))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(dimens.width / 2).y(dimens.height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.V_bug)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

  })





  d3.select("#Rape_sum4").on("click",function(){
    //const svg = d3.select("#my_dataviz")
   /* .append("svg")
      .attr("width", width)
      .attr("height", height)
      */
    Svg.selectAll("*").remove();
    var dimens = {
        width: 560,
        height: 460,
        margin: {
            top: 20,
            bottom: 21,
            right: 10,
            left: 90
        }
    }
    dimens.boundedWidth = dimens.width - dimens.margin.right - dimens.margin.left
    dimens.boundedHeight = dimens.height - dimens.margin.top - dimens.margin.bottom
  // Filter a bit the data -> more than 1 million inhabitants
  data = data.filter(function(d){ return d.V_rap>0 })

  // Color palette for continents?
 const color = d3.scaleOrdinal()
    .domain([""])
    .range(d3.schemeSet1);

  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 65])
    .range([20,100])   // circle will be between 7 and 55 px wide

  // create a tooltip

  // Initialize the circle: all located at the center of the svg area
  var node = Svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.V_rap))
      .attr("cx", dimens.width / 2)
      .attr("cy", dimens.height / 2)
      .style("fill", d => color(d.Name))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(dimens.width / 2).y(dimens.height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.V_bug)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})









//robbery
d3.select("#Robbery_sum4").on("click",function(){
    //const svg = d3.select("#my_dataviz")
   /* .append("svg")
      .attr("width", width)
      .attr("height", height)
      */
    Svg.selectAll("*").remove();
    var dimens = {
        width: 560,
        height: 460,
        margin: {
            top: 20,
            bottom: 21,
            right: 10,
            left: 90
        }
    }
    dimens.boundedWidth = dimens.width - dimens.margin.right - dimens.margin.left
    dimens.boundedHeight = dimens.height - dimens.margin.top - dimens.margin.bottom
  // Filter a bit the data -> more than 1 million inhabitants
  data = data.filter(function(d){ return d.V_rob>0 })

  // Color palette for continents?
 const color = d3.scaleOrdinal()
    .domain([""])
    .range(d3.schemeSet1);

  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 100])
    .range([1,45])    // circle will be between 7 and 55 px wide


  // Initialize the circle: all located at the center of the svg area
  var node = Svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.V_rob))
      .attr("cx", dimens.width / 2)
      .attr("cy", dimens.height / 2)
      .style("fill", d => color(d.Name))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(dimens.width / 2).y(dimens.height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.V_bug)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})








//violentcrime

d3.select("#Violentcrime_sum4").on("click",function(){
    //const svg = d3.select("#my_dataviz")
   /* .append("svg")
      .attr("width", width)
      .attr("height", height)
      */
    Svg.selectAll("*").remove();
    var dimens = {
        width: 520,
        height: 520,
        margin: {
            top: 20,
            bottom: 21,
            right: 10,
            left: 90
        }
    }
    dimens.boundedWidth = dimens.width - dimens.margin.right - dimens.margin.left
    dimens.boundedHeight = dimens.height - dimens.margin.top - dimens.margin.bottom
  // Filter a bit the data -> more than 1 million inhabitants
  data = data.filter(function(d){ return d.V_voi>0 })

  // Color palette for continents?
 const color = d3.scaleOrdinal()
    .domain([""])
    .range(d3.schemeSet1);

  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 75])
    .range([1,35])   // circle will be between 7 and 55 px wide

  // create a tooltip


  // Initialize the circle: all located at the center of the svg area
  var node = Svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.V_voi))
      .attr("cx", dimens.width / 2)
      .attr("cy", dimens.height / 2)
      .style("fill", d => color(d.Name))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(dimens.width / 2).y(dimens.height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.V_bug)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})



})
