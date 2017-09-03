---
layout: post
title:  "Maurer Rose"
date:   2017-02-14 20:35:55 +0300
categories: projects
comments: true
---
Mathematics can be very beautiful. Below is javascript implementation of mathematical rose - (rhodonea curve is a sinusoid plotted in polar coordinates) with Maurer rose (consists of some lines that connect some points on a rose curve).
Formulas is relatively simple, and can be found in wikipedia pages: [Mathematical Rose][rose] and [Maurer rose][maurer].

Good place to start for you to experiments with rose is this chart:

<i>Mathematical "rose" or "rhodonea" curves, based on the polar-coordinates equation r=cos(θ*n/d). In this chart, the values of parameter n varies from 1 to 7, while d varies from 1 to 9.</i>

<img src="{{ site.url }}/assets/JS/Maurer_rose/Rose-rhodonea-curve-7x9-chart-improved.svg.png" alt="">

The Rose itself is red and "Maurer" part is blue. A Maurer rose of the rose r = sin(nθ) consists of the 360 lines successively connecting the above 361 points. Thus a Maurer rose is a polygonal curve with vertices on a rose. "maurer" parameter defines an angle between start of walk (first line) and next step (next line). The first line starts at coordinates (0,0) and there the final line ends.

Experiments with rose and her Maurer part can be very interesting.

I suggest for you to try: 
[n: 0.01, d: 8.16, maurer: 21],
[n: 2, d: 1, maurer: 71],
[n: 2, d: 5, maurer: 56],
[n: 7, d: 1, maurer: 29],
[n: 5, d: 2, maurer: 66], and so on

NB! [New and all inproved version](https://codepen.io/Igor_Konovalov/full/ZJwPQv/)

Possibilities are infinite, have fun! Source code - on my [GitHub][Rose_source]

<h2>Happy Valentine's!</h2>

<canvas id="rose" width="600" height="600" style="background-color: black"></canvas>
<br>
Select n: <input type="text" name="" value="20" id="n">
Select d: <input type="text" name="" value="2" id="d">
Select maurer: <input type="text" name="" value="71" id="maurer">
<button id="generate" class="button-primary">Generate</button>
<p><input type="checkbox" id="showRose" checked> Show rose
<input type="checkbox" id="showMaurer" checked> Show Maurer lines</p>
<div class="flexContainer">
  <div class="spans">
    <span>Select n: </span>
    <span>Select d: </span>
    <span>Select maurer: </span>
  </div>
  <div class="inputs">
    <input type="range" id="rangeN" name="" value="20" min="0" max="20" step="0.1">
    <input type="range" id="rangeD" name="" value="2" min="0" max="30" step="0.1">
    <input type="range" id="rangeMaurer" name="" value="71" min="0" max="360" step="1">
  </div>
  <div class="spansValue">
    <span id="rangeNValue"></span>
    <span id="rangeDValue"></span>
    <span id="rangeMaurerValue"></span>
  </div>
</div>


<script src="{{ site.url }}/assets/JS/Maurer_rose/main.min.js"></script>

<style>
 button {
   margin-top: -3px;
   margin-left: 10px;
 }
  span {
    margin-top: 2px;
    margin-left:5px;
  }
  input[type="text"] {
    width: 50px;
  }
  .flexContainer {
    max-width: 740px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
        flex-direction: row;
    -ms-flex-pack: justify;
        justify-content: space-between;
    -ms-flex-align: center;
        align-items: center;
  }
  .spans,
  .inputs,
  .spansValue {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
        flex-direction: column;
  }
  .spansValue {
    min-width: 10%;
  }
  .inputs {
    min-width: 70%;
  }
  input[type="range"] {
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    canvas {
      width: 340px;
      }
  }
</style>

[Rose_source]:https://github.com/IgorKonovalov/Little_projects/tree/master/Maurer_Rose
[rose]:https://en.wikipedia.org/wiki/Rose_(mathematics)
[maurer]:https://en.wikipedia.org/wiki/Maurer_rose
