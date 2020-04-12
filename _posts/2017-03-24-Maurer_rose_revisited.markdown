---
layout: post
title:  "Mathematical Rose Walker"
date:   2017-03-24 16:35:55 +0300
categories: projects
comments: true
---
This is a simple walker, reflecting given path. The path is mathematical rose - you can read about it in [wikipedia](https://en.wikipedia.org/wiki/Rose_(mathematics)) and have a look into another small project I did with this shapes [here](https://igorkonovalov.github.io/projects/2017/02/14/Maurer_rose.html)

Project inspired by [@beesandbombs](https://twitter.com/beesandbombs) and [@shiffman](https://twitter.com/shiffman) - take a look at them - they are both amazing!

<h1>Press Start!</h1>

<style>
  @media screen and (max-width: 600px) {
    canvas {
      width: 340px;
      }
  }
</style>

<span>Number of petals: <input type="text" name="" value="3" id="n"></span>
<button id="start">START</button>
<br>
<canvas id="canvas" width="740" height="740" style="background-color: black"></canvas>
<br>
[Source code](https://github.com/IgorKonovalov/Little_projects/tree/master/Maurer_Rose_Walker)

<script src="/assets/JS/Maurer_rose_revisited/index.js"></script>
