---
title: 'Setting Your Own DoH and Getting PiHole Protection Everywhere'
tags: [dns, doh, security, privacy, nginx, ssl, stream]
date: 2023-04-21
draft: false
summary:
canonicalUrl: /setting-your-own-doh-getting-pihole-protection-everywhere
---

## Problem Statement

While I have been using [pihole internet blocking with pivpn(wiregaurd)](https://vinayakg.dev/invest-in-your-digital-security-with-pihole-wiregaurd-vpn) for over a year, many a times I have experienced many sites/apps/services not working when connected to the vpn. They dont work because pihole blocked them, but because these websites detect usage of VPN and dont allow to browse the app or service at all.

I am not sure of intent behind this blocking - but your surely lose privacy, security and in my case also the ability to block trackers, et al.

You dont get the encryption offered by VPN and also privacy as your IP address will be sent with all requests. And the trackers can track you throughout as all your DNS queries are also sent to the ISP configured DNS in plain text.

Of course you may contact the website's support - but it may not work out.

Some of the most used services that dont work over VPN are listed below(in my usage)

[ChatGPT] - ChatGPT is an AI language model developed by OpenAI, based on the GPT (Generative Pre-trained Transformer) architecture, designed to generate human-like responses to natural language inputs. Do checkout [chatgpt](https://chat.openai.com), if you have not yet.

Apple software updates

[IRCTC](https://irctc.co.in) - India Railways's train tickets booking platform

Netflix

Amazon Prime Video

Myntra ... and so on

You need most of these services at one time or the other. How do we then access these apps/services without fully compromising the security and avoid getting tracked by ISPs?

## Solution Brief

I have found one solution which can provide some level of security and also prevent tracking.

That's basically a combination of DoH (DNS over HTTPS) with DoH resolving DNS queries from my pihole.

This essentially gives me the same level of blocking and some privacy as my ISP would never see any DNS queries except the DoH server.

Also most browsers default to https(Safari does not) and also most apps/services only serve HTTPS, your data sent to apps/services is not seen by anyone except the service.

However there could still be some HTTP requests used by certain apps/services and that is the risk. Excluding VPN, I dont have a solution for this at the moment.

With this solution(your own DoH backed by pihole blocking) - The end services/apps/websites would of course know my ip address (and location from it) - but thats the best we can get now.

I have written about the data flow/leakage in detail in this article titled [[Don't Let Your Data Slip Away: A Comprehensive Look at Data Leakage Online](https://vinayakg.dev/dont-let-your-data-slip-away-comprehensive-look-data-leakage-online)

Lets go through the solution in some detail and implement it as well.

## DoH using piHole

DNS-over-HTTPS (DoH) is a protocol that allows DNS requests to be encrypted using HTTPS, providing an additional layer of security and privacy. By setting up your own DoH server, you can ensure that your DNS queries are not intercepted or tampered with by third parties, such as your internet service provider (ISP) or government agencies.

PiHole is a popular open-source DNS-based ad blocker that can be used to block ads, trackers, and malware across your entire network. By combining your own DoH server with PiHole, you can enjoy an even higher level of protection and privacy.

In order to achieve this we need nginx and pihole setup on the same machine/network. You may refer these blogs for [instaling pihole with wiregaurd](https://vinayakg.dev/invest-in-your-digital-security-with-pihole-wiregaurd-vpn) and setting up [nginx with SSL certificates](https://vinayakg.dev/streamline-ssl-certificate-generation-effortlessly-using-certbot)

Since we are going to configure HTTPS for DNS, we need to convert HTTPS to DNS requests. We will do that using nginx per below steps.

### HTTPS to DNS

When you visit a website, your browser sends a request to a DNS server to resolve the domain name to an IP address. This request is sent in plain text, which means that it can be intercepted and read by anyone who has access to your network.

By using DoH, the DNS request is encrypted and sent over the HTTPS protocol, which makes it much more difficult for anyone to intercept or read the request. Additionally, using your own DoH server ensures that your DNS queries are not logged by your ISP or other third parties.

Nginx web server software includes a library called `nginx-module-njs`, which can be used to convert HTTPS packets to DNS requests. This allows us to route DNS traffic over HTTPS, providing additional security and privacy for DNS queries.

To configure Nginx for HTTPS to DNS, lets make sure we have the latest nginx and we are able to install `nginx-module-njs`. Default nginx will be `nginx/1.18`... and uses js_include is [deprecated](https://www.nginx.com/blog/using-nginx-as-dot-doh-gateway/#A-Simple-DoH-DNS-Gateway:~:text=The%20code%20in,and%20JavaScript%20files.%5D) and setting up https to dns on this might take you down the rabbit hole some blogs even suggesting Nginx Plus. Kindly refer the below steps only as previous methods and documents are outdated.

#### Install Latest Nginx

```bash
sudo apt install curl gnupg2 ca-certificates lsb-release debian-archive-keyring
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/debian `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
sudo apt update
sudo apt install nginx
sudo apt install nginx-module-njs
```

#### Setting up njs (library convert https to dns)

```bash
git clone https://github.com/TuxInvader/nginx-dns.git
sudo cp -r ~/nginx-dns/njs.d /etc/nginx/
```

### Configure Nginx for HTTPS to DNS

Now we are all set to configure the nginx server.

The way it works is as follows.

- We setup an endpoint to receive the https requests(port 445) for dns
- We have chosen `/dns-query` as our endpoint
- In `/dns-query` we use `proxy-pass` to handle those requests in `upstream dohloop`
- In `upstream dohloop`, the requests are streamed at port 8053
- In stream block, nginx listens the requests at 8053 and let dns block handle
- dns block sends all dns requests to configured dns server, in my case - the local pihole

![HTTPS-DNS.png](../static/images/HTTPS-DNS.png)

Here is the `nginx.conf` that you may use

<details>
  <summary>Nginx.conf</summary>

```nginx
user  nginx;
worker_processes  auto;
include "/etc/nginx/modules-enabled/*.conf";

load_module modules/ngx_stream_js_module.so;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}
include /etc/nginx/conf.d/stream.conf;

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;


    # logging directives
    log_format  doh   '$remote_addr - $remote_user [$time_local] "$request" '
                      '[ $msec, $request_time, $upstream_response_time $pipe ] '
                      '$status $body_bytes_sent "$http_x_forwarded_for" '
                      '$upstream_http_x_dns_question $upstream_http_x_dns_type '
                      '$upstream_http_x_dns_result '
                      '$upstream_http_x_dns_ttl $upstream_http_x_dns_answers '
                      '$upstream_cache_status';

    access_log  /var/log/nginx/access.log doh;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;

    # Proxy Cache storage - so we can cache the DoH response from the upstream
    proxy_cache_path /var/cache/nginx/doh_cache levels=1:2 keys_zone=doh_cache:10m;

    #DoH config
    upstream dohloop {
            zone dohloop 64k;
            server 127.0.0.1:8053;
    }

    include /etc/nginx/conf.d/http.conf;
    include /etc/nginx/conf.d/https.conf;
}
```

</details>

You may use the [port 80 gist](https://gist.githubusercontent.com/vinayakg/e138500d615425ac10422b850a679954/raw/81776acb7f07df6f782546cde394df2cd60315f8/port80-acme.conf) for `http.conf` and [port 443](https://gist.githubusercontent.com/vinayakg/e138500d615425ac10422b850a679954/raw/c6e35d627cba7695dd249bdfc353da9367832155/ssl-doh.conf) gist for `https.conf`.

The streaming request is setup here

<details>
  <summary>stream.conf</summary>

```nginx
stream {
        # Import the JavaScript file that processes the DoH requests
        js_import /etc/nginx/njs.d/dns/dns.js;

        # DNS logging
        log_format  dns   '$remote_addr [$time_local] $protocol "$dns_qname"';
        access_log /var/log/nginx/dns-access.log dns;

        # The $dns_qname variable can be populated by preread calls, and can be used for DNS routing
        js_set $dns_qname dns.get_qname;


        # DNS upstream pool (can also be DoT)
        upstream dns {
            zone dns 64k;
            server 127.0.0.1:53;
        }

        # DNS over HTTPS (gateway) translation process
        # Upstream can be either DNS (TCP) or DoT
        server {
                listen 127.0.0.1:8053;
                js_filter dns.filter_doh_request;
                proxy_pass dns;
        }
}
```

</details>

## Bonus on Nginx

I also use nginx for accessing the pihole web over ssl. Since pihole runs on lightpd, I had to put the below configuration in order to use [proxy_pass](https://dev.to/danielkun/nginx-everything-about-proxypass-2ona) feature of nginx to access pihole web over nginx ssl. Also notice that I changed lighttpd to run on 8000 port instead of port 80 (default). With nginx handling ssl offloading, the below configuration works like a charm to access pihole web interface over SSL

```nginx
location /admin {
  proxy_pass         "http://127.0.0.1:8000/admin";
}

```

After doing this you might get "FAILED cars: domain vs localhost, 127.0.0.1, pihole" etc. On debugging the pihole, found that `/var/www/html/admin/scripts/pi-hole/php/auth.php` expects `$_SERVER['HTTP_ORIGIN']` in `$AUTHORIZED_HOSTNAMES`.

This can be done adding env config for `VIRTUAL_HOST`.

```lighttpd
setenv.add-environment = ( "VIRTUAL_HOST" => "sd.vinayakg.dev")
```

## Closing thoughts

Setting up your own DoH server and using PiHole to block ads and malware can provide a significant level of protection and privacy for your entire network. By encrypting your DNS requests and blocking malicious domains, you can prevent your personal information from being intercepted and keep your devices safe from online threats.

### References

- [DNS-over-HTTPS (DoH) Explained](https://www.cloudflare.com/learning/dns/what-is-dns-over-https/)
- [PiHole - Network-wide Ad Blocking](https://pi-hole.net/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [nginx: Linux packages](http://nginx.org/en/linux_packages.html#Debian)
- [Unable to add whitelists for CORS](https://discourse.pi-hole.net/t/unable-to-add-whitelists-for-cors/59503/9)
