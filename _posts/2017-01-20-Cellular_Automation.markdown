---
layout: post
title:  "Elementary Cellular Automaton"
date:   2017-01-20 19:36:55 +0300
categories: projects
comments: true
---
While working on [Game Of Life][GOL_POST] - I've became interested in Cellular Automation, and found another interesting example to do - Elementary cellular automaton. According to [Wikipedia][ECA_WIKI], "... an elementary cellular automaton is a one-dimensional cellular automaton where there are two possible states (labeled 0 and 1) and the rule to determine the state of a cell in the next generation depends only on the current state of the cell and its two immediate neighbors." It was  Super simple, right? But it was well challenging for me as for a novice programmer, and also lead to some new knowledge and understanding of what's going on. It's 255 different rules instead of three in Game Of Life, but they do not implement simultaniously, one rule per one automata. There is a big list of all the rules can be found [here][W_RULES]. The most interesting ones I used in my project. Also, this automata is kind of boring and I added some colour fun. So, take a look!

Source code, as always on my github: [SOURCE][SOURCE]


<style>
  button {
    float: right;
    margin-left: 3px;
    font-size: 14px;
  }
  canvas {
    margin-bottom: 10px;
  }
  select {
    min-width: 120px;
  }
  .wrapper {
    width: 740px;
  }
  #selectFirstRow {
    margin-right: 5px;
  }
</style>


<script src="{{ site.url }}/assets/JS/Cellular_automation/rules.js"></script>

<canvas id="automata" width="740px" height="600px" style="background-color: black"></canvas>
  Select rule:
  <select id="selectRule">
  </select>
  Select first row:
  <select id="selectFirstRow">
  </select>
  <button id="clear">Clear</button>
  <button id="startPause" class="button-primary">Start</button>
  <br />
  <br />
  Select cell color:
  <input type="color" id="cellColor" value="#ffffff">
  Select canvas color:
  <input type="color" id="canvasColor">
  Psychedelic mode:
  <input type="checkbox" id="psychedelic" value="on">ON<Br>

<script src="{{ site.url }}/assets/JS/Cellular_automation/index.js"></script>


[SOURCE]: https://github.com/IgorKonovalov/Little_projects/tree/master/Cellular_Automata
[GOL_POST]: https://igorkonovalov.github.io/projects/2017/01/04/Game_of_life.html
[ECA_WIKI]: https://en.wikipedia.org/wiki/Elementary_cellular_automaton
[W_RULES]: http://atlas.wolfram.com/01/01/
