---
layout: post
title:  "Random walker with vector object (Lévy flight)"
date:   2017-02-01 22:47:55 +0300
categories: projects
comments: true
---

Hey everyone! After yesterday attempt to code random walker, I thought it would be a good idea to implement almost same thing but with vector object. As far as I know it's common practice to use vectors to describe coordinates and speed of objects - and it turns to be a good idea in this little do-it-after-came-back-from-work project. Previous version of random walker is [here][RW1]

Take a look at it first, some explanation below:
<canvas width="740px" height="600px" style="background-color: black"></canvas>
<button id="stopB">Stop</button>
<script src="{{ site.url }}/assets/JS/Random_Walker_2/index.js"></script>

<style>
  @media screen and (max-width: 600px) {
    canvas {
      width: 340px;
      }
  }
</style>

Code for vector object is pretty simple - it describes coordinates on canvas:
{% highlight javascript %}
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
{% endhighlight %}

I also needed some sort of random vector with set length - to describe next step of walker:
{% highlight javascript %}
function randomNumber(min, max) {
  if (min > 0)
    return (max - min) * Math.random();
  else
    return (max - min) * Math.random() + min;
}
function randomSign() {
  let test = Math.round(Math.random() * 2);
  if (test == 1)
    return -1;
  else
    return 1;
}
Vector.prototype.random = function(length) {
  x = randomNumber(-length, length);
  y = Math.sqrt(Math.pow(length, 2) - Math.pow(x, 2)) * randomSign();
  return new Vector(x, y);
}
{% endhighlight %}

After that, I only needed to put start of line on previous point (initial vector), than plus random vector to it and draw a line. Super simple.
Full code - on my [GitHub][RW2_code]

[RW2_code]: https://github.com/IgorKonovalov/Little_projects/tree/master/Random_walker
[RW1]: https://IgorKonovalov.github.io/projects/2017/01/31/Simple_Random_walker.html
