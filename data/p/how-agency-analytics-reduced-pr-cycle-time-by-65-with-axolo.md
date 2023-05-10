---
title: How Agency Analytics reduced PR cycle time by 65% with Axolo
date: "2023-05-16"
tags: ["Customer-stories", "software-development", "productivity", "GitHub"]
draft: true
summary: "It's been an exciting experience. Currently, we have around 50 to 60 engineers from eight different teams using the application. GitHub's notification system for the code review process is subpar. When we discovered Axolo, it was a game-changer. It's also bolstered our trunk-based development approach. The visibility of code reviews in Slack makes them a top priority for everyone, preventing delays and enabling us to deploy changes to production swiftly. Overall, it's been a fantastic improvement"
image: "/blog/static/images/general/AA.jpg"
layout: PostLayout
canonicalUrl: how-agency-analytics-reduced-pr-cycle-time-by-65-percent
authors: ["sydney"]
---

<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row-reverse" }}>
  <ImageContainer
    alt="blake-acheson"
    src="/blog/static/images/agencyanalytics/blake-acheson.webp"
    classNameDiv="mx-10 lg:mx-20"
    classNameImage=""
    width={150}
    height={150}
    style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }}
  />
  <p style={{ flex: 1 }}>
    Blake Achelson is the CTO and cofounder of Agency Analytics. He's been using
    Axolo for a year. We sat down with him to discuss how Axolo has improved
    their code review process and reduced their pull request cycle time by 65%.
  </p>
</div>

You can find the video recording here or a summary of our conversation below the video.

<div className="flex flex-col content-center items-center self-center">
  <p className="my-0"></p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-g8KGsc8YMw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<br></br>
<br></br>

# How has been using Axolo so far?

It's been an exciting experience. Currently, we have around 50 to 60 engineers from eight different teams using the application. GitHub's notification system for the code review process is subpar. When we discovered Axolo, it was a game-changer.

I'm not sure who initially suggested using Slack, but once we adopted your app, it significantly improved our operations. The bidirectional communication between GitHub and Slack has transformed our code review process. It's also bolstered our trunk-based development approach. The visibility of code reviews in Slack makes them a top priority for everyone, preventing delays and enabling us to deploy changes to production swiftly. Overall, it's been a fantastic improvement

<br></br>

# What is Agency Analytics ?

<ImageContainer alt="AgencyAnalytics" src="/blog/static/images/agencyanalytics/AgencyAnalytics.webp" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={1200} height={794} />

We're a platform for marketing agencies and consultants. So essentially we help marketing agencies scale their automated reporting for their customers. That's what we do now, but we are we are hopping on this like AI train, which I guess everyone is at this point, leveraging LLMs. We're just like a scalable reporting platform for marketing agencies.

I'm the CTO and cofounder of Agency Analytics, our team is 50/60 developers using Axolo. We all work remotely.

## Team Structure and Roles in Our Engineering Squads

<ImageContainer alt="AgencyAnalytics-team-2022-Q2-meetup" src="/blog/static/images/agencyanalytics/AgencyAnalytics-team-2022-Q2-meetup.webp" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={1344} height={952} /> 
Our engineering teams are structured in the style of Spotify squads, with various roles such as project managers, designers, technical leads, backend and frontend developers. Depending on the team's responsibilities, the number of each role can vary.

## Our Trunk-Based Development Approach

<ImageContainer alt="trunk base development approach" src="/blog/static/images/agencyanalytics/trunk base development approach.png" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={904} height={575} />

When a ticket is assigned to a developer, they create a branch and begin working on the feature. We follow a trunk-based development approach, aiming to divide our tasks into small, manageable pieces. Each pull request (PR) is kept as small as possible to limit potential issues if it reaches production. We recognize that production issues are inevitable, but we try to minimize the impact.

## Our Code Review Process

After the PR is created, we use a co-owners file to assign reviewers. Sometimes manual selection of reviewers is necessary depending on the project. Our policy is to require three approvals. Once a PR receives three check marks, any senior developer in the company can merge it to the master branch. During this process, there's ongoing communication through Axolo on Slack.

## Deployment Process: From Merging to Master to Building Replica Environments

After merging to master, our automated systems kick in to build all the containers, run all the tests, and deploy to production. When creating a pull request, we also build a replica of our production environment for each PR, effectively creating individual staging environments. This gives us an extra layer of verification before deploying to production."

<br></br>
<br></br>
<br></br>

# What's the problem you identified, before using Axolo?

The main issue was the inefficient code review process in GitHub. It was quite burdensome and their notification system was far from intuitive. Given the high volume of activity, it was challenging to manage without a user-friendly Slack integration.

## Did that result into, slow pickup time, pull request review time and PR cycle time overall?

Absolutely. Our main challenge was transitioning towards a trunk-based development method, where we consistently push updates to production multiple times a day. The primary obstacle to this was our code review process. Further complicating this, even if GitHub provided a seamless code review process, we operate most of our communications through Slack, which is integral to our entire company's workflow. Anything that isn't channeled through Slack doesn't integrate well into our daily operations. So, your close integration with Slack was a significant advantage for us.

## You've been using Axolo for a year. What has been the impact on your pull request cycle time?

Essentially, our overall pull request cycle time has been reduced by approximately 65%. While we've made a few minor modifications to the process, nothing else has had as substantial an impact on reducing the cycle time as the use of Axolo.

<br></br>

# How was the transition to using Axolo?

At the beginning, we tested Axolo with just one of my teams. As they grew comfortable with it, it became clear that there was no going back - it was simply a superior way to work. Gradually, we introduced it to the rest of the company. Although some developers were initially hesitant due to the change, they soon realized how much more productive it made them. Those who had used it quickly began advocating for it, asserting that it saved a lot of time and was a significant improvement. After using it for a few days and overcoming the initial novelty, everyone agreed on its advantages, and we had no difficulty getting everyone on board.

## How has Axolo changed your code review process ?

<Callout title='Code reviews used to feel like a chore, but now, with the open communication facilitated by Slack and Axolo, we have created a more collaborative environment for each pull request.' subtitle=' In the past, certain issues might have made it into production without sufficient scrutiny. But now, the integration with Axolo has enhanced our communication.... This has improved our architectural skills and enabled us to be more discerning before deploying to production"'/>

<br></br>
<br></br>

Now, every pull request creates a Slack channel. The conversations in these channels are different from our previous practices. Code reviews used to feel like a chore, but now, with the open communication facilitated by Slack and Axolo, we have created a more collaborative environment for each pull request. In the past, certain issues might have made it into production without sufficient scrutiny. But now, the integration with Axolo has enhanced our communication, allowing for more thorough discussions about the changes proposed in each pull request. This has improved our architectural skills and enabled us to be more discerning before deploying to production, leading us to a more thoughtful and communicative approach.

<br></br>
<br></br>

<CTABanner type="try" />
