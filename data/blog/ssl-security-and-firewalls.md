---
title: SSL Security and Firewalls
tags: [tech, ssl, firewall, troubleshooting, debug]
date: 2020-12-27
draft: false
summary:
images: ['/static/images/ssl-cert-rating-A.png']
canonicalUrl: https://vinayakg.dev/ssl-security-and-firewalls
---

This one is going to be really small, at least I intend to as I start to write this :). We were struggling to get one of the feature rolled that was offered by one of the big India banks, the options were limited since the corporate account was linked :(. I leave the name blank to be guessed, no clues this time 😄

## Background

We had integrated one of the features in the system to transfer money realtime (this is for enterprises). It was tested in lower environment, signed off by stake holders and was planned for deployment to production.

It was deployed on the decided day and we then started rowing the boat 🚣 to make it functional.

Below is the account of the some of the things that we had to do.

## How it started

When you are working with any bank (partner) there are a lots of process & approvals that one needs to follow to get to implementation stage. Have crossed all those earlier stages, we had our implementation signed off by the partner too. Before making it available for customers, we wanted to do some pseudo/sanity tests to make sure it works for all customers by doing some live transactions. Our sanity tests failed❗It was not clear why it failed. Developers assumed it was a environmental or deployment issue and started looking further.

## Debug 🐛

Once it failed, developer started adding specific [logs](https://www.xplg.com/application-logs-what-how) to understand the problem in detail. Post adding logs, we tested this ourselves using [curl](https://curl.se/) & [postman](https://www.postman.com/downloads/) and made sure it works, a kind of sanity test and also confirmed that the original functionality was intact and the new logging code has not introduced any regression. Remember, its always to important to test for regression and the intended functionality, no matter how big or small the change. We then waited for our partner (yes it takes time sometimes, you need to be persistent in your follow-up 😄) to trigger the actual transaction to see if it worked. The partner triggered the request, but we did not receive the request.

We were wondering where it was lost, luckily we had [ALB logs](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html) enabled for our implementation and we could quickly conclude that we had not received any request and were waiting to debug with the team.

In the interim, we got a message from the partner that they were received "error connection refused" message whenever a request was sent to our server.

### Troubleshoot Connection

Finally we got together (partner and our team) and we started troubleshooting together. We first ruled out the port was open to them by using the following command.

    telnet abc.com 443

You will get connected to if the connection is successful and the output appears as below.
`Connected to abc.com. Escape character is '^]'.`

If you don't have [telnet](https://en.wikipedia.org/wiki/Telnet), you may do using the bash builtin's /dev/tcp pseudo device. Reference link is [here](https://twitter.com/shuveb/status/1270780153430306816?s=21). Follow @shuveb if you would like to learn more on linux.

`echo > /dev/tcp/abc.com/443 echo $?`
The output would be 0, if the connection was successful.

### Troubleshoot SSL

Once this was established, we were wondering why we were still seeing "connection refused". Luckily wisdom dawned on one of the guys in the group that it could be a problem with the SSL connection.

The certificate had no challenges as other partners were using it and the certificate was rated A+ on [ssllabs](https://www.ssllabs.com/ssltest/).

![ssl-cert-rating-A.png](../static/images/ssl-cert-rating-A.png)

And the chain of certificates did not show any problem either.
![ssl-chain-digicert.png](../static/images/ssl-chain-digicert.png)
Then the next thing left was the ciphers supported.
This can be found with the help of following command

    nmap --script ssl-enum-ciphers -p 443 abc.com

[Nmap](https://nmap.org/) is an utility for network discovery and security auditing.
You will get output as below

```
PORT    STATE SERVICE
443/tcp open  https
| ssl-enum-ciphers:
|   TLSv1.2:
|     ciphers:
|       TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 (secp256r1) - A
|       TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 (secp256r1) - A
|       TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA (secp256r1) - A
|       TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (secp256r1) - A
|       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 (secp256r1) - A
|       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA (secp256r1) - A
```

You can also use online tools like [digicert](https://ssltools.digicert.com/checker/views/checkInstallation.jsp) to get useful information like vulnerabilities, certificate chain, details and cipher all in one place.

### Actual Problem

The partner had a firewall device that only allowed certain ciphers to be used for outgoing SSL connections. [Sonicwall](https://www.sonicwall.com/support/knowledge-base/how-to-allow-or-block-tls-and-ssh-ciphers-using-the-cipher-control-feature/200501095717220/) and [Barracuda](https://campus.barracuda.com/product/cloudgenfirewall/doc/79463049/ssl-inspection-in-the-firewall/), et al. allow that with easy to use UI. We had not encountered any error on UAT since that environment had different security policy and was configured much earlier. We operate production and non-production infrastructure on different AWS accounts. We have configured a [squid proxy](http://www.squid-cache.org/) earlier which controls the outgoing connection domains. This was something on top of the outgoing connections, you necessarily want to allow known good(configured) [ciphers](https://en.wikipedia.org/wiki/Cipher#).

We were given the list of ciphers that were configured on the firewall on the partner side. Once we got the list, it was matter of figuring the right list and configuring on ALB.

## SOLUTION

In order to support the list of ciphers on the SSL certificate, you can configure this on the Operating Systems ([windows](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-hardening_tls_configuration) & [linux](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-hardening_tls_configuration)), this means that [SSL termination](https://en.wikipedia.org/wiki/TLS_termination_proxy) happens on webservers. In a distributed systems architecture and if you are hosted on AWS, you terminate SSL on [ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) and forward only http request.

On ALB, you need to edit the listener on 443 and choose the security policy. Refer screenshot below. You may configure your own security policy as well here. I wont recommend that since AWS has curated a list of policies for cloud users and there is a good documentation [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html) on the same.

Referring the above link we were able to find the appropriate cipher recommended corresponding to the predefined [policies](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies), and the problem was solved finally.

![SSL-edit-policy.png](../static/images/SSL-edit-policy.png)

## Learnings 📖

- Focused problem solving with ownership can help solve problems that appear impossible
- Be persistent and be curious till the problem is solved
- Problems that appear bigger require simple solutions most of the time, takes time though

## References 📚

https://superuser.com/questions/109213/how-do-i-list-the-ssl-tls-cipher-suites-a-particular-website-offers

https://aws.amazon.com/certificate-manager/
