---
title: Don't Let Your Data Slip Away - A Comprehensive Look at Data Leakage Online
tags: [dns, leak, internet, doh, dot, dnssec, security, cloudnative]
date: 2023-04-10
draft: false
summary: Protect yourself from online data leaks by taking precautions such as using strong passwords, avoiding suspicious emails and links, using VPNs, and regularly checking privacy settings on social media platforms
canonicalUrl: https://vinayakg.dev/dont-let-your-data-slip-away-comprehensive-look-data-leakage-online
---

## Background

I have been using pihole VPN for the last year or more and have been happy with the ad-free and faster browsing experience.

I use https for all websites (set browsers to use https only) to ensure no one can eavesdrop the data going to websites/api.

However, I have been wondering how the entire network stack works in the context of security and privacy. I had questions like - How the domain requests get sent from the device to the router and then how router takes it forward/sends to ISP? Who can read that data? How the response is sent back, can someone tamper that response? Which is the safest technology to use for DNS so you dont have to worry about any tampering/snooping/mitm and send wrong response and trick us into a scam?

I will try and breakdown and answer all these questions below. Also I will be discussing DoH(application layer) only and not DoT(transport layer) as DoH works over port 443 which is default open unlike 853 used by DoT which could be blocked.

## How our networks resolve domain names (DNS) 🌐

In any network (home/office) you take an internet connection from an ISP and you hook that to a router. All ISP's provide their own default DNS settings for all network connections. Please see sample below.

For any DNS (Domain name resolution), port 53 is used and the DNS query is sent in plain text to the Name Servers of ISP - making it easy for your provider to read.

There are ways to make this secure using DoH(DNS over HTTPS) and DoT(DNS over TLS) end to end, we will see that later below

![dns-settings-provider](../static/images/dns-settings-provider.png)

If you would like to know the life of a DNS query - look at [this zine.](https://wizardzines.com/comics/life-of-a-dns-query/)

## How is DoH(DNS over HTTPS) protecting privacy 🔒

Let us try and understand how DoH is secure and how it protects the privacy.

DNS over HTTPS (DoH) is a protocol for performing DNS resolution via the HTTPS protocol, which is the same protocol used to access websites securely. DoH is designed to improve privacy and security by encrypting DNS traffic, preventing eavesdropping, and thwarting man-in-the-middle attacks.

Traditionally, DNS requests are sent in plain text, which means that anyone who can intercept the traffic can see what domain names are being accessed. This can be a significant privacy risk, as it allows ISPs and other third parties to track a user's online activities and build a profile of their browsing habits.

DoH encrypts DNS traffic between the user's device(router/phone) and the DNS resolver, making it much more difficult for third parties to intercept or eavesdrop on the traffic.

Also - though the request is encrypted using DoH, the ISP can still the DNS resolver, but ISP cannot see the contents of the encrypted DNS network, so ISP cannot know which specific domain was requested.

Example

`curl https://dns.google.com/resolve\?name\=example.com\&type\=A HTTP/1.1| jq`

## How DNSSEC does it?

DNSSEC is a set of extensions to the DNS protocol that adds cryptographic security to DNS queries and responses. It uses digital signatures to ensure the authenticity and integrity of DNS data, allowing clients to verify that the information they receive from a DNS resolver is legitimate and has not been tampered with.

In a DNSSEC-secured environment, every zone in the DNS hierarchy is signed with a private key. This key is used to generate digital signatures for every DNS record in the zone, creating a chain of trust that can be verified by clients.

When a DNSSEC client sends a query for a domain name, it receives a digitally-signed response that includes a chain of digital signatures from the root zone to the queried zone. The client can then verify the authenticity of the response by validating the digital signatures and checking that the chain of trust is complete and unbroken.

DNSSEC provides several benefits over DoH, including:

1. Enhanced authenticity and integrity: DNSSEC provides strong cryptographic assurances that the DNS data has not been tampered with or modified in transit.
2. Prevents DNS spoofing: DNSSEC helps prevent DNS cache poisoning and other attacks by ensuring that clients only receive legitimate responses from DNS resolvers.
3. More granular control: DNSSEC allows for more granular control over access to DNS data, enabling zone owners to specify which clients are authorized to access their DNS data.

While DNSSEC is a powerful tool for securing the DNS, it does have some limitations. One of the biggest challenges of DNSSEC is that it requires significant administrative effort to set up and maintain. Additionally, DNSSEC can create significant overhead in terms of the size of DNS responses, which can impact network performance.

Example

`dig +dnssec example.com A @1.1.1.1`

In summary, while DNSSEC and DoH both address different aspects of DNS security, DNSSEC is generally considered to provide stronger cryptographic assurance of DNS data authenticity and integrity. However, DoH can provide privacy and security benefits that are complementary to DNSSEC.

## What does the ISP see when using VPN? 👀

When you use a VPN tunnel, your traffic is encrypted before it leaves your device and travels through the VPN server, making it much more difficult for anyone to intercept or read your data. Essentially, a VPN creates a secure, private tunnel between your device and the VPN server, which acts as a middleman between you and the internet.

Your ISP can still see that you are connected to a VPN, but they won't be able to see the details of your internet traffic, as it is encrypted. They will be able to see the IP address of the VPN server that you are connecting to, but they won't be able to see the websites you visit or the data you transmit.

It's important to note that not all VPNs are created equal, and some may leak your IP address or fail to properly encrypt your traffic, so it's important to choose a reputable VPN provider and ensure that your VPN connection is properly configured and secured.

However, it's worth noting that while a VPN can provide privacy and security for your internet traffic, it does not provide complete anonymity. Your online activity may still be tracked by the websites you visit or other third-party services, and your VPN provider may also log your activity. It's also possible for government agencies or law enforcement to request information from your VPN provider.

In summary, a VPN can provide an extra layer of security and privacy for your internet traffic, but it's important to choose a reputable provider and understand the limitations of VPN technology.

## DoH vs DNSSEC

|          Feature          |                               DNSSEC                                |                          DoH                           |
| :-----------------------: | :-----------------------------------------------------------------: | :----------------------------------------------------: |
|        Encryption         |                                 No                                  |                          Yes                           |
|         Integrity         |                                 Yes                                 |                          Yes                           |
|          Privacy          |                                 No                                  |                          Yes                           |
| DNS query size limitation |                             4,096 bytes                             |                      2,048 bytes                       |
| Certificate verification  |                                 No                                  |                          Yes                           |
|     Deployment status     |           Widely deployed, but not universally supported            |  Growing adoption, but not yet universally supported   |
| Implementation complexity |                              Moderate                               |                          High                          |
|   Impact on performance   |                             Negligible                              |           Can cause a small performance hit            |
|  Ease of implementation   | Requires DNSSEC support from DNS resolver and domain name registrar | Can be implemented in client software and DNS resolver |

## How can one use DoH 💻

Internet is needed by all services that are running on the device. It could be a browser that we use and interact with for web activity. Or it could be an app or service that we might be using for various tasks as part of our device usage.

There are 2 way to use DoH. One solution is browser based solution and works on Windows/Mac and Linux - here the network requests made by apps or services are not covered.

The other solution is a system wide solution that ensures all DNS requests are covered - which is a prefered solution

### Browser only solution

Please find below steps for all systems

| Windows                                                                                              | MacOS                                                                                                | Android                                                                                                      |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Open your preferred web browser(e.g. Firefox, Chrome, Edge, etc.) and go to its settings             | Open your preferred web browser(e.g. Firefox, Chrome, Edge, etc.) and go to its settings             | Download and install a DoH-enabled web browser (e.g. Firefox, Chrome, Edge, etc.) from the Google Play Store |
| Look for the "Network Settings" or "Proxy Settings" option                                           | Look for the "Advanced" settings or "Privacy and Security" option                                    | Open the web browser and go to its settings                                                                  |
| Scroll down and look for the "DNS over HTTPS" or "Secure DNS" option                                 | Scroll down and look for the "Enable DNS over HTTPS" or "Use Secure DNS" option                      | Scroll down and look for the "DNS over HTTPS" or "Secure DNS" option                                         |
| Turn on the toggle switch to enable DoH                                                              | Turn on the toggle switch to enable DoH                                                              | Turn on the toggle switch to enable DoH                                                                      |
| Select the preferred DoH server (e.g. Cloudflare, Google, etc.) or enter a custom DoH server address | Select the preferred DoH server (e.g. Cloudflare, Google, etc.) or enter a custom DoH server address | Select the preferred DoH server (e.g. Cloudflare, Google, etc.) or enter a custom DoH server address         |
| Save the settings and exit                                                                           | Save the settings and exit                                                                           | Save the settings and exit                                                                                   |

There is no browser based solution for iOS

### System wide solution

You may download Cloudflare DoH client for all systems from this [link](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/download-warp/).

Alternatively, you may follow the below steps for all systems.

| Windows                                                                                                                                       | MacOS                                                        | Android                                          | iOS                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Go to the Control Panel and select "Network and Internet"                                                                                     | Go to "System Preferences" and select "Network"              | Go to "Settings" and select "Network & Internet" | Download profile from this [link](https://github.com/paulmillr/encrypted-dns/tree/master/profiles) and save it to Files |
| Click on "Network and Sharing Center"                                                                                                         | Select the network you are connected to and click "Advanced" | Select "Private DNS" and turn it on              | Click to open it                                                                                                        |
| Click on the name of the network you are connected to                                                                                         | Click on the "DNS" tab                                       | Enter the DoH resolver address you want to use   | Go to the "Settings" app on your iPhone or iPad                                                                         |
| Click on "Properties" then Select "Internet Protocol Version 4 (TCP/IPv4)" or "Internet Protocol Version 6 (TCP/IPv6)" and click "Properties" | Click the "+" button to add a DNS server                     |                                                  | Click on "Profile Downloaded"                                                                                           |
| Click "Advanced" and select the "DNS" tab                                                                                                     | Enter the DoH resolver address you want to use               |                                                  | It will prompt for Install                                                                                              |
| Click "Add" and enter the DoH resolver address you want to use                                                                                | Click "OK" to save your changes                              |                                                  | Then add passcode and approve to install                                                                                |
| Click "OK" to save your changes                                                                                                               |                                                              |                                                  |                                                                                                                         |

**Update on Mac OS solution**: Have observed that though the profile shows as active and enabled on settings in Mac OS, Edge/Chrome don't honour the profile set, so its important to set in the browser. Kindly refer section [System wide solution](#system-wide-solution)

![macos-profile-enabled](../static/images/macos-profile-settings.png)

## Preferred DoH setup 👍

I have a pihole with pivpn, so when I connect using vpn - it blocks websites. No seperate DoH is needed. If you would like to read about how to setup, please use [this link](https://vinayakg.dev/invest-in-your-digital-security-with-pihole-wiregaurd-vpn).

There are also cases some apps wont work detecting a vpn connection (e.g. Prime Video, Netflix, irctc, Myntra, et al). In such cases since VPN can't be used, no ads/malicious websites are blocked.

In order to leverage the same pihole blocking without using pivpn, I prefer to setup my own DoH and use it on all devices.

You may read about it in my next blog. Till then stay tuned.

## References

[What is DNS? How DNS works?](https://www.cloudflare.com/en-in/learning/dns/what-is-dns/)

[DNS over HTTPS vs DNS over TLS](https://www.cloudflare.com/en-in/learning/dns/dns-over-tls/)

[Firefox DNS over HTTPS](https://support.mozilla.org/en-US/kb/firefox-dns-over-https#w_configuring-dns-over-https-in-firefox)
