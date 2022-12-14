d3.csv("sumyear.csv").then(

function(data)
{

    console.log(data);

    var dimensions = {
            width: 1200,
            height: 400,
            margin:{
                top: 10,
                bottom: 21,
                right: 40,
                left: 90
              }
            }
      var nameSelected = "Aggressive_sum"
      var name_html="Aggressive Crimes"

      var SVG = d3.select("#main")
                  .append("svg")
                  .attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
                  .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
                  .append("g")
                  .attr("transform","translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

      dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
      dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

      var x = d3.scaleBand()
                .domain(data.map(function(d){return d.year;}))
                .range([ 0, dimensions.boundedWidth ]);

     var xAxis = SVG.append("g")
                      .attr("transform", "translate(0," + (dimensions.boundedHeight+dimensions.margin.bottom) + ")")
                      .call(d3.axisBottom(x))






      var y = d3.scaleLinear()
                .domain([0, 700000])
                .range([ dimensions.boundedHeight, 0]);
      var yAxis = d3.axisLeft(y)

//y -axis label
      SVG.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -80)
    .attr("x", -150)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size",20)
    .style("font-style","Lucida Console")
    .text("Total Number Of Cases")
    .style("position","absolute")

      var changing_axis = SVG.append("g")
                              .attr("transform", "translate(-10,"+ dimensions.margin.top +")")
                              .call(yAxis)
    const tooltip = d3.select("#main")
                              .append("div")
                              .style("opacity", 1)
                              .attr("class", "tooltip")
                              .style("background-color", "white")
                              .style("border", "solid")
                              .style("border-width", "2px")
                              .style("border-radius", "5px")
                              .style("padding", "10px")
                              .style('font-size', '15px')



                            // A function that change this tooltip when the user hover a point.
                            // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
                            const mouseover = function(event, d) {
                              tooltip
                                .style("opacity", 1)
                            }

                            const mousemove = function(event, d) {
                              tooltip
                                .html("No of  " +name_html+"  in "+ d.year+ " : "+d[nameSelected])
                                .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                                .style("top", (event.y)/2 + "px")
                            }

                            // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
                            const mouseleave = function(event,d) {
                              tooltip
                                .transition()
                                .duration(200)
                                .style("opacity", 0)
                            }
      var dots=  SVG.append("g")
                    .selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return x(d.year); } )
                    .attr("cy", function (d) { return y(d.Aggressive_sum); } )
                    .attr("r", 8)
                    .style("fill", "#61a3a9")
                    .style("opacity", 1.5)
                    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )
//Button 1
        d3.select("#Burgalary_sum").on('click', function(){
                     nameSelected = "Burgalary_sum"
                     name_html="Burglary crimes"
                     var clip = SVG.append("defs").append("SVG:clipPath")
                                    .attr("id", "clip")
                                    .append("SVG:rect")
                                    .attr("width", dimensions.width )
                                    .attr("height", dimensions.height )
                                    .attr("x", 0)
                                    .attr("y", 0);
                      var scatter = SVG.append('g')
                                        .attr("clip-path", "url(#clip)")
                      var y = d3.scaleLinear()
                                .domain([0, 13000])
                                .range([ dimensions.boundedHeight, 0]);
                      var yAxis = d3.axisLeft(y)
                      changing_axis.transition()
                                    .call(yAxis)

                      dots.transition()
                          .attr("cx", function (d) { return x(d.year); } )
                          .attr("cy", function (d) { return y(d[nameSelected]); } )
                          .attr("r", 8)
                          .style("fill", "#61a3a9")
                          .style("opacity", 1.5)
                        })

//button 1 end

//button 2

          d3.select("#Rape_sum").on('click', function(){
                             nameSelected = "Rape_sum"
                             name_html="Rape crimes"
                              var clip = SVG.append("defs").append("SVG:clipPath")
                                 .attr("id", "clip")
                                 .append("SVG:rect")
                                 .attr("width", dimensions.width )
                                 .attr("height", dimensions.height )
                                 .attr("x", 0)
                                 .attr("y", 0);

                             // Create the scatter variable: where both the circles and the brush take place
                             var scatter = SVG.append('g')
                               .attr("clip-path", "url(#clip)")

                              var max = d3.max(data, function(d) { return d.Burgalary_sum; });
                              console.log(max);

                              var y = d3.scaleLinear()
                                .domain([0, 37000])
                                .range([ dimensions.boundedHeight, 0]);

                          var yAxis = d3.axisLeft(y)

                          changing_axis.transition()
                          .call(yAxis)

                          dots.transition()
                              .attr("cx", function (d) { return x(d.year); } )
                              .attr("cy", function (d) { return y(d[nameSelected]); } )
                              .attr("r", 8)
                              .style("fill", "#009688 ")
                              .style("opacity", 1.5)
          })

//button 2 end

//button 3

d3.select("#Robbery_sum").on('click', function(){
                   nameSelected = "Robbery_sum"
                   name_html="Robbery crimes"
                    var clip = SVG.append("defs").append("SVG:clipPath")
                       .attr("id", "clip")
                       .append("SVG:rect")
                       .attr("width", dimensions.width )
                       .attr("height", dimensions.height )
                       .attr("x", 0)
                       .attr("y", 0);

                   // Create the scatter variable: where both the circles and the brush take place
                   var scatter = SVG.append('g')
                     .attr("clip-path", "url(#clip)")

                    var max = d3.max(data, function(d) { return d.Burgalary_sum; });
                    console.log(max);

                    var y = d3.scaleLinear()
                      .domain([0, 430000])
                      .range([ dimensions.boundedHeight, 0]);

                var yAxis = d3.axisLeft(y)

                changing_axis.transition()
                .call(yAxis)

                dots.transition()
                    .attr("cx", function (d) { return x(d.year); } )
                    .attr("cy", function (d) { return y(d[nameSelected]); } )
                    .attr("r", 8)
                    .style("fill", "#4C0033")
                    .style("opacity", 1.5)
})

//button 3 end


//button 4

d3.select("#Aggressive_sum").on('click', function(){
                   nameSelected = "Aggressive_sum"
                    name_html="Aggressive crimes"
                    var clip = SVG.append("defs").append("SVG:clipPath")
                       .attr("id", "clip")
                       .append("SVG:rect")
                       .attr("width", dimensions.width )
                       .attr("height", dimensions.height )
                       .attr("x", 0)
                       .attr("y", 0);

                   // Create the scatter variable: where both the circles and the brush take place
                   var scatter = SVG.append('g')
                     .attr("clip-path", "url(#clip)")

                    var max = d3.max(data, function(d) { return d.Burgalary_sum; });
                    console.log(max);

                    var y = d3.scaleLinear()
                      .domain([0, 440000])
                      .range([ dimensions.boundedHeight, 0]);

                var yAxis = d3.axisLeft(y)

                changing_axis.transition()
                .call(yAxis)

                dots.transition()
                    .attr("cx", function (d) { return x(d.year); } )
                    .attr("cy", function (d) { return y(d[nameSelected]); } )
                    .attr("r", 8)
                    .style("fill", "#251e3e")
                    .style("opacity", 1.5)
})

//button 4 end


//button 5



//button 5 end
})
