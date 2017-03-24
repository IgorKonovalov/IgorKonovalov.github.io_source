---
layout: post
title:  "Islamic Star Patterns in SVG"
date:   2017-03-08 12:20:55 +0300
categories: projects
comments: true
---

This is a little project I made under influence of another David Shiffman's [video](https://www.youtube.com/watch?v=sJ6pMLp_IaI). The implementation I found rather intriguing and interesting to redo in SVG. Here is my attempt - I've used a code in [Coding Train](https://github.com/CodingTrain) repo for [Islamic Star Patterns](https://github.com/CodingTrain/StarPatterns) and completely rewrite it for vanilla Javascript and rendering in SVG. This project really helped me to understand OOP paradigm in JS, and helped a lot in the next project (You'll see it very soon), and to understand how SVG animation working.

If you have any suggestions - please write me on [twitter](https://twitter.com/igor_dlinni). All code is available on my [Github](https://github.com/IgorKonovalov/Islamic_Star_Patterns_SVG) - this time I decided that this project is big enough for separate repository - feel free to make issue/PR/fork/etc.. There is a lot improve - another objects (triangles, etc), customization through CSS and so on.

Interesting part of this project is implementing standard P5.JS Vector objects - The best way to understand something for me is rewriting it. I needed a lot of vector methods for making this thing work. Here is rotating function, for example:

{% highlight javascript %}
Vector.prototype.rotate = function(angle) {
    x = Math.round(10000*(this.x * Math.cos(angle) - this.y * Math.sin(angle)))/10000;
    y = Math.round(10000*(this.x * Math.sin(angle) + this.y * Math.cos(angle)))/10000;
    return new Vector(x, y);
}
{% endhighlight %}

And many more - take a look at [repository](https://github.com/IgorKonovalov/Islamic_Star_Patterns_SVG)

So enjoy, experiment and share your thoughts!

<h1>Islamic Star Patterns in SVG</h1>
<div class="container">
  <div class="controls">
    <span>DELTA: </span><input type="range" id="delta" name="" value="10" min="0" max="50" step="1">
    <span>ANGLE: </span><input type="range" id="angle" name="" value="30" min="0" max="90" step="1">
  </div>
  <div class="controls">
    <span>deltainc: </span><input type="range" id="deltaInc" name="" value="0" min="-0.5" max="0.5" step="0.01">
    <span>angleinc: </span><input type="range" id="angleInc" name="" value="0" min="-1" max="1" step="0.01">
  </div>
</div>
<br>
<div id="svgContainer"></div>
<select class="" id="tiling">
  <option value="square">Square</option>
  <option value="hex">Hexagon</option>
</select>

<script src="{{ site.url }}/assets/JS/Islamic_Star_Patterns_SVG/main.js"></script>

<style>
* {
    box-sizing: border-box;
  }

  .container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
        flex-direction: column;
    width: 700px;
  }
  .controls {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .controls span {
    width: 170px;
    display: -ms-flexbox;
    display: flex;
  }

  .controls input{
    width: 100%;
    margin-right: 5px;
  }
  .tile polygon {
      pointer-events: visiblePainted;
      fill: hsla(279, 100%, 5%, 1);
      stroke: hsla(0, 100%, 100%, 1);
      stroke-width: .3;

  }

  .tile line {
    stroke: hsla(0, 100%, 100%, 1);
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 0;
  }
</style>
