---
layout: post
title: 'command line graphing: gnuplot'
date: '2013-01-22T01:23:37-06:00'
tags: []
tumblr_url: https://mandarlimaye.tumblr.com/post/41179256008/command-line-graphing-gnuplot
---
![](https://64.media.tumblr.com/cca31e1a4430db99a48f488a70077d8a/tumblr_inline_mh0jkxILV41rn6683.jpg)

**Who needs charts on the command line?**

If you have ever been stuck at an ssh prompt staring a bunch of data gnuplot is a must have tool. I was looking at response times over an ssh&nbsp;prompt&nbsp;and&nbsp;realized how I missed MS Excel. All this data would make much more sense as a chart!&nbsp;Apparently there are others who would agree with me and that’s the reason gnuplot exists.

**Enter gnuplot**

[gnuplot](http://en.wikipedia.org/wiki/Gnuplot) is a command line tool that generates complex plots from data. It has a lot of options and can generate the plots as PNG, SVG etc. But most importantly it can plot your data as an ASCII chart :).

**Bonus points**

I use gnuplot to check my nodejs logs:

> tail –lines=1000 ~/.forever/\*.log | grep ‘Time: ’ | sed ’s/.\* Time: l: //’ \> data  
> gnuplot\> set terminal dumb  
> gnuplot\> plot “data”

This is a static plot but you can even plot animated graphs like [this](http://filipivianna.blogspot.in/2011/11/more-trickery-with-gnuplot-dumb.html):&nbsp;

![Animated memory usage](http://1.bp.blogspot.com/-6m29LnS1AR0/Ts0tJUar0EI/AAAAAAAAAwo/9lGnM2wA8sk/s1600/screenshot.gif)

