---
title: SSL Common Name (CN) and Subject Alternate Name (SAN)
tags: [ssl, san,cn,common-name, subject-alternate-name]
date: 2024-02-13
draft: false
summary: SSL Common Names (CN) and Subject Alternative Names (SAN) and its mystery and how browsers use them
images: ['/static/images/ssl-cn-san-1706214791424.jpeg']
canonicalUrl: https://vinayakg.dev/ssl-common-name-cn-subject-alternate-name-san-mystery
---

🔒 **Exploring SSL Certificates and SANs: Unveiling the Mystery!** 🔒

Ever wondered why SSL certificates sometimes have a different Common Name (CN) than the domain name? Here's the scoop:

1. 🌐 **SANs Take the Lead:** Browsers prioritize names from Subject Alternate Names (SAN) over CN. SAN can host multiple domain names and IP addresses.

2. 🚀 **CN is Plan B:** If no match in SAN, browsers check CN. But don't fret if CN differs, especially in shared hosting situations – it's about trust, not just names.

3. 🕵️‍♂️ **Check Your Cert:** Use this OpenSSL command to inspect CN, SAN, and more:

`sh openssl s_client -connect [yourdomain.com:443](http://yourdomain.com:443/) 2>/dev/null | openssl x509 -noout -text | grep -E "CN=|DNS:|IP Address:|Purpose:|Public Key:|Not Before:|Not After:" `

4. 🌟 **Firebase Example:** Google Firebase might show a different CN, but with a whopping 100 SAN DNS entries. Impressive!

5. 🛡️ **Maximize SAN Entries:** Remember, the maximum SAN entries per Let's Encrypt certificate are around 100.



![openssl-cli-san](../static/images/ssl-cn-san-1706214791424.jpeg)

![browser-padlock-cert](../static/images/ssl-cn-san-1706214789234.jpeg)



## References

Ref: https://community.letsencrypt.org/t/how-to-obtain-a-cert-without-a-common-name/72807/9
Ref: https://community.letsencrypt.org/t/multiple-domain-names-per-certificate-performance/205443

Let's demystify SSL together! Like and share to spread the knowledge.
