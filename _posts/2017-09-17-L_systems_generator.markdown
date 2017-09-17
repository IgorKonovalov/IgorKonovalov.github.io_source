---
layout: post
title:  "L Systems Generator"
date:   2017-09-17 12:35:55 +0300
categories: projects
comments: true
---

This is a [little project](https://igorkonovalov.github.io/assets/FULL/L-systems/index.html) I've made betveen switching from working in one company to another. Now I realise, that maybe I'm a bit obsessed with fractals. But anyway, I like what I've done. 

If you are lazy to read - [click on a link](https://igorkonovalov.github.io/assets/FULL/L-systems/index.html) and explore for yourself! 

So hurray, an L-System fractal generator. 
What is L-systen? according to [Wikipedia](https://en.wikipedia.org/wiki/L-system), L-system or Lindenmayer system is a parallel rewriting system and a type of formal grammar. An L-system consists of an alphabet of symbols that can be used to make strings, a collection of production rules that expand each symbol into some larger string of symbols, an initial "axiom" string from which to begin construction, and a mechanism for translating the generated strings into geometric structures. L-systems were introduced and developed in 1968 by Aristid Lindenmayer, a Hungarian theoretical biologist and botanist at the University of Utrecht. Lindenmayer used L-systems to describe the behaviour of plant cells and to model the growth processes of plant development. L-systems have also been used to model the morphology of a variety of organisms and can be used to generate self-similar fractals such as iterated function systems.

In normal words, for example if you have axiom 'F' and the rule is only one and it's F → F+F−F−F+F, on a first iteration you have 
{% highlight c%}
  F 
{% endhighlight %}
next it's 
{% highlight c%}
  F+F−F−F+F
{% endhighlight %}
and next (all F's now  F+F−F−F+F)
{% highlight c%}
  F+F−F−F+F + F+F−F−F+F − F+F−F−F+F − F+F−F−F+F + F+F−F−F+F
{% endhighlight %}

and if F is a line in the plane, '-' change direction 90 gegrees counter - clockwise, '+' 90 degrees clockwise
you'll have a simpliest fractal named Koch Line: 

![Koch Line](/assets/IMG/L-systems/100px-Square_koch_2.svg.png)

Really simple! 

The core of [code](https://github.com/IgorKonovalov/L-systems/blob/master/src/index.js) is a object LShape, which have a step method:

{% highlight javascript%}
Lshape.prototype.step = function() {
  const arrState = this.currentState.split('')
  const nextStepArr = arrState.map(el => {
    let res = el
    if (this.rules[el]) {
      return (res = this.rules[el])
    }
    return res
  })
  this.currentState = nextStepArr.join('')
}
{% endhighlight %}

Of course, there is a canvas dracing functions and so on, you can look at them at the [source code](https://github.com/IgorKonovalov/L-systems), the code is stupidly simple.
But you can have a lot of fun playing with this: 

There is a 40+ shapes to start with:
![gif1](/assets/IMG/L-systems/l-1.gif)

And, of course, all [kinds of customization](https://igorkonovalov.github.io/assets/FULL/L-systems/index.html) is awailable! Change axiom, rules, n of iterations, color, anything, and then save your work! 
![gif2](/assets/IMG/L-systems/l-2.gif)

[Have fun!](https://igorkonovalov.github.io/assets/FULL/L-systems/index.html)

Unfortinately, now the project is not optimized for mobile. PR's very very welcome! 
