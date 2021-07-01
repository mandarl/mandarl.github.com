---
layout: post
title: Download Youtube subscriptions on a schedule
date: '2012-09-07T23:37:00-05:00'
tags:
- tech
tumblr_url: https://mandarlimaye.tumblr.com/post/31101376983/download-youtube-subscriptions-on-a-schedule
---
![](https://64.media.tumblr.com/tumblr_m9wy14vW9l1rn6683.jpg)

My BSNL broadband plan gives me unlimited data between 2 AM and 8 AM. I thought this would be a great time to download all my YouTube subscriptions. I could watch the videos the next day without using my download quota!

I found a couple of great scripts to get the job done. I had to make a few changes to get them working on windows:

[![](https://64.media.tumblr.com/tumblr_ma0hn7MNnT1rn6683.jpg)](https://github.com/mandarl/download-youtube-subscriptions)

[![](https://64.media.tumblr.com/tumblr_ma0hnjVnK51rn6683.jpg)](https://github.com/mandarl/youtube-dl)

**Prerequisites:**

1. Cygwin or another shell for windows.
2. Python&nbsp;

Just run the subscriptions script like so:

> ./download-youtube-subscriptions.sh mandarlimaye

Put this command in a batch file and schedule it to run whenever you like.

