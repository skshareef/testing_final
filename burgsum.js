var dimensions = {
    width: 1200,
    height: 400,
    margin: {
        top: 20,
        bottom: 21,
        right: 10,
        left: 90
    }
}
dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

var x = d3.scaleBand()
    .range([0, dimensions.boundedWidth])
    .padding(0.3);
var y = d3.scaleLinear()
    .range([dimensions.boundedHeight, 0]);

var sum = 0
var result = []
var burgsum_arr = []
var rapesum_arr = []
var rapesum_result = []
var robberysum_arr = []
var robberysum_result = []
var aggressivesum_arr = []
var aggressivesum_result = []
// get the data
d3.csv("Final_dataset.csv").then(
    function (data) {
        var key = data.map(function (d) {
            return +d.Year;
        })
        console.log(key)
        var element = data.map(function (d) {
            return +d.Burgalary_sum;
        })

        for (var i = 0; i < key.length; i++) {
            if (key[i] == key[i + 1]) {
                sum = sum + element[i]
            } else {
                burgsum_arr.push(sum)
                sum = 0
            }
        }
        console.log(burgsum_arr)
        var years_arr = ['1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986',
            '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994',
            '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007',
            '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015',
        ]
        var result = years_arr.map((letter, i) => ({
            letter,
            frequency: burgsum_arr[i]
        }));

        console.log(result);

        //Array Calculations for Rape sum
        var sum1 = 0;
        var key1 = data.map(function (d) {
            return +d.Year;
        })
        console.log(key1)
        var element1 = data.map(function (d) {
            return +d.Rape_sum;
        })

        for (var i = 0; i < key.length; i++) {
            if (key1[i] == key1[i + 1]) {
                sum1 = sum1 + element1[i]
            } else {
                rapesum_arr.push(sum1)
                sum1 = 0
            }
        }
        console.log(rapesum_arr)

        var result1 = years_arr.map((letter, i) => ({
            letter,
            frequency: rapesum_arr[i]
        }));
        console.log(result1);

        //Array Calculations for Robbery Sum
        var sum2 = 0;
        var key2 = data.map(function (d) {
            return +d.Year;
        })
        console.log(key2)
        var element2 = data.map(function (d) {
            return +d.Robbery_sum;
        })

        for (var i = 0; i < key2.length; i++) {
            if (key2[i] == key2[i + 1]) {
                sum2 = sum2 + element2[i]
            } else {
                robberysum_arr.push(sum2)
                sum2 = 0
            }
        }
        console.log(robberysum_arr)

        var result2 = years_arr.map((letter, i) => ({
            letter,
            frequency: robberysum_arr[i]
        }));
        console.log(result2);

        //Array Calculations for Aggressive Sum
        var sum3 = 0;
        var key3 = data.map(function (d) {
            return +d.Year;
        })
        console.log(key3)
        var element3 = data.map(function (d) {
            return +d.Aggressive_sum;
        })

        for (var i = 0; i < key3.length; i++) {
            if (key3[i] == key3[i + 1]) {
                sum3 = sum3 + element3[i]
            } else {
                aggressivesum_arr.push(sum3)
                sum3 = 0
            }
        }
        console.log(aggressivesum_arr)

        var result3 = years_arr.map((letter, i) => ({
            letter,
            frequency: aggressivesum_arr[i]
        }));
        console.log(result3);

        var svg_ele = d3.select("#map2").append("svg")
            .attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
            .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

        result.forEach(function (d) {
            d.frequency = +d.frequency;
        });

        x.domain(result.map(function (d) {
            return d.letter;
        }));
        y.domain([0, d3.max(result, function (d) {
            return d.frequency;
        })]);

        svg_ele.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", -80)
                .attr("x", -150)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .style("font-size", 20)
                .style("font-style", "Lucida Console")
                .text("Total Number Of Cases");

        var rect = svg_ele.selectAll(".bar")
            .data(result)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.letter);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.frequency);
            })
            .attr("height", function (d) {
                return dimensions.boundedHeight - y(d.frequency);
            })

            .on('mouseenter', function (d) {
                d3.select(this)
                    //.transition()
                    .attr("opacity", 0.5)
                    .attr('width', x.bandwidth() + 5)
                    .text(d.frequency)
            })
            .on("mouseleave", function (d) {
                d3.select(this).attr("opacity", 1)
                    .attr('width', x.bandwidth())
            });
            //.on("mouseover", function() { d3.select(this).attr("fill", "red"); });
        // add the x Axis
        svg_ele.append("g")
            .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg_ele.append("g")
            .call(d3.axisLeft(y));


        //For Button Burgalary_sum
        d3.select("#Burgalary_sum2").on("click", function () {
            svg_ele.selectAll("*").remove();
            result.forEach(function (d) {
                d.frequency = +d.frequency;
            });

            x.domain(result.map(function (d) {
                return d.letter;
            }));
            y.domain([0, d3.max(result, function (d) {
                return d.frequency;
            })]);
            svg_ele.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y", -80)
                    .attr("x", -150)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .style("font-size", 20)
                    .style("font-style", "Lucida Console")
                    .text("Total Number Of Cases");

            var rect = svg_ele.selectAll(".bar")
                .data(result)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.letter);
                })

                .on('mouseenter', function (d) {
                    d3.select(this)
                        //.transition()
                        .attr("opacity", 0.5)
                        .attr('width', x.bandwidth() + 5)

                    })

                .on("mouseleave", function (d) {
                    d3.select(this).attr("opacity", 1)
                        .attr('width', x.bandwidth())
                })
                .attr("width", x.bandwidth())
                .attr("y", function (d) {
                    return y(d.frequency);
                })

                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .delay(function(d,i){ return i*20})
                .attr("height", function (d) {
                    return dimensions.boundedHeight - y(d.frequency);
                })
                .style("fill", "rgb(250, 164, 102)");

            // add the x Axis
            svg_ele.append("g")
                .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg_ele.append("g")
                .call(d3.axisLeft(y));
            //For sorting Burgalary_sum
            d3.select("#sort").on('click', function () {
                svg_ele.selectAll("*").remove();
                var new_result = result;
                new_result = new_result.slice().sort((a, b) => d3.descending(a.frequency, b.frequency))
                console.log(new_result)

                new_result.forEach(function (d) {
                    d.frequency = +d.frequency;
                });
                x.domain(new_result.map(function (d) {
                    return d.letter;
                }));
                y.domain([0, d3.max(new_result, function (d) {
                    return d.frequency;
                })]);
                svg_ele.append("text")
                        .attr("class", "y label")
                        .attr("text-anchor", "end")
                        .attr("y", -80)
                        .attr("x", -150)
                        .attr("dy", ".75em")
                        .attr("transform", "rotate(-90)")
                        .style("font-size", 20)
                        .style("font-style", "Lucida Console")
                        .text("Total Number Of Cases");

                var rect = svg_ele.selectAll(".bar")
                    .data(new_result)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.letter);
                    })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) {
                        return y(d.frequency);
                    })

                    .on('mouseenter', function (d) {
                        d3.select(this)
                            //.transition()
                            .attr("opacity", 0.5)
                            .attr('width', x.bandwidth() + 5)

                        })

                    .on("mouseleave", function (d) {
                        d3.select(this).attr("opacity", 1)
                            .attr('width', x.bandwidth())
                    })
                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .delay(function(d,i){ return i*20})
                .attr("height", function (d) {
                    return dimensions.boundedHeight - y(d.frequency);
                })
                    .style("fill", "rgb(250, 164, 102)");


                // add the x Axis
                svg_ele.append("g")
                    .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                    .call(d3.axisBottom(x));

                // add the y Axis
                svg_ele.append("g")
                    .call(d3.axisLeft(y));
            })
        })


        //For Button Rape_sum
        d3.select("#Rape_sum2").on("click", function () {
            svg_ele.selectAll("*").remove();
            result1.forEach(function (d) {
                d.frequency = +d.frequency;
            });

            x.domain(result1.map(function (d) {
                return d.letter;
            }));
            y.domain([0, d3.max(result1, function (d) {
                return d.frequency;
            })]);
            svg_ele.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y", -80)
                    .attr("x", -150)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .style("font-size", 20)
                    .style("font-style", "Lucida Console")
                    .text("Total Number Of Cases");

            var rect = svg_ele.selectAll(".bar")
                .data(result1)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.letter);
                })

                .on('mouseenter', function (d) {
                    d3.select(this)
                        //.transition()
                        .attr("opacity", 0.5)
                        .attr('width', x.bandwidth() + 5)

                    })

                .on("mouseleave", function (d) {
                    d3.select(this).attr("opacity", 1)
                        .attr('width', x.bandwidth())
                })
                .attr("width", x.bandwidth())
                .attr("y", function (d) {
                    return y(d.frequency);
                })
                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .delay(function(d,i){ return i*20})
                .attr("height", function (d) {
                    return dimensions.boundedHeight - y(d.frequency);
                })
                .attr("height", function (d) {
                    return dimensions.boundedHeight - y(d.frequency);
                })
                .style("fill", "rgb(129, 120, 222)");

            // add the x Axis
            svg_ele.append("g")
                .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg_ele.append("g")
                .call(d3.axisLeft(y));
            //For sorting Rape_sum
            d3.select("#sort").on('click', function () {
                svg_ele.selectAll("*").remove();
                var new_result1 = result1;
                new_result1 = new_result1.slice().sort((a, b) => d3.descending(a.frequency, b.frequency))
                console.log(new_result1)

                new_result1.forEach(function (d) {
                    d.frequency = +d.frequency;
                });
                x.domain(new_result1.map(function (d) {
                    return d.letter;
                }));
                y.domain([0, d3.max(new_result1, function (d) {
                    return d.frequency;
                })]);
                svg_ele.append("text")
                        .attr("class", "y label")
                        .attr("text-anchor", "end")
                        .attr("y", -80)
                        .attr("x", -150)
                        .attr("dy", ".75em")
                        .attr("transform", "rotate(-90)")
                        .style("font-size", 20)
                        .style("font-style", "Lucida Console")
                        .text("Total Number Of Cases");

                var rect = svg_ele.selectAll(".bar")
                    .data(new_result1)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.letter);
                    })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) {
                        return y(d.frequency);
                    })
                    .on('mouseenter', function (d) {
                        d3.select(this)
                            //.transition()
                            .attr("opacity", 0.5)
                            .attr('width', x.bandwidth() + 5)

                        })

                    .on("mouseleave", function (d) {
                        d3.select(this).attr("opacity", 1)
                            .attr('width', x.bandwidth())
                    })
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(500)
                    .delay(function(d,i){ return i*20})
                    .attr("height", function (d) {
                        return dimensions.boundedHeight - y(d.frequency);
                    })
                    .style("fill", "rgb(129, 120, 222)");


                // add the x Axis
                svg_ele.append("g")
                    .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                    .call(d3.axisBottom(x));

                // add the y Axis
                svg_ele.append("g")
                    .call(d3.axisLeft(y));
            })
        })


        //For Button Robbery_sum
        d3.select("#Robbery_sum2").on("click", function () {
            svg_ele.selectAll("*").remove();
            result2.forEach(function (d) {
                d.frequency = +d.frequency;
            });

            x.domain(result2.map(function (d) {
                return d.letter;
            }));
            y.domain([0, d3.max(result2, function (d) {
                return d.frequency;
            })]);
            svg_ele.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y", -80)
                    .attr("x", -150)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .style("font-size", 20)
                    .style("font-style", "Lucida Console")
                    .text("Total Number Of Cases");

            var rect = svg_ele.selectAll(".bar")
                .data(result2)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.letter);
                })
                .attr("width", x.bandwidth())
                .attr("y", function (d) {
                    return y(d.frequency);
                })
                .on('mouseenter', function (d) {
                    d3.select(this)
                        //.transition()
                        .attr("opacity", 0.5)
                        .attr('width', x.bandwidth() + 5)

                    })

                .on("mouseleave", function (d) {
                    d3.select(this).attr("opacity", 1)
                        .attr('width', x.bandwidth())
                })
                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .delay(function(d,i){ return i*20})
                .attr("height", function (d) {
                    return dimensions.boundedHeight - y(d.frequency);
                })
                .style("fill", "rgb(103, 184, 173)");

            // add the x Axis
            svg_ele.append("g")
                .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg_ele.append("g")
                .call(d3.axisLeft(y));
            //For sorting Robbery_sum
            d3.select("#sort").on('click', function () {
                svg_ele.selectAll("*").remove();
                var new_result2 = result2;
                new_result2 = new_result2.slice().sort((a, b) => d3.descending(a.frequency, b.frequency))
                console.log(new_result2)

                new_result2.forEach(function (d) {
                    d.frequency = +d.frequency;
                });
                x.domain(new_result2.map(function (d) {
                    return d.letter;
                }));
                y.domain([0, d3.max(new_result2, function (d) {
                    return d.frequency;
                })]);
                svg_ele.append("text")
                        .attr("class", "y label")
                        .attr("text-anchor", "end")
                        .attr("y", -80)
                        .attr("x", -150)
                        .attr("dy", ".75em")
                        .attr("transform", "rotate(-90)")
                        .style("font-size", 20)
                        .style("font-style", "Lucida Console")
                        .text("Total Number Of Cases");

                var rect = svg_ele.selectAll(".bar")
                    .data(new_result2)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.letter);
                    })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) {
                        return y(d.frequency);
                    })

                    .on('mouseenter', function (d) {
                        d3.select(this)
                            //.transition()
                            .attr("opacity", 0.5)
                            .attr('width', x.bandwidth() + 5)

                        })

                    .on("mouseleave", function (d) {
                        d3.select(this).attr("opacity", 1)
                            .attr('width', x.bandwidth())
                    })
                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .delay(function(d,i){ return i*20})
                    .attr("height", function (d) {
                        return dimensions.boundedHeight - y(d.frequency);
                    })
                    .style("fill", "rgb(103, 184, 173)");

                // add the x Axis
                svg_ele.append("g")
                    .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                    .call(d3.axisBottom(x));

                // add the y Axis
                svg_ele.append("g")
                    .call(d3.axisLeft(y));
            })
        })
        //For Button Aggressive_sum
        d3.select("#Aggressive_sum2").on("click", function () {
            svg_ele.selectAll("*").remove();
            result3.forEach(function (d) {
                d.frequency = +d.frequency;
            });

            x.domain(result3.map(function (d) {
                return d.letter;
            }));
            y.domain([0, d3.max(result3, function (d) {
                return d.frequency;
            })]);
            svg_ele.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y", -80)
                    .attr("x", -150)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .style("font-size", 20)
                    .style("font-style", "Lucida Console")
                    .text("Total Number Of Cases");

            var rect = svg_ele.selectAll(".bar")
                .data(result3)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.letter);
                })
                .attr("width", x.bandwidth())
                .attr("y", function (d) {
                    return y(d.frequency);
                })

                .on('mouseenter', function (d) {
                    d3.select(this)
                        //.transition()
                        .attr("opacity", 0.5)
                        .attr('width', x.bandwidth() + 5)

                    })

                .on("mouseleave", function (d) {
                    d3.select(this).attr("opacity", 1)
                        .attr('width', x.bandwidth())
                })
                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .delay(function(d,i){ return i*20})
                .attr("height", function (d) {
                    return dimensions.boundedHeight - y(d.frequency);
                })
                .style("fill", "rgb(137, 245, 153)");

            // add the x Axis
            svg_ele.append("g")
                .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg_ele.append("g")
                .call(d3.axisLeft(y));
            //For sorting Aggressive_sum
            d3.select("#sort").on('click', function () {
                svg_ele.selectAll("*").remove();
                var new_result3 = result3;
                new_result3 = new_result3.slice().sort((a, b) => d3.descending(a.frequency, b.frequency))
                console.log(new_result3)

                new_result3.forEach(function (d) {
                    d.frequency = +d.frequency;
                });
                x.domain(new_result3.map(function (d) {
                    return d.letter;
                }));
                y.domain([0, d3.max(new_result3, function (d) {
                    return d.frequency;
                })]);
                svg_ele.append("text")
                        .attr("class", "y label")
                        .attr("text-anchor", "end")
                        .attr("y", -80)
                        .attr("x", -150)
                        .attr("dy", ".75em")
                        .attr("transform", "rotate(-90)")
                        .style("font-size", 20)
                        .style("font-style", "Lucida Console")
                        .text("Total Number Of Cases");

                var rect = svg_ele.selectAll(".bar")
                    .data(new_result3)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.letter);
                    })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) {
                        return y(d.frequency);
                    })

                    .on('mouseenter', function (d) {
                        d3.select(this)
                            //.transition()
                            .attr("opacity", 0.5)
                            .attr('width', x.bandwidth() + 5)

                        })

                    .on("mouseleave", function (d) {
                        d3.select(this).attr("opacity", 1)
                            .attr('width', x.bandwidth())
                    })
                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .delay(function(d,i){ return i*20})
                    .attr("height", function (d) {
                        return dimensions.boundedHeight - y(d.frequency);
                    })
                  .style("fill", "rgb(137,245,153)")  ;

                // add the x Axis
                svg_ele.append("g")
                    .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                    .call(d3.axisBottom(x));

                // add the y Axis
                svg_ele.append("g")
                    .call(d3.axisLeft(y));
            })
        })
    })
