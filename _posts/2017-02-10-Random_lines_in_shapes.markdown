---
layout: post
title:  "Random Lines in SVG Shapes"
date:   2017-02-10 19:36:55 +0300
categories: projects
comments: true
---
I came to this small project after watching [video][video] by Daniel Shiffman

I haven't made a full version of star patterns yet, before finishing I found this interesting pattern:
draw a shape (hexagon, scuare or triangle), then find a random point in each edge of figure, and draw a random lines between this random points. Sometimes you can get an interesting results with this simple rules. Try it and save the result with download button!
<style>
  .tile polygon {
    pointer-events: visiblePainted;
    stroke-width: 1.5;
  }

  .tile line {
  stroke-width: 1.5;
  }

  .displaynone {
  display: none;
  }
  input[type="text"] {
    width: 60px;
  }
</style>

<h1>Figures</h1>
Set SVG width:
<input type="text" id="svgWidth" name="" value="740" >
Set SVG height:
<input type="text" id="svgHeight" value="340">
<br>
Set number of lines (multiply by number of edges):
<input type="text" id="lines" value="1">
<br>
Set figure background color:
<input type="color" id="bgColor" name="background" value="#EDEDED">
Set line color:
<input type="color" id="lineColor" value="#101010">
<br>
Figure:
<select id="figure_select">
  <option value="HEX">Hex</option>
  <option value="Triangle">Triangle</option>
  <option value="Square">Square</option>
</select>
Add size (from center to corner):
<input type="text" id="sizeValue" name="" value="60">
Offset:
<input type="text" id="offsetValue" name="" value="5">
<br>
<button type="button" class="button-primary" name="generate" id="generate">Generate Sprite</button>
<div id="Figure"></div>
<button id="download">Download SVG</button>

<script src="/assets/JS/Random_Lines_In_Shape/main.min.js"></script>

[video]: https://www.youtube.com/watch?v=sJ6pMLp_IaI
