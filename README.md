![tailwind-nextjs-banner](/public/static/images/twitter-card.png)

# Tailwind Nextjs Starter Blog

[![GitHub Repo stars](https://img.shields.io/github/stars/timlrx/tailwind-nextjs-starter-blog?style=social)](https://GitHub.com/timlrx/tailwind-nextjs-starter-blog/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/timlrx/tailwind-nextjs-starter-blog?style=social)](https://GitHub.com/timlrx/tailwind-nextjs-starter-blog/network/)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftimlrxx)](https://twitter.com/timlrxx)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/timlrx/tailwind-nextjs-starter-blog)

This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) blogging starter template. Comes out of the box configured with the latest technologies to make technical writing a breeze. Easily configurable and customizable. Perfect as a replacement to existing Jekyll and Hugo individual blogs.

Check out the documentation below to get started. Facing issues? Checkout of the [FAQ page](https://github.com/timlrx/tailwind-nextjs-starter-blog/wiki) and do a search on past issues. Feel free to open a new issue if none has been posted previously.

## Examples

- [Demo Blog](https://tailwind-nextjs-starter-blog.vercel.app/) - this repo
- [My personal blog](https://www.timlrx.com) - modified to auto-generate blog posts with dates

Using the template? Happy to accept any PR with modifications made e.g. sub-paths, localization or multiple authors

## Motivation

I wanted to port my existing blog to Nextjs and Tailwind CSS but there was no easy out of the box template to use so I decided to create one.

It is inspired by [Lee Robinson's blog](https://github.com/leerob/leerob.io), but focuses only on static site generation. Design is adapted from [Tailwindlabs blog](https://github.com/tailwindlabs/blog.tailwindcss.com).

I wanted it to be nearly as feature-rich as popular blogging templates like [beautiful-jekyll](https://github.com/daattali/beautiful-jekyll) and [Hugo Academic](https://github.com/wowchemy/wowchemy-hugo-modules) but with the best of React's ecosystem and current web development's best practices.

## Features

- Easy styling customization with [Tailwind 2.0](https://blog.tailwindcss.com/tailwindcss-v2) and primary color attribute
- Near perfect lighthouse score - [Lighthouse report](https://www.webpagetest.org/result/210111_DiC1_08f3670c3430bf4a9b76fc3b927716c5/)
- Lightweight, 38kB first load JS, uses Preact in production build
- Mobile-friendly view
- Light and dark theme
- [MDX - write JSX in markdown documents!](https://mdxjs.com/)
- Server-side syntax highlighting with line numbers and line highlighting via [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)
- Math display supported via [KaTeX](https://katex.org/)
- Automatic image optimization via [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- Flexible data retrieval with [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)
- Support for tags - each unique tag will be its own page
- Support for multiple authors
- Blog templates
- Support for nested routing of blog posts
- Supports [giscus](https://github.com/laymonage/giscus), [utterances](https://github.com/utterance/utterances) or disqus
- Projects page
- SEO friendly with RSS feed, sitemaps and more!

## Sample posts

- [A markdown guide](https://tailwind-nextjs-starter-blog.vercel.app/blog/github-markdown-guide)
- [Learn more about images in Next.js](https://tailwind-nextjs-starter-blog.vercel.app/blog/guide-to-using-images-in-nextjs)
- [A tour of math typesetting](https://tailwind-nextjs-starter-blog.vercel.app/blog/deriving-ols-estimator)
- [Simple MDX image grid](https://tailwind-nextjs-starter-blog.vercel.app/blog/pictures-of-canada)
- [Example of long prose](https://tailwind-nextjs-starter-blog.vercel.app/blog/the-time-machine)
- [Example of Nested Route Post](https://tailwind-nextjs-starter-blog.vercel.app/blog/nested-route/introducing-multi-part-posts-with-nested-routing)

## Quick Start Guide

1. JS (official support) - `npx degit https://github.com/timlrx/tailwind-nextjs-starter-blog.git` or TS (community support) - `npx degit timlrx/tailwind-nextjs-starter-blog#typescript`
2. Personalize `siteMetadata.json` (site related information)
3. Personalize `authors/default.md` (main author)
4. Modify `projectsData.js`
5. Modify `headerNavLinks.js` to customize navigation links
6. Add blog posts
7. Deploy on Vercel

## Development

First, run the development server:

```bash
npm start
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Extend / Customize

`data/siteMetadata.json` - contains most of the site related information which should be modified for a user's need.

`data/authors/default.md` - default author information (required). Additional authors can be added as files in `data/authors`.

`data/projectsData.js` - data used to generate styled card in projects page.

`data/headerNavLinks.js` - navigation links.

`data/logo.svg` - replace with your own logo.

`data/blog` - replace with your own blog posts.

`public/static` - store assets such as images and favicons.

`tailwind.config.js` and `css/tailwind.css` - contain the tailwind stylesheet which can be modified to change the overall look and feel of the site.

`components/social-icons` - to add other icons, simply copy an svg file from [Simple Icons](https://simpleicons.org/) and map them in `index.js`. Other icons uses [heroicons](https://heroicons.com/).

`components/MDXComponents.js` - pass your own JSX code or React component by specifying it over here. You can then call them directly in the `.mdx` or `.md` file. By default, a custom link and image component is passed.

`layouts` - main templates used in pages.

`pages` - pages to route to. Read the [Next.js documentation](https://nextjs.org/docs) for more information

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
```

Here's an example of a post's frontmatter:

```
---
title: 'Introducing Tailwind Nexjs Starter Blog'
date: '2021-01-12'
lastmod: '2021-01-18'
tags: ['next-js', 'tailwind', 'guide']
draft: false
summary: 'Looking for a performant, out of the box template, with all the best in web technology to support your blogging needs? Checkout the Tailwind Nextjs Starter Blog template.'
images: ['/static/images/canada/mountains.jpg', '/static/images/canada/toronto.jpg']
authors: ['default', 'sparrowhawk']
layout: PostLayout
---
```

### Compose

Run `node ./scripts/compose.js` to bootstrap a new post.

Follow the interactive prompt to generate a post with pre-filled front matter.

## Deploy

**Vercel**  
The easiest way to deploy the template is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

**Netlify / Github Pages / Firebase etc.**  
As the template uses `next/image` for image optimization, additional configurations has to be made to deploy on other popular static hosting websites like [Netlify](https://www.netlify.com/) or [Github Pages](https://pages.github.com/). An alternative image optimization provider such as Imgix, Cloudinary or Akamai has to be used. Alternatively, replace the `next/image` component with a standard `<img>` tag. See [`next/image` documentation](https://nextjs.org/docs/basic-features/image-optimization) for more details.
