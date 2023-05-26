---
title: Setting up a reverse proxy server for fixed IP address on digital Ocean
date: "2023-05-26"
tags: ["Software", "Engineering", "Digital Ocean", "software-development", "security"]
draft: false
summary: A reverse proxy server can serve as an intermediary between your server and any other third party (for us, it's a GitHub enterprise server). When your server needs to make a request, it prompts the proxy server to initiate the request to the third party, and vice versa.
image: "/blog/static/images/fixedIP/Fixed IP address.jpg"
layout: PostLayout
canonicalUrl: reverse-proxy-server-fixed-ip-address-digital-ocean
authors: ["sydney"]
---

We are Axolo - Axolo is a seamless integration that helps engineering teams improve their code review process. The integration creates temporary Slack channels for each pull request, inviting the author and reviewers to the channel and notifying them of relevant events such as code comments and CI/CD status updates. This means you can easily manage your pull requests without any hassle.

Our stack used to be on Heroku before we migrated to digital ocean, read more on this article about our migration: https://axolo.co/blog/p/my-experience-migrating-our-backend-from-heroku-to-digital-ocean.

Less than a year into our journey with Digital Ocean, we are quite pleased with its performance. One notable improvement has been in build time, a drawback we initially observed. It has proven to be a smooth journey, and it seems likely we'll continue using the Digital Ocean app for some time.

## The Issue with Digital Ocean App's IP Address.

One significant caveat is that Digital Ocean Apps doesn't support a static IP address. Axolo communicates with enterprise servers, some of which necessitate IP address whitelisting. Regrettably, this isn't an out-of-the-box feature.

The stability, accessibility, and administrative convenience that a fixed IP address offers can be advantageous for overall security. For instance, if you use a MongoDB instance, restricting its access to a particular IP address can be safer than leaving it exposed to the internet.

Here are some alternative solutions we considered:

## Alternative 1: Transition from Digital Ocean App to a Digital Ocean Droplet

The shift from a DigitalOcean App to a Droplet was primarily unappealing due to the increased complexity and maintenance time. With a Droplet, I would have to handle server management, security, updates, and backups. I would also miss the automated features such as auto-scaling, built-in CI/CD pipelines, and automatic deployments that the App platform provides.

### Pros / Cons of switching to a Droplet from an app platform

| Topic             | Pros of Droplets                                                                                                                                                                      | Cons of Droplets                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Control**       | **Full Control**: With Droplets, you have complete control over the server. You're free to configure and optimize your setup exactly how you want.                                    | **Complexity**: Managing a Droplet requires a level of technical knowledge. You are responsible for server management, security, updates, and backups.                   |
| **Flexibility**   | **Flexibility**: Droplets can host any type of application or software, unlike the Apps Platform which has some restrictions.                                                         | **Time-Consuming**: The convenience of automatic platform updates in the Apps Platform will be lost. Maintaining and managing a Droplet will require time and resources. |
| **Cost**          | **Cost-Effective**: Depending on your usage, Droplets can be cheaper than using the Apps Platform. You pay for resources directly, instead of being billed for higher-level services. | **No Built-in CI/CD**: You'll lose out on the built-in CI/CD (Continuous Integration/Continuous Delivery) pipeline that the Apps Platform offers.                        |
| **Scalability**   | **Scalability**: Droplets can be manually scaled vertically (increasing resources on a single Droplet) or horizontally (adding more Droplets).                                        | **No Automatic Scaling**: While you can manually scale Droplets, they don't automatically scale based on demand like the Apps Platform.                                  |
| **Customization** | **Custom OS and Software**: Droplets allow you to choose your own operating system and software versions, and install whatever additional software you need.                          | **Manual Deployment**: Deployments must be done manually or through third-party services, as opposed to the Apps Platform which handles it automatically.                |

## Alternative 2: Set up a reverse proxy server

While Heroku readily provides proxy addons, Digital Ocean doesn't have an equally straightforward solution. See screenshot of the Heroku Addons:

<ImageContainer alt="Heroku Proxy Servers" src="/blog/static/images/fixedIP/Heroku Proxy Servers.jpg" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={1080} height={775} />

A reverse proxy server can serve as an intermediary between your server and any other third party (for us, it's a GitHub enterprise server). When your server needs to make a request, it prompts the proxy server to initiate the request to the third party, and vice versa.

| Pros of setting up a Proxy server                      | Cons of setting up a proxy server                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Anonymity and Security: Hide server's IP address       | Complexity: Setting up and managing a proxy server can be complex.                         |
| Load Balancing: Distribute requests across servers     | Performance Overhead: Proxy servers can introduce latency and slower response times.       |
| Caching: Improve response times with cached data       | Single Point of Failure: If the proxy server fails, it can disrupt communication.          |
| Content Filtering: Block unwanted or malicious content | Security Risks: Misconfigurations can pose security risks.                                 |
| Access Control: Enforce access policies                | Compatibility and Interoperability: Some applications may not be fully compatible.         |
| Easier to implement than a droplet                     | Resource Consumption: Proxy servers consume system resources.                              |
|                                                        | Trust and Privacy Concerns: Privacy and data handling may be a concern with third parties. |

While this might be a bit more costly it seemed like an easier and faster way to manage from our perspective.

So we decided to go and try this out. Below is how we went down this path.

### Self managed proxy server vs Third party

### Setting Up Your Own Reverse Proxy Server

Crafting a reverse proxy server from scratch involves a process where you're in control of the configuration and optimization, in tune with your requirements. For those looking to adopt this approach, here are a couple of useful resources that could guide your journey:

1.  [https://www.digitalocean.com/community/tutorial_collections/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache](https://www.digitalocean.com/community/tutorial_collections/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache)
2.  [https://caddyserver.com/](https://caddyserver.com/)

Caddy, in particular, is an open-source web server designed for enterprise use. It comes with automatic HTTPS and is written in Go. If an out-of-the-box solution becomes financially unviable, transitioning to Caddy could be a good alternative.

### Using a Third-Party Service

Opting for a third-party service allows you to quickly and efficiently implement a reverse proxy server. Among the available options, QuotaGuard.com stands out due to its simplicity and effectiveness. With just a few steps, you can set up a reverse proxy server and have a working URL. This service comes at a cost of $29 per month, offering a cost-effective solution to experiment and see if it aligns with our needs.

Screenshot of QuotaGuard Dashboard:

<ImageContainer alt="Screenshot dashboard quotaguard" src="/blog/static/images/fixedIP/Screenshot dashboard quotaguard.jpg" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={1631} height={880} />

### Why We Decided to Use a Third-Party Service

The decision to use a third-party service was driven by our intent to iterate swiftly and see results promptly. Creating our own proxy configuration could be time-consuming and divert valuable resources from other critical tasks. Furthermore, a third-party solution, despite its recurring cost, presents a simpler and faster management route, which aligns well with our immediate needs and operational efficiency.

### Implementing a Reverse Proxy Server in Your Code

Once you've chosen your reverse proxy server solution, the next step involves integrating it into your codebase. To ensure every request traverses through a fixed IP address (the reverse proxy server), a dedicated function can be created.

<ImageContainer alt="axios-with-proxy-agent" src="/blog/static/images/fixedIP/axios-with-proxy-agent.png" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={1430} height={1164} />

Although integrating this functionality required some fine-tuning and testing within our code, the overall process was quite straightforward. Here's an example of how we implemented this with an Octokit instance for querying a GitHub enterprise server:

<ImageContainer alt="octokit proxy calls" src="/blog/static/images/fixedIP/octokit proxy calls.png" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={1794} height={1478} />

## Wrapping Up

In this post, we've journeyed through the various strategies and tools we used to tackle the challenge of not having a fixed IP address on the Digital Ocean App. We've weighed the pros and cons of different solutions and ultimately settled on utilizing a third-party service, all while maintaining the integrity and security of our server.

As we continue to enhance our service at Axolo, we're curious to hear about your experiences and insights. Have you faced a similar situation in your projects? How did you approach it? What tools or strategies did you find effective?

Feel free to share your thoughts and experiences in the comments section below!
