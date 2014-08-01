'use strict';

var svg = d3.select('#d3-playground').append('svg');
var data = [5, 12, 4, 9, 2, 10, 2, 7, 8, 11, 6, 1];

var width = 800,
    height = 300,
    barPadding = 1;
svg
  .attr('width', width)
  .attr('height', height)

svg.append('foreignObject')
  .attr('x', 50)
  .attr('y', 50)
  .attr('width', 300)
  .attr('height', 300)
  .append('xhtml:div')
  .html('<p>HTML Paragraph</p>');
//var bars = svg.selectAll('rect')
              //.data(data)
              //.enter()
              //.append('rect')
//bars
  //.attr('x', function (d, i) {
    //return i * (width / data.length)
  //})
  //.attr('y', function (d) {
    //return height - d * 24;
  //})
  //.attr('width', width / data.length - barPadding)
  //.attr('height', function (d) {
    //return d * 24;
  //})
//var labels = svg.selectAll('text')
  //.data(data)
  //.enter()
  //.append('text')

//labels
  //.text(function (d) {
    //return d;
  //})
  //.attr('x', function (d, i) {
    //return i * (width / data.length) + 10;
  //})
  //.attr('y', function (d) {
    //return (height - (d * 24)) + 25;
  //})
  //.style('fill', 'white')


//var circles = svg.selectAll('circle')
  //.data(data)
  //.enter()
  //.append('circle')

//circles
  //.attr('cx', function (d, i) {
    //return (i * 50) + 25;
  //})
  //.attr('cy', height/2)
  //.attr('r', function (d) {
    //return d * 2;
  //});

//d3.select('#d3-playground').selectAll('div')
  //.data(data)
  //.enter()
  //.append('div')
  //.classed('bar', true)
  //.style('height', function (d) {
    //var barHeight = d * 5;
    //return barHeight + 'px';
  //});
