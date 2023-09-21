---
title: Understanding ALB rules and options
tags: [aws, automation, cli, engineering]
date: 2020-05-24
draft: false
summary:
canonicalUrl: https://vinayakg.dev/understanding-alb-rules-cli
---

Today, I had to look at one of the issues on AWS [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application) which is used by one of the Organizations where I voluntarily consult. The issue was the ALB rules priority was changed and hence some of the redirections were not working. Basically the generic rule for the domain was at the top which takes precedence since its ordered rank wise. Here we had to set more specific rules at the top to evaluate first and then fallback to more generic one if there is no matching condition. Now the question is how do you prevent such issues and if you cannot prevent such issues, how do you recover as fast as possible.

Also, this topic is about ALB and not ELB (classic load balancer).

If your entire infra is setup using [IAC](https://en.wikipedia.org/wiki/Infrastructure_as_Code) and in an [immutable](https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure/) way, then it should be easy to restore/setup the original configuration and you are up and running. But if you infra is not immutable, then you need to make changes to existing infra and we will try and discuss our options.

### Primer

From what I have seen amongst many implementations, most of the orgs have become extremely reliant on ALB rules (and rightly so) and use them quite heavily for managing the workflow of the entire application. You can use it do various action like **Redirect**, **Forward**, **Return response** or even **authenticate** your request. It is essentially a rule engine that can evaluate various conditions (including regex) like **domain/subdomain**, **request path**, **HTTP method**, **query string** or even a **source IP** match and lets you choose the action for that rule (described above). In fact these rules also give you visibility on your application behaviour and tracability as well, a much better approach than having redirection or routing logic deep in your application code/database.

#### Basic Web Setup on ALB

If you are keen to learn about the ALB setup for web, here it is. We configure 2 listeners, one for port 80 (for http) and other for port 443 (for https). We configure only one rule under port 80 listener, that is to permanently redirect (302) to port 443. And configure all rules on 443, since we want to serve all web traffic on [https](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-limits.html) (secure transport). Because why not, SSL certificates are [free on AWS](https://aws.amazon.com/certificate-manager/pricing/) and you can use letsencrypt as well to create free SSL/TLS certificates. The below diagram depicts the setup.

![Load Balancer](../static/images/image-20200524134428844.png)

### Managing ALB Rules

Even for smaller orgs, ALB rules can be in multiples of 10 and managing them manually via some csv or text file is a challenging and an erroneous process. ALB supports 100 rules per load balancer only. You can learn more about the limits [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-limits.html).

#### Backup the Rules

I was trying to see if there is an option to backup the rules on AWS console, I did not find any. Then I recalled myself using [aws cli](https://aws.amazon.com/cli/) to play around with instances. So I gave a shot at using the aws cli and found you can export the entire rules configuration using the command line. If you dont have `aws cli`, kindly install from [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

For us to understand how to query using the `aws cli`, its important to understand the hierarchy and the relation between Load balancer, listeners and rules.

![ALB design](../static/images/image-20200524143629598.png)

you can see above, one ALB can have multiple listeners and each listener can have one or many rules.

With this information, lets explore the aws API to first backup our rules.

First we need the ALB information. Lets use the below command to get that. We are not supplying any region since that is set in the config when you set the `aws cli` using `aws configure`.

```bash
aws elbv2 describe-load-balancers
```

From the output, note the `LoadBalancerArn` for the one you want to back up the rules. You can have max 50 load balancers per region.

Next, we need to find the listeners for the above Load Balancer.

```bash
aws elbv2 describe-listeners --load-balancer-arn [LoadBalancerArn]
```

From the output, lets pick the `ListenerArn` that we need. And run the below command to get all the rules for the listener

```bash
aws elbv2 describe-rules --listener-arn [ListenerArn]
```

This will give us a blob of json consisting of array of rules. Each rule like I mentioned in [Primer](#primer) is a rule made of conditions and actions with priority. We can ignore the RuleArn (autogenerated by AWS).

Json output looks like this and is easily readable

![ALB Rules](../static/images/image-20200524150651729.png)

#### Export Rules

There is no bulk export option that I was able to find, you can create only one rule at a time. But it is easily possible to create a shell script to create rules using the above json output with jq.

Loop through the json output and you get an array of rules. For each rule, extract the condition into a temp json file, action into a one more json file and priority into a variable and create a command as below

```bash
aws elbv2 create-rule \
    --listener-arn [ListenerArn] \
    --priority 10 \
    --conditions file://conditions-host.json \
    --actions file://actions-fixed-response.json
```

### Closing thoughts

Its best to have IAC with immutable infra in place, so you dont allow edits and you always create new and abandon old ones, once you are done.

For a lot of teams, IAC may not be possible for various reasons. But the teams can slowly work towards that with minor steps.

And always important to have backup of your entire infrastructure/config, et al. which you can use to automate/semi automate or even do manually so you can always go back to a previous known good state.

Hope this blog helps few folks.

If there are any gaps, do let me know.

### References

https://docs.aws.amazon.com/cli/latest/reference/elbv2/describe-rules.html

https://docs.aws.amazon.com/cli/latest/reference/elbv2/create-rule.html

https://docs.aws.amazon.com/elasticloadbalancing/latest/application/tutorial-application-load-balancer-cli.html
