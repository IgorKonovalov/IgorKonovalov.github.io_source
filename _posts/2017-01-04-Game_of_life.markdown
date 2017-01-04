---
layout: post
title:  "Game Of Life!"
date:   2017-01-04 17:36:55 +0300
categories: projects
---

This is the game of Life

<style>
  button {
    margin: 3px;
    font-size: 14px;
  }
</style>
<canvas id="game" width="740px" height="600px" style="background-color: lightgray"></canvas>
<br>
<button id="random" style="margin-left: 0px;">Randomize</button>
<button id="step" style="margin-left: 0px;">Next Step</button>
<span>Speed: </span>
<input type="text" id="speed" value="10">
<button id="start">Start</button>
<button id="pause">Pause</button>

<script src="{{ site.url }}/assets/JS/Game_of_Life/index.js"></script>
