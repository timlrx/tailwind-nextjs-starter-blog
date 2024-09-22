---
title: Streamline SSL Certificate generation Effortlessly using certbot
tags: [acme, certbot, security, privacy, nginx, ssl, automation, letsencrypt]
date: 2023-03-01
draft: false
summary:
canonicalUrl: https://vinayakg.dev/streamline-ssl-certificate-generation-effortlessly-using-certbot
---

## Background

Manually generating SSL certificates and installing them on web servers can be a cumbersome and error-prone process.

In addition, storing and securing the private key can be challenging, as it needs to be kept confidential to prevent hackers from intercepting or modifying the encrypted communication.

Most cloud providers today let you offload SSL certificate generation to tools like AWS Certificate Manager, Azure Key Vault, et al. Also most SaaS providers automatically create SSL certificates for your product implementation without having to worry about it.

However - it is important to know how it can be done so we can appreciate the complexity/simplicity :) and the tooling involved with it.

## Lets Encrypt (certbot)

### Registration

[Certbot](https://certbot.eff.org) is a free and open-source tool that automates the certificate generation and renewal process, and takes care of the private key management.

First-time users of certbot need to register an account with a supported certificate authority (CA) such as Let's Encrypt.

Since the certbot website does not support registration, the easiest way to do this is to use the certbot command-line interface (CLI) with the following command:

```shell
sudo certbot register --email your@email.address --agree-tos
```

This will register an account against the email provided and it will also create private keys et al. The private key will be located under n node in the file at `/etc/letsenrypt/accounts/acme-v02.api.letsencrypt.org/directory/0*/private_key.json`.

You will have to keep this safe, either move to a key vault or set permission/access for required users only.

### Generating certificate for example.com

Assuming that you have a Debian-based server with nginx installed and configured for serving example.com over HTTP (port 80), you can use certbot to generate a new SSL certificate and validate it via the ACME challenge mechanism over port 80.

We will be using [acme-tiny](https://github.com/diafygi/acme-tiny?ref=scotthelme.co.uk) for this purpose as the official Lets Encrypt cli `certbot` generates a new pair with each renewal and it can cause issues with HPKP(HTTP Public Key Pinning).

If you are on Ubuntu, you can use ubuntu or create new user if you like using this [gist.](https://gist.github.com/vinayakg/0153e8de9b02f064637b569d2e10ebe4)

Install nginx on your system, if its not already installed. `sudo apt install nginx`

Create directory for challenges using `mkdir - p /home/ubuntu/certs` and `cd` to it.

Download [acme_tiny.py](https://github.com/diafygi/acme-tiny/blob/master/acme_tiny.py) script in a folder called certs

```shell
wget -O - https://raw.githubusercontent.com/diafygi/acme-tiny/master/acme_tiny.py > acme_tiny.py
```

Generate a new 4096 bit RSA key since we are not using Certbot

```shell
openssl genrsa 4096 > account.key
```

Create your own copy of openssl.cnf by copying it from install location. You may cd to `/home/ubuntu/certs` and work from here

```shell
cp /etc/ssl/openssl.cnf openssl.cnf
```

Now edit the openssl.cnf and uncomment the line containing `req_extensions = v3_req`.

Locate [v3_req] section and add `subjectAltName = @alt_names` and add as many alternate certificates/names needed under a newly created [altnames] section. And add the alternate domain names that you need to create using the below syntax under the

```
[ alt_names ]

DNS.1 = doh.vinayakg.dev
DNS.2 = cal.vinayakg.dev
```

Generate the [CSR](https://www.globalsign.com/en-in/blog/what-is-a-certificate-signing-request-csr) (Certifiate Signing Request) that will be needed to get Lets Encrypt to sign our certificates on each renewal.

`openssl.cnf` is from previous step, `vinayakg.dev.csr` is the out file, key is the private key that we generated in [previous section](#registration)

```shell
openssl req -new -key /path/private.pem -out vinayakg.dev.csr -config openssl.cnf
```

When asked answer all questions as you see fit but use Common Name as one of the names specified in the [alt_names] array. You may skip password entry prompt.

You may check CSR with `openssl req -in vinayakg.dev.csr -noout -text` and look for the DNS names as added in [alt_names] section.

#### Few administrative steps for acme-validations

ACME (Automatic Certificate Management Environment) validations is one of the challenge types used for domian validations. You may know more about it [here.](https://letsencrypt.org/docs/challenge-types/)

Create directory for challenges using `mkdir - p /home/ubuntu/certs/challenges`.

Then check if the webserver(nginx) has permission to access this folder using `sudo -u nginx stat /home/ubuntu/certs/challenges`. This assumes that `nginx` is the user under which nginx runs. If you do not see any stat output, then fix it using `sudo gpasswd -a /home/ubuntu/certs/challenges nginx`

On Nginx, you will have to configure port 80 to accept acme challenges at `/home/ubuntu/certs/challenges`

```nginx
server {
      listen 80;
      server_name sd.vinayakg.dev cal.vinayakg.dev;

      root /var/www/html/;
      location /.well-known/acme-challenge/ {
              alias /home/ubuntu/challenges/;
              try_files $uri =404;
      }
}
```

Now we are ready to run the certificate generation command that will automatically also validate the acme challenge and issue certificate as per openssl.cnf.

```shell
python3 /home/ubuntu/certs/acme_tiny.py --account-key /home/ubuntu/certs/account.key --csr /home/ubuntu/certs/vinayakg.dev.csr --acme-dir /home/ubuntu/certs/challenges > /home/ubuntu/certs/signed.crt
```

This command tells certbot to generate a new certificate for domains specified in openssl.cnf using the directory `/home/ubuntu/certs/challenges` for acme validations and instruct the CA to retrieve it via HTTP over port 80.

If the ACME challenge succeeds, certbot will create a new certificate and store it as `/home/ubuntu/certs/signed.crt`, along with the private key, chain, and full certificate.

Now lets download the intermediate certificates to complete the chain of trust for the SSL certificates generated and concatenate to create a full certificate.

```shell
wget -O - https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem > intermediate.pem
cat signed.crt intermediate.pem > fullcert.pem
```

### Setup example.com with SSL

Once you have the SSL certificate and private key, you can configure nginx to serve example.com over HTTPS (port 443) by adding the following lines to your server block:

```nginx
# This virtual server accepts HTTP/2 over HTTPS
server {
    listen 443 ssl http2;
    ssl_certificate /home/ubuntu/certificates/fullcert.pem;
    ssl_certificate_key /home/ubuntu/certificates/private.key;
    ssl_session_cache shared:ssl_cache:10m;

    # Return 404 for non-DoH requests
    location / {
        return 404 "404 Not Found\n";
    }
}
```

Don't forget to reload nginx for the changes to take effect:

```bash
sudo systemctl reload nginx
```

### Automation

Create a script named `renew.sh` under `/home/ubuntu/certs/` and add following code

```bash
#!/bin/bash

python3 /home/ubuntu/certs/acme_tiny.py --account-key /home/ubuntu/certs/account.key --csr /home/ubuntu/certs/vinayakg.dev.csr --acme-dir /home/ubuntu/certs/challenges > /home/ubuntu/certs/signed.crt
cat /home/ubuntu/certs/signed.crt /home/ubuntu/certs/intermediate.pem > /home/ubuntu/certs/fullcert.pem
sudo service nginx reload
```

To automate the certificate renewal process, you can set up a cron job that runs certbot every 60 days and renews the certificate if it is close to expiring. Here's an example cron job that runs at midnight on the 1st and 15th day of each month:

```bash
0 0 1 */2 * root /home/ubuntu/certs/renew.sh
```

This command tells certbot to renew any expiring certificates and print a summary of the results, without upgrading itself to a newer version. You can customize the timing and options as needed, and add a notification or logging mechanism to alert you of any errors or warnings.

That's it! This should give you a good starting point for automating SSL certificate generation and setup on a Debian-based server with nginx.

## References

[Getting started with LetsEncrypt](https://scotthelme.co.uk/setting-up-le/)

[Using NGINX as a DoT or DoH Gateway](https://gist.github.com/nginx-gists/7364e8c1f557321e09badcc93376bd28)

[ubuntu - Nginx* stat() failed (13* permission denied)](https://stackoverflow.com/questions/25774999/nginx-stat-failed-13-permission-denied)
