/**********************SCATTER CHART ************************/
  //SET VARIABLES
  var w = 607;
  var h = 301;
  var padding = 30;

  var svghead = document.getElementById("svghead");


  //GENERATE DATA
  var scatterData = [];
  var numDataPoints = 50;
  var maxRange = Math.random() * 1000;
  for(var i=0; i < numDataPoints; i++){
    var num1 = Math.floor(Math.random() * maxRange);
    var num2 = Math.floor(Math.random() * maxRange);
      scatterData.push([num1, num2]);
  };

  //DEFINE SCALES
  var xScale = d3.scale.linear()
                  .domain([0, d3.max(scatterData, function(d){
                    return d[0];
                  })])
                  .range([padding, w-padding*2]);

  var yScale = d3.scale.linear()
                  .domain([0, d3.max(scatterData, function(d){
                    return d[1];
                  })])
                  .range([h-padding, padding*2]);

  var rScale = d3.scale.linear()
                  .domain([0, d3.max(scatterData, function(d){
                    return d[1];
                  })])
                  .range([0, 20]);

  //DEFINE AXES
  //var formatAsPercentage = d3.format(".1%");
  var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(10)
                .tickFormat(function(d){ return d; });

  var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);


  //CREATE SVG CONTAINER
  var svg = d3.select("#svghead")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  //CREATE CIRCLES
    svg.selectAll("circle")
        .data(scatterData)
        .enter()
        .append("circle")
        .attr("cx", function(d){
          return xScale(d[0]);
        })
        .attr("cy", function(d){
          return yScale(d[1]);
        })
        .attr("r", function(d){
          return rScale(d[1] *0.75);
        });

  //CREATE AXES
    svg.append("g")
        .attr("class", "scatterx axis")
        .attr("transform", "translate(0," + (h-padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "scattery axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

  //EVENT TRIGGER
  d3.select("#changebutton2")
    .on(
      "click",
      function(){

        //generate random numbers
        var numValues = scatterData.length;
        var maxRange = Math.random() * 1000;
        scatterData = [];
        for(var i=0; i < numValues; i++){
          var num1 = Math.floor(Math.random() * maxRange);
          var num2 = Math.floor(Math.random() * maxRange);
            scatterData.push([num1, num2]);
        };

        //update scale domains
        xScale.domain([0, d3.max(scatterData, function(d){ return d[0]; })]);
        yScale.domain([0, d3.max(scatterData, function(d){ return d[1]; })]);

        //svg attach
        svg.selectAll("circle")
            .data(scatterData)
            .transition()
            .duration(1000)
            .ease("circle")
            .attr("cx", function(d){
              return xScale(d[0]);
            })
            .attr("cy", function(d){
              return yScale(d[1]);
            })
            .attr("r", function(d){
              return rScale(d[1] * 0.75);
            });

        //axis update
        svg.select(".scatterx.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        svg.select(".scattery.axis")
            .transition()
            .duration(1000)
            .call(yAxis);
      }
    );

/**********************BAR CHART ************************/

  var barpadding = 1;
  var dataset = [190, 191, 106, 225, 136, 15, 55, 179, 184, 254, 101, 170, 127, 30, 285, 265, 203, 102, 207, 171, 145, 116, 192, 287, 101];

  //SET SCALE
  var xScaleBar = d3.scale.ordinal()
                    .domain(d3.range(dataset.length))
                    .rangeRoundBands([0, w], 0.05);

  var yScaleBar = d3.scale.linear()
                  .domain([0, d3.max(dataset)])
                  .range([0, h]);


  //CREATE BAR CHART
  var svgBar = d3.select("#barchart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h);


  //CREATE BARS
  svgBar.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("x", function(d,i){
            return xScaleBar(i);
          })
          .attr("y", function(d) {
            return h - yScaleBar(d);
          })
          .attr("width", xScaleBar.rangeBand())
          .attr("height", function(d){
            return yScaleBar(d);
          })
          .attr("fill", function(d) {
            return "rgb(0,0, " + Math.round(d/3) + ")";
          });


  //CREATE LABELS
  svgBar.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
          return d;
        })
        .attr("x", function(d,i){
          return xScaleBar(i) + (w/dataset.length) / 2;
        })
        .attr("y", function(d){
          return (h - yScaleBar(d)) + 15;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");


  //ADD EVENT LISTENER
  d3.select("#changebutton")
    .on(
        "click",
        function(){

          //generate random numbers
          var numValues = dataset.length;
          var maxValue = 290;
          dataset = [];
          for (var i = 0; i < numValues; i++){
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
          };

          //update scale
          yScale.domain([0, d3.max(dataset)]);

          svgBar.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d, i){
                  return i * 100;
                })
                .duration(500)
                .ease("circle")
                .attr("y", function(d){
                  return h - yScaleBar(d);
                })
                .attr("height", function(d){
                  return yScaleBar(d);
                })
                .attr("fill", function(d) {
                  return "rgb(0,0, " + Math.round(d/3) + ")";
          });

          //update numbers
          svgBar.selectAll("text")
                .data(dataset)
                .transition()
                .delay(function(d, i){
                  return i * 100;
                })
                .duration(500)
                .ease("circle")
                .text(function(d){
                  return d;
                })
                .attr("x", function(d, i){
                  return xScaleBar(i) + (w/dataset.length) / 2;
                })
                .attr("y", function(d, i){
                  return (h - yScaleBar(d)) + 15;
                });
    });
