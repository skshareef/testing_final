var margin = {
  top: 10, right: 10, bottom: 10, left: 90},
  width = 1300 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#map")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
d3.csv("sum_bug.csv").then(function(data)
{

  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })(data);
  root.sum(function(d) { return +d.value })


  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

console.log(root.leaves())
root.sum(function(d) {
return +d.value;
});


let tooltip = d3
   .select('body')
   .append('div')
   .style('position', 'absolute')
   .style('z-index', '10')
   .style('visibility', 'hidden')
   .style('background-color', 'white')
   .style('border', 'solid')
   .style('border-width', '2px')
   .style('border-radius', '5px')
   .style('padding', '5px');




  // use this information to add rectangles:
  var tree_dic=svg
    .selectAll("rect")
    .data(root.leaves())

    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#46019b")
      .on('mouseover', function() {
     tooltip.style('visibility', 'visible');
   })
   .on('mousemove', function(event,d) {
     tooltip
       .style('top', event.y + 1 + 'px')
       .style('left', event.x - 1 + 'px')
       .html(d.data.name)


   })
   .on('mouseout', function() {
     tooltip.style('visibility', 'hidden');
   });

svg
        .selectAll("text")
        .data(root.leaves())

        .join("text")
          .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+10})    // +20 to adjust position (lower)
          .text(function(d){ return d.data.value})
          .attr("font-size", "11px")
          .attr("fill", "white")
})



//button 1




d3.select("#Burgalary_sum1").on('click', function(){
  //d3.selectAll('svg').remove();

  var margin = {
    top: 10, right: 10, bottom: 10, left: 90},
    width = 1400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#map")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




d3.csv("sum_bug.csv").then(function(data)
{

  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })(data);
  root.sum(function(d) { return +d.value })


  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

console.log(root.leaves())
root.sum(function(d) {
return +d.value;
});

let tooltip = d3
   .select('body')
   .append('div')
   .style('position', 'absolute')
   .style('z-index', '10')
   .style('visibility', 'hidden')
   .style('background-color', 'white')
   .style('border', 'solid')
   .style('border-width', '2px')
   .style('border-radius', '5px')
   .style('padding', '5px');




  // use this information to add rectangles:
  var tree_dic=svg
    .selectAll("rect")
    .data(root.leaves())

    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#46019b")
      .on('mouseover', function() {
     tooltip.style('visibility', 'visible');
   })
   .on('mousemove', function(event,d) {
     tooltip
       .style('top', event.y - 10 + 'px')
       .style('left', event.x + 10 + 'px')
       .html(d.data.name)


   })
   .on('mouseout', function() {
     tooltip.style('visibility', 'hidden');
   });

svg
        .selectAll("text")
        .data(root.leaves())

        .join("text")
          .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+10})    // +20 to adjust position (lower)
          .text(function(d){ return d.data.value})
          .attr("font-size", "11px")
          .attr("fill", "white")



})



})




//button 2


d3.select("#Rape_sum1").on('click', function(){
//  d3.selectAll('svg').remove();
var margin = {
  top: 10, right: 10, bottom: 10, left: 90},
  width = 1400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#map")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




d3.csv("sum_rape.csv").then(function(data)
{





  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })(data);
  root.sum(function(d) { return +d.value })


  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

console.log(root.leaves())
console.log("shareef");
root.sum(function(d) {
return +d.value;
});


let tooltip = d3
   .select('body')
   .append('div')
   .style('position', 'absolute')
   .style('z-index', '10')
   .style('visibility', 'hidden')
   .style('background-color', 'white')
   .style('border', 'solid')
   .style('border-width', '2px')
   .style('border-radius', '5px')
   .style('padding', '5px');




  // use this information to add rectangles:
  var tree_dic=svg
    .selectAll("rect")
    .data(root.leaves())

    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#FF4B33 ")
      .on('mouseover', function() {
     tooltip.style('visibility', 'visible');
   })
   .on('mousemove', function(event,d) {
     tooltip
       .style('top', event.y - 10 + 'px')
       .style('left', event.x + 10 + 'px')
       .html(d.data.name)


   })
   .on('mouseout', function() {
     tooltip.style('visibility', 'hidden');
   });

svg
        .selectAll("text")
        .data(root.leaves())

        .join("text")
          .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+15})    // +20 to adjust position (lower)
          .text(function(d){ return d.data.value})
          .attr("font-size", "11px")
          .attr("fill", "white")




})



})



//button 3


d3.select("#Robbery_sum1").on('click', function(){
//  d3.selectAll('svg').remove();
var margin = {
  top: 10, right: 10, bottom: 10, left: 90},
  width = 1400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#map")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




d3.csv("sum_rob.csv").then(function(data)
{





  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })(data);
  root.sum(function(d) { return +d.value })


  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

console.log(root.leaves())
root.sum(function(d) {
return +d.value;
});


let tooltip = d3
   .select('body')
   .append('div')
   .style('position', 'absolute')
   .style('z-index', '10')
   .style('visibility', 'hidden')
   .style('background-color', 'white')
   .style('border', 'solid')
   .style('border-width', '2px')
   .style('border-radius', '5px')
   .style('padding', '5px');




  // use this information to add rectangles:
  var tree_dic=svg
    .selectAll("rect")
    .data(root.leaves())

    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#5BFF33")
      .on('mouseover', function() {
     tooltip.style('visibility', 'visible');
   })
   .on('mousemove', function(event,d) {
     tooltip
       .style('top', event.y - 10 + 'px')
       .style('left', event.x + 10 + 'px')
       .html(d.data.name)


   })
   .on('mouseout', function() {
     tooltip.style('visibility', 'hidden');
   });

svg
        .selectAll("text")
        .data(root.leaves())

        .join("text")
          .attr("x", function(d){ return d.x0+9})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+10})    // +20 to adjust position (lower)
          .text(function(d){ return d.data.value})
          .attr("font-size", "11px")
          .attr("fill", "black")




})



})



//button 4


d3.select("#Aggressive_sum1").on('click', function(){
//  d3.selectAll('svg').remove();
var margin = {
  top: 10, right: 10, bottom: 10, left: 90},
  width = 1400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#map")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




d3.csv("sum_voi.csv").then(function(data)
{





  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })(data);
  root.sum(function(d) { return +d.value })


  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

console.log(root.leaves())
root.sum(function(d) {
return +d.value;
});



let tooltip = d3
   .select('body')
   .append('div')
   .style('position', 'absolute')
   .style('z-index', '10')
   .style('visibility', 'hidden')
   .style('background-color', 'white')
   .style('border', 'solid')
   .style('border-width', '2px')
   .style('border-radius', '5px')
   .style('padding', '5px');




  // use this information to add rectangles:
  var tree_dic=svg
    .selectAll("rect")
    .data(root.leaves())

    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#fef601")
      .on('mouseover', function() {
     tooltip.style('visibility', 'visible');
   })
   .on('mousemove', function(event,d) {
     tooltip
       .style('top', event.y - 10 + 'px')
       .style('left', event.x + 10 + 'px')
       .html(d.data.name)


   })
   .on('mouseout', function() {
     tooltip.style('visibility', 'hidden');
   });

svg
        .selectAll("text")
        .data(root.leaves())

        .join("text")
          .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+15})    // +20 to adjust position (lower)
          .text(function(d){ return d.data.value})
          .attr("font-size", "11px")
          .attr("fill", "black")





})



})
