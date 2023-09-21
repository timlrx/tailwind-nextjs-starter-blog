---
title: Tricks  Tips - Production Deployment
tags: [tech, maintenance, haproxy, alb, hacks]
date: 2020-12-20
draft: false
summary:
canonicalUrl: https://vinayakg.dev/tricks-tips-production-deployment
---

This blog started as a small trick that I learnt over the last product release and I felt I should summarize all the learnings related to this topic over the years and share with one and all. In this blog I will cover the various ways of deploying maintenance page and other tricks that one could leverage during production deployment.

## Background

In today's internet age everyone expects the product/services on the internet to be available 365 days, 24x7 (round the clock). No one expects a down time on any website and if it's intermittently available conistently for some period, you risk losing users and could potentially run you out of business.

If you want your users to have a better experience where there is no downtime, you would make sure to maintain your services up and running all the time. We will not get into high availability deployments here but instead focus on deployments that require downtime and how to manage/test that you while your team is busy rolling out new upgrades/features.

As much as possible we try and use [rolling deployment](https://opensource.com/article/17/5/colorful-deployments) strategy for our deployments. You may read about other deployment strategies [here](https://thenewstack.io/deployment-strategies/).

## Introduction

First, I will try and talk about deploying site maintenance cleanly (remember, we need downtime for this upgrade) on various platforms/frameworks/webservers. Then, we will see how to use a form of a/b test to test the product thoroughly to make sure the product works well for all users.

## Problem Statement

Why does a site need maintenance? What is it that needs downtime?

Few reasons that I feel warrant a downtime

- The product not tested well in the lower environments - lack of production like environment for testing
- The product cannot be tested well in the lower environment - we will get to those reasons
- A big update that requires massive changes to the database schema
- Deployment runbook is missing or is incomplete
- Deployment runbook is ready and rehearsed on a new environment (production like) but the team is not sure if it will work completely, may be the team tested only a few use cases.
- Team uses Recreate deployment strategy
- Application has a an unstable environment/codebase, et al.

In our case, the reasons were three fold.

- Financial products cannot be thoroughly tested in lower environments due to the variation in data for each user which can't be simulated easily or guessed. Use of live data on lower environments, can impact an individuals' financial standing/borowwing ability
- This deployment needed some heavy database changes
- Our runbook was rehearsed but the testing on the new environment was not extensive, again goes back to point 1

## How do we Solve❓

We were able to mitigate the risk posed by database changes by replaying that multiple times on various environments by augmenting it with rollback scripts as well.

I picked this up at Morgan Stanley, where every database change request has to be supported by Upgrade and Rollback script.

You essentially split [DDL and DML](https://www.w3schools.in/mysql/ddl-dml-dcl/) and accordingly create upgrade and rollback script. So you get 4 files, DDL - 2 files, DML - 2 files, one for upgrade and one for rollback. This kind of structure also makes it very easy to review database changes and validate them early in the cycle.

We still needed downtime on the system for above reasons. So we were looking at solutions.

If one has to implement a maintenance page you need to send HTTP status code as **503** along with some text on the html indicating the website/service is under maintenance. If you would like to know why we need to send 503, please give [this](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4) RFC a read.

### Solutions

If the application runs off **apache**, you need to modify the config on each web server, dont think this is automated by most unless organization expects to do frequent maintenance. Installation details are [here](https://cwiki.apache.org/confluence/display/HTTPD/MaintenancePage).

If you need to host maintenance page on **nginx**, the process is very similar again. Installation details are [here](https://blog.devcloud.hosting/configuring-nginx-for-quickly-switching-to-maintenance-mode-e4136cf497f3).

ASP .NET makes setting maintenance page very easy and have used this multiple times in the past. You just drop a html file named [app_offline.htm](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/app-offline?view=aspnetcore-5.0) and you are good. It renders the maintenance page with the correct status code (see below).

![503-maintenance-net-requ.png](../static/images/503-maintenance-net-requ.png)

If you are on [haproxy](http://www.haproxy.org/), then you just need to do this at one place and that's all you need to do. Steps are [here](https://gist.github.com/sts/62d8dd59221ab68661aa). Haproxy has a default maintenance page, you may customize if you want to.

```shell
backend web_maintenence
    mode http
    errorfile  503 /etc/haproxy/errors/maintenance.http
```

#### Solution on ALB

Today, most of us are on cloud, and if you are on [ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html), there is a new feature which I discovered recently. You can serve the entire maintenance html off the ALB. That's really neat. All you need to do it is copy paste the HTML in the block as seen below on ALB settings.

![alb-html-maintenance.png](../static/images/alb-html-maintenance.png)

We exactly did that but the challenge was ALB does not allow more than 1024 characters. i.e. 1 KB. We got a message like this "**Exceeded 1024 maximum character length**. The maintenance page we had was more than 1 KB, so I looked at it and splitted the js and css to individual files, and Voila we were ready to go.

The sample gist is [here](https://gist.github.com/vinayakg/8368d40a7a8abeddee2c54fad35b8871) folks interested.

We were able to immediately put the entire application in maintenance at the click of a button and some html juggling.

### A/B Tests before roll out

Yes, I am using the word A/B test before rollout since the entire team wanted to be able to test and do it seamlessly and the real customers would only see the maintenance page. And we are still working remotely, so it had to also work for multiple users from various locations.

On haproxy, its quite straight forward. You just need to add acl configuration to haproxy.cfg. See below for the sample. It also supports CIDR notation.

```shell
frontend www
  bind *:80
  mode tcp
  acl network_allowed src 10.10.10.13 20.20.21.22
  tcp-request connection reject if !network_allowed
  use_backend my_backend_server
```

Since we are on ALB, lets look at that.

We started with IP addresses initially on ALB and routed that to a custom [Target Group](https://gist.github.com/vinayakg/8368d40a7a8abeddee2c54fad35b8871) on ALB. That clearly did not scale as none of us have static IP addresses and with internet fluctuating in most parts of India, folks were toggling between mobile hotspots and wi-fi.

It then dawned on me to use the VPN that we had setup for developers to access infrastructure on a need basis. This really solved the problem. Connection to VPN gives a public static ip amongst other privacy benefits. You may read about more benefits offered when using VPN [here](https://www.lifehacker.com.au/2018/06/why-you-need-a-vpn-and-how-to-choose-one/) and [here](https://arstechnica.com/information-technology/2011/11/op-ed-live-vpn-why-vpns-are-a-must-have-for-todays-workforce/).

So, we finally ended up with a setting like this in our ALB and we were set to test this internally.

![alb-ab-tests](../static/images/alb-ab-tests.png)

Once we were done with the testing, we removed this rule from the top of the list (yes order of rules is very important) from our ALB config and the new product was released.

## Learnings📖

Its important to apply first level principles no matter how big or small the problem is at hand.

Always look for simpler solutions, if you look for it you will defenitely find it.

Every problem requires solution basis the problem context and the background, finally put customers first. A bit of downtime is fine if thats going to ensure the release wont have any problems after the deployment.

## References 📚

https://opensource.com/article/17/5/colorful-deployments

https://blog.devcloud.hosting/configuring-nginx-for-quickly-switching-to-maintenance-mode-e4136cf497f3

https://thenewstack.io/deployment-strategies/
