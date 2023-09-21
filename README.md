## Features


- Easy styling customization with [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) and primary color attribute
- Near perfect lighthouse score - [Lighthouse report](https://www.webpagetest.org/result/221104_AiDc59_4WF/)
- Lightweight, 45kB first load JS, uses Preact in production build
- Mobile-friendly view
- Light and dark theme
- Self-hosted font with [Fontsource](https://fontsource.org/)
- Supports [plausible](https://plausible.io/), [simple analytics](https://simpleanalytics.com/) and google analytics
- [MDX - write JSX in markdown documents!](https://mdxjs.com/)
- Server-side syntax highlighting with line numbers and line highlighting via [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)
- Math display supported via [KaTeX](https://katex.org/)
- Citation and bibliography support via [rehype-citation](https://github.com/timlrx/rehype-citation)
- Automatic image optimization via [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- Flexible data retrieval with [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)
- Support for tags - each unique tag will be its own page
- Support for multiple authors
- Blog templates
- TOC component
- Support for nested routing of blog posts
- Newsletter component with support for mailchimp, buttondown, convertkit, klaviyo, revue, and emailoctopus
- Supports [giscus](https://github.com/laymonage/giscus), [utterances](https://github.com/utterance/utterances) or disqus
- Projects page
- Preconfigured security headers
- SEO friendly with RSS feed, sitemaps and more!

## Quick Start Guide

1. Try installing the starter using the new [Pliny project CLI](https://github.com/timlrx/pliny):

```bash
npm i -g @pliny/cli
pliny new --template=starter-blog my-blog
```

It supports the updated version of the blog with Contentlayer, optional choice of TS/JS and different package managers as well as more modularized components which will be the basis of the template going forward.

Alternatively to stick with the current version, TypeScript and Contentlayer:

```bash
npx degit 'timlrx/tailwind-nextjs-starter-blog#contentlayer'
```

or JS (official support)

```bash
npx degit https://github.com/timlrx/tailwind-nextjs-starter-blog.git
```

2. Personalize `siteMetadata.js` (site related information)
3. Modify the content security policy in `next.config.js` if you want to use
   any analytics provider or a commenting solution other than giscus.
4. Personalize `authors/default.md` (main author)
5. Modify `projectsData.js`
6. Modify `headerNavLinks.js` to customize navigation links
7. Add blog posts
8. Deploy on Vercel

## Installation

```bash
npm install
```

## Development

First, run the development server:

```bash
npm start
```

or

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Extend / Customize

`data/siteMetadata.js` - contains most of the site related information which should be modified for a user's need.

`data/authors/default.md` - default author information (required). Additional authors can be added as files in `data/authors`.

`data/projectsData.js` - data used to generate styled card on the projects page.

`data/headerNavLinks.js` - navigation links.

`data/logo.svg` - replace with your own logo.

`data/blog` - replace with your own blog posts.

`public/static` - store assets such as images and favicons.

`tailwind.config.js` and `css/tailwind.css` - contain the tailwind stylesheet which can be modified to change the overall look and feel of the site.

`css/prism.css` - controls the styles associated with the code blocks. Feel free to customize it and use your preferred prismjs theme e.g. [prism themes](https://github.com/PrismJS/prism-themes).

`components/social-icons` - to add other icons, simply copy an svg file from [Simple Icons](https://simpleicons.org/) and map them in `index.js`. Other icons use [heroicons](https://heroicons.com/).

`components/MDXComponents.js` - pass your own JSX code or React component by specifying it over here. You can then call them directly in the `.mdx` or `.md` file. By default, a custom link and image component is passed.

`layouts` - main templates used in pages.

`pages` - pages to route to. Read the [Next.js documentation](https://nextjs.org/docs) for more information.

`next.config.js` - configuration related to Next.js. You need to adapt the Content Security Policy if you want to load scripts, images etc. from other domains.

## Post

### Frontmatter

Frontmatter follows [Hugo's standards](https://gohugo.io/content-management/front-matter/).

Currently 7 fields are supported.

```
title (required)
date (required)
tags (required, can be empty array)
lastmod (optional)
draft (optional)
summary (optional)
images (optional, if none provided defaults to socialBanner in siteMetadata config)
authors (optional list which should correspond to the file names in `data/authors`. Uses `default` if none is specified)
layout (optional list which should correspond to the file names in `data/layouts`)
canonicalUrl (optional, canonical url for the post for SEO)
```

Here's an example of a post's frontmatter:

```
---
title: 'Introducing Tailwind Nexjs Starter Blog'
date: '2021-01-12'
lastmod: '2021-01-18'
tags: ['next-js', 'tailwind', 'guide']
draft: true
summary: 'Looking for a performant, out of the box template, with all the best in web technology to support your blogging needs? Checkout the Tailwind Nextjs Starter Blog template.'
images: ['/static/images/canada/mountains.jpg', '/static/images/canada/toronto.jpg']
authors: ['default', 'sparrowhawk']
layout: PostLayout
canonicalUrl: https://tailwind-nextjs-starter-blog.vercel.app/blog/introducing-tailwind-nextjs-starter-blog
---
```

### Compose

Run `node ./scripts/compose.js` to bootstrap a new post.

Follow the interactive prompt to generate a post with pre-filled front matter.

## Deploy

**Vercel**  
The easiest way to deploy the template is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

**GitHub Pages / Firebase etc.**  
As the template uses `next/image` for image optimization, additional configurations have to be made to deploy on other popular static hosting websites like [Firebase](https://firebase.google.com/) or [GitHub Pages](https://pages.github.com/). An alternative image optimization provider such as Imgix, Cloudinary or Akamai has to be used. Alternatively, replace the `next/image` component with a standard `<img>` tag. See [`next/image` documentation](https://nextjs.org/docs/basic-features/image-optimization) for more details.

The API routes used in the newsletter component cannot be used in a static site export. You will need to use a form API endpoint provider and substitute the route in the newsletter component accordingly. Other hosting platforms such as Netlify also offer alternative solutions - please refer to their docs for more information.
