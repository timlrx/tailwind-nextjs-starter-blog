---
title: NFTs are not just the art—they're also the certificate of authenticity
slug: an-nft-is-not-the-art
date: '2021-03-12'
tags: ['NFTs', 'Crypto']
excerpt: Would you buy a car without a title? A house without a deed? NFTs are things with authenticity built-in, making them more than just a digital file.
---

Writing a series on NFTs wasn't really something I set out to do, but here we are—with my own and the global interest hitting something of a fever pitch. If you haven't seen those yet, you can read [my primer on NFTs here](__GHOST_URL__/wtf-is-an-nft-and-some-use-cases/), [my experience minting one](__GHOST_URL__/how-i-accidentally-created-and-sold-an-nft/), and a [thought exercise on digital membership cards](__GHOST_URL__/membership-nfts/).

With Beeple [selling his Everydays piece at a Christie's auction for $69M](https://onlineonly.christies.com/s/beeple-first-5000-days/beeple-b-1981-1/112924) the attention on the space is even hotter than it was a _week_ ago. Every day that passes feels like an eternity here. With all eyes on NFTs a lot of disingenuous headlines are popping up, with many folks scratching their heads wondering what—if anything beyond an image—is everyone buying into here? Let's try to demystify that one a little bit.

## NFTs are digital objects with certificates of authenticity built-in

![](__GHOST_URL__/content/images/2021/03/iu.png)
[Banksy](https://banksy.co.uk) is arguably one of the most famous artists in the world, certainly the most famous street artist in existence. His original works, typically in the form of pasted graffiti, are often copied—sometimes in the form of unauthorized prints. So when there's a Banksy work that's for sale, how does a potential buyer know that the work is truly an original? I certainly wouldn't want to pay for something that's a really good look-alike if what I was being sold was an "original".

This is where [Banksy's Pest Control](https://pestcontroloffice.com) comes in. They're a group that's uniquely authorized to authenticate Banksy's works and have a brilliant method for providing proof of that authenticity. For a fee, the team at Pest Control can authenticate a work and then provide a certificate of authenticity. But how do they prevent fake certificates?

### Torn paper cryptography

Private-key cryptography has been around for a long time. The concept is relatively simple—there's a pair of keys that are used to secure something. If you know my public key, you could encrypt a message with that key—but since only I have the private key that's paired with it, only I can decrypt that message. This is precisely how Pest Control works. They rip up one of Banksy's [Di Faced Tenners](https://hexagongallery.com/catalog/artist/banksy/di-faced-tenner/), and attach one half (the public key) to the paper, while retaining the other half (the private key) in their own secure facility.

If the question of authenticity ever arose around one of Banksy's work, Pest Control could quickly and easily identify the work based on the unique tear pattern that exists on the "public" half, only matched by their corresponding private half.
![](__GHOST_URL__/content/images/2021/03/image.png)
The trouble with all of this is that a separate authenticating authority, with corresponding certificates, and a cumbersome method of authentication is required to accompany the works. This makes verification slow, with many potential points of failure along the way (destruction of the certificate, loss of the private key, etc.). This is where NFTs are kind of magic—they blend the work itself with the certificate of authenticity.

NFTs themselves are just code—fancy instructions that give rules to computers to help them understand what something is, and how it should be governed. All within a single smart contract (the code) one can establish what the work is (an image, for example), the rules by which it can be traded, any royalty payments that might come along with it, etc. Its existence on an immutable ledger means that one can also inspect its transaction history (transfers, sales, etc.) as well as provenance (how, when, and by whom it was created).

If at any point in time I come across an NFT that was created by the address `0xc6b0562605d35ee710138402b878ffe6f2e23807` I can know beyond a shadow of a doubt that it was Beeple's wallet that did it. Now, it's certainly possible that at some future point that wallet could become compromised, but we can know that everything that was minted (created and written to the blockchain) prior to that date is still authentically his work.

By nature this means that the work and its certificate of authenticity are bound together as one piece, inseparable. So…when Beeple's works start moving around we would never need the equivalent of his Pest Control to verify it—the blockchain is his Pest Control, independently verifiable by anyone on the planet with an internet connection.

### NFTs aren't just any kind of JPG

The New York Times ran a headline yesterday that was just a bit too cute for its own good: "[JPG File Sells for $69 Million, as ‘NFT Mania’ Gathers Pace](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html)." Sure it's attention-grabbing, but boy is it disingenuous. It's not _just_ a JPG, but a JPG with a built-in certificate of authenticity and that's why it's special.

## Would you buy a car without a title?

This is where the discourse around NFTs start to break from reality. Many are decrying them as "just pictures" and that they can be easily copied, etc. etc. So to these people I will pose the following questions:

- Would you buy a car for fair market value without a title?
- Would the government allow you any services without a birth certificate?
- Would you buy a house without a deed?

The simple answer to all of the above for most, I'm assuming, would be "yeah, probably not." What's crazier still is that there's even an entire industry built up around the "what if" scenario of an incorrect deed (see [title insurance](https://en.wikipedia.org/wiki/Title_insurance)).

What would the value of the car be without a title? Sure, its constituent components are probably valuable to a junker, and maybe you could drive it under the radar for some time, but eventually it could get you in trouble. All throughout society we have examples of works bound to certificates of authenticity (including our own selves). So why is it such a weird leap for people to take that digital works can now have their own? Needless to say, these critics are already wrong about what NFTs are, and will be further proven wrong as more and more use cases arise.

Imagine a future where all kinds of things use NFTs as their certificates of authenticity—those same car titles, deeds, etc. Now there are also ways to bind physical objects with addresses on a blockchain, with some companies like [Everledger](https://www.everledger.io) having done it for a while.

## Wrapping up

The world of NFTs is moving wicked fast—certainly with its adoption seeming to outpace cryptocurrency in general. It's totally understandable if someone doesn't initially grok _why_ an NFT is more special than just a .jpg file, but that's where it's worthwhile to educate them. People understand deeds, titles, and certificates of authenticity—so let's help them connect the dots to the digital world.
