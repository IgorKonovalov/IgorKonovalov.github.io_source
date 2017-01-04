---
layout: post
title:  "Game Of Life!"
date:   2017-01-04 17:36:55 +0300
categories: projects
comments: true

---

For a little while I've been working on a first real (at least for me) project - an implementation of [Conway's Game of Life][GOL_WIKI] in Javascript. It was one of the exercises in excellent book [Eloquent Javascript][EJ] and first one that actually made me really interested in programming process itself.
For couple of days I wasn't eating and sleeping and just programming this thing and thinking about it. And when it was actually done - that was really amazing. I haven't felt myself like this since childhood. Good start of the year! So, the source for the game [can be found on my Github][GOL_GIT], and you can play it right below! The usage is very basic, but I'm sure that I will continue to contribute to the project to make it more user-friendly and nice.

Click on Randomize button, then Start, relax and watch magic.  

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

There is a lot written about this particular game - start from [wikipedia][GOL_WIKI] and move on.
I suggest you try a few patterns (refresh page, click on canvas to change color, then start):

DieHard:

![DieHard]({{ site.url }}/assets/IMG/Game_of_Life/Game Of Life! - DieHard.png)

Pentadecathlon:

![Pentadecathlon]({{ site.url }}/assets/IMG/Game_of_Life/Game Of Life! - Pentadecathlon.png)

Pulsar:

![Pulsar]({{ site.url }}/assets/IMG/Game_of_Life/Game Of Life! - pulsar.png)

Infinite:

![infinite]({{ site.url }}/assets/IMG/Game_of_Life/Game Of Life! - infinite.png)

Have fun!

[EJ]: http://eloquentjavascript.net/
[GOL_WIKI]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
[GOL_GIT]: https://github.com/IgorKonovalov/Little_projects/tree/master/Game_of_Life
