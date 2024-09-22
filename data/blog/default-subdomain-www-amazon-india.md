---
title: Default subdomain www and Amazon India
tags: [new, shortcuts, url]
date: 2023-11-07
draft: false
summary: Default subdomain behaviour is different on Amazon India and Amazon US.
images: ['/static/images/default-subdomain-www-amazon-india-1698600898509.jpeg']
canonicalUrl: https://vinayakg.dev/default-subdomain-www-amazon-india
---

Sharing an observation that I had a few days back on Amazon India website. 
When I type [amazon.in](http://amazon.in/) on MS edge in private mode - it refuses to connect. See screenshot for [amazon.in](http://amazon.in/) 
But when I type [amazon.com](http://amazon.com/), it redirects (http 301) to [www.amazon.com](http://www.amazon.com/). 

Have 2 questions from this
\- Why would amazon not have a redirect for .in but has for .com?
\- Why amazon still uses www? I am others might also have it.

Looking for answers to these 2 questions. If anyone knows, please do share in comments

(FYI: HSTS is configured by amazon, browser automatically tries for https by default, so please don't mention that)





![default-subdomain-www-amazon-india-1698600898543](../static/images/default-subdomain-www-amazon-india-1698600898543.jpeg)

![default-subdomain-www-amazon-india-1698600898509](../static/images/default-subdomain-www-amazon-india-1698600898509.jpeg)
