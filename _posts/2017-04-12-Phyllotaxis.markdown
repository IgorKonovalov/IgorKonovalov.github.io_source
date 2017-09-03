---
layout: post
title:  "Phyllotaxis"
date:   2017-04-12 12:35:55 +0300
categories: projects
comments: true
---

<p>As in <a href="https://en.wikipedia.org/wiki/Phyllotaxis">wikipedia</a>, Phyllotaxis or phyllotaxy is the arrangement of leaves on a plant stem (from Ancient Greek phýllon “leaf” and táxis “arrangement”). Phyllotactic spirals form a distinctive class of patterns in nature.</p>

<p>Below is my attempt to recreate something similar on canvas:</p>

<style>
  @media screen and (max-width: 600px) {
    canvas {
      width: 340px;
      }
  }
</style>

<p>Select angle: <input type="text" name="" value="135.5" id="angle" />
<button id="start">START</button>
<br /></p>
<canvas id="canvas" width="740px" height="740px" style="background-color: black"></canvas>

<p><a href="https://github.com/IgorKonovalov/Little_projects/tree/master/Phyllotaxis">Source code</a></p>

<script src="/assets/JS/Phyllotaxis/index.js"></script>
