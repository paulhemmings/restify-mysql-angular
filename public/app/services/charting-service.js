'use strict';

angular
    .module('MainApplicationModule')
    .service('ChartingService', ['$rootScope', 'ChartingFactory', function OpenLayersService($rootScope, ChartingFactory) {

        this.onDisplayReady = function() {
            $rootScope.$broadcast('charting-event-ready');
        },

        this.emptyChart = function() {
            ChartingFactory().selectAll("svg > *").remove();
        }

        this.loadBarChart = function(containerId, data) {
            // get the charting object
            var id3 = ChartingFactory();
            // use it
            var margin = {top: 20, right: 30, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = id3.scale.ordinal()
                .rangeRoundBands([0, width], .1)
                .domain(data.map(function(d) { return d.name; }));

            var y = id3.scale.linear()
                .range([height, 0])
                .domain([0, d3.max(data, function(d) { return d.value; })]);

            var xAxis = id3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = id3.svg.axis()
                .scale(y)
                .orient("left");

            var chart = id3.select(".chart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            chart.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            chart.selectAll(".bar")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.name); })
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("width", x.rangeBand());
            // return chart complete
            this.onDisplayReady();
        };

    }]);
