![tailwind-nextjs-banner](/public/static/images/twitter-card.png)

# Tailwind Nextjs Starter Blog Alternative

A feature-rich markdown blog template for Next.js. Easy to set up and customize. A great replacement for existing Jekyll and Hugo single blogs.

Check out the documentation below to get started.

Facing issues? Check the [FAQ page](https://github.com/timlrx/tailwind-nextjs-starter-blog/wiki) and do a search on past issues. Feel free to open a new issue if none has been posted previously.

Feature request? Check the past discussions to see if it has been brought up previously. Otherwise, feel free to start a new discussion thread. All ideas are welcomed!

## The Story Behind the Template

[Timothy Lin](https://www.timlrx.com)'s passion for technology led him to create an innovative blog template, combining the power of Next.js with the flexibility of Tailwind CSS. He was inspired by the [Tailwind Labs blog](https://github.com/tailwindlabs/blog.tailwindcss.com) and popular templates like [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) and [Hugo Academic](https://github.com/wowchemy/wowchemy-hugo-modules), but he wanted something more: a template that would integrate the best of the React ecosystem and the most modern web development practices.

Inspired by his initiative, I decided to create my own version, adding extra features to make it even more complete.

### What's New?

- **Dynamic Header:**
  Now, in addition to the `default` and `fixed` options, there is also the `dynamic` option, a version of the header that hides when the user scrolls down and reappears when scrolling up, to make the screen cleaner for reading.

- **Cover Image for Posts:**
  highlight your articles with attractive cover images, with a responsive layout that automatically adjusts to the image proportions.

- **Embroidered Layout:**
  I added elegant borders to the main layout on MD and XL screens, to provide a more pleasant reading experience.

I hope this template is useful for you and other developers looking for a modern, customizable and feature-rich blog!

## Features

- Next.js with Typescript
- [Contentlayer](https://www.contentlayer.dev/) to manage content logic
- Easy styling customization with [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) and primary color attribute
- [MDX - write JSX in markdown documents!](https://mdxjs.com/)
- Mobile-friendly view
- Light and dark theme
- Font optimization with [next/font](https://nextjs.org/docs/app/api-reference/components/font)
- Integration with [pliny](https://github.com/timlrx/pliny) that provides:
  - Multiple analytics options including [Umami](https://umami.is/), [Plausible](https://plausible.io/), [Simple Analytics](https://simpleanalytics.com/), Posthog and Google Analytics
  - Comments via [Giscus](https://github.com/laymonage/giscus), [Utterances](https://github.com/utterance/utterances) or Disqus
  - Newsletter API and component with support for Mailchimp, Buttondown, Convertkit, Klaviyo, Revue, Emailoctopus and Beehiiv
  - Command palette search with [Kbar](https://github.com/timc1/kbar) or Algolia
- Server-side syntax highlighting with line numbers and line highlighting via [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)
- Math display supported via [KaTeX](https://katex.org/)
- Citation and bibliography support via [rehype-citation](https://github.com/timlrx/rehype-citation)
- [Github alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) via [remark-github-blockquote-alert](https://github.com/jaywcjlove/remark-github-blockquote-alert)
- Automatic image optimization via [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- Support for tags - each unique tag will be its own page
- Support for multiple authors
- 3 different blog layouts
- 1 blog listing layout
- Support for nested routing of blog posts
- Projects page
- Preconfigured security headers
- SEO friendly with RSS feed, sitemaps and more!

## Sample posts

- [A markdown guide](https://tailwind-nextjs-starter-blog-alternative.vercel.app/blog/github-markdown-guide)
- [Learn more about images in Next.js](https://tailwind-nextjs-starter-blog-alternative.vercel.app/blog/guide-to-using-images-in-nextjs)
- [A tour of math typesetting](https://tailwind-nextjs-starter-blog-alternative.vercel.app/blog/deriving-ols-estimator)
- [Simple MDX image grid](https://tailwind-nextjs-starter-blog-alternative.vercel.app/blog/pictures-of-canada)
- [Example of long prose](https://tailwind-nextjs-starter-blog-alternative.vercel.app/blog/the-time-machine)
- [Example of Nested Route Post](https://tailwind-nextjs-starter-blog-alternative.vercel.app/blog/nested-route/introducing-multi-part-posts-with-nested-routing)

## Quick Start Guide

1. Clone the repo

```bash
npx degit 'Erick-Leite/tailwind-nextjs-starter-blog-alternative'
```

2. Personalize `siteMetadata.js` (site related information)
3. Modify the content security policy in `next.config.js` if you want to use
   other analytics provider or a commenting solution other than giscus.
4. Personalize `authors/default.md` (main author)
5. Modify `projectsData.ts`
6. Modify `headerNavLinks.ts` to customize navigation links
7. Add blog posts
8. Deploy on Vercel

## Installation

```bash
yarn
```

Please note, that if you are using Windows, you may need to run:

```bash
$env:PWD = $(Get-Location).Path
```

## Development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit the layout in `app` or content in `data`. With live reloading, the pages auto-updates as you edit them.

## Extend / Customize

`data/siteMetadata.js` - contains most of the site related information which should be modified for a user's need.

`data/authors/default.md` - default author information (required). Additional authors can be added as files in `data/authors`.

`data/projectsData.js` - data used to generate styled card on the projects page.

`data/headerNavLinks.js` - navigation links.

`data/logo.svg` - replace with your own logo.

`data/blog` - replace with your own blog posts.

`public/static` - store assets such as images and favicons.

`tailwind.config.js` and `css/tailwind.css` - tailwind configuration and stylesheet which can be modified to change the overall look and feel of the site.

`css/prism.css` - controls the styles associated with the code blocks. Feel free to customize it and use your preferred prismjs theme e.g. [prism themes](https://github.com/PrismJS/prism-themes).

`contentlayer.config.ts` - configuration for Contentlayer, including definition of content sources and MDX plugins used. See [Contentlayer documentation](https://www.contentlayer.dev/docs/getting-started) for more information.

`components/MDXComponents.js` - pass your own JSX code or React component by specifying it over here. You can then use them directly in the `.mdx` or `.md` file. By default, a custom link, `next/image` component, table of contents component and Newsletter form are passed down. Note that the components should be default exported to avoid [existing issues with Next.js](https://github.com/vercel/next.js/issues/51593).

`layouts` - main templates used in pages:

- There are currently 3 post layouts available: `PostLayout`, `PostSimple` and `PostBanner`. `PostLayout` is the default 2 column layout with meta and author information. `PostSimple` is a simplified version of `PostLayout`, while `PostBanner` features a banner image.
- There is a blog listing layout: `ListLayoutWithTags`, which includes a sidebar with information about the tags.

`app` - pages to route to. Read the [Next.js documentation](https://nextjs.org/docs/app) for more information.

`next.config.js` - configuration related to Next.js. You need to adapt the Content Security Policy if you want to load scripts, images etc. from other domains.

## Post

Content is modelled using [Contentlayer](https://www.contentlayer.dev/), which allows you to define your own content schema and use it to generate typed content objects. See [Contentlayer documentation](https://www.contentlayer.dev/docs/getting-started) for more information.

### Frontmatter

Frontmatter follows [Hugo's standards](https://gohugo.io/content-management/front-matter/).

Please refer to `contentlayer.config.ts` for an up to date list of supported fields. The following fields are supported:

```
title (required)
date (required)
tags (optional)
lastmod (optional)
draft (optional)
summary (optional)
image (optional)
coverImage (optional)
images (optional)
authors (optional list which should correspond to the file names in `data/authors`. Uses `default` if none is specified)
layout (optional list which should correspond to the file names in `data/layouts`)
canonicalUrl (optional, canonical url for the post for SEO)
```

Here's an example of a post's frontmatter:

```
---
title: 'Introducing Tailwind Nexjs Starter Blog'
date: '2021-01-12'
lastmod: '2024-08-16'
tags: ['next-js', 'tailwind', 'guide']
draft: false
summary: 'Looking for a performant, out of the box template, with all the best in web technology to support your blogging needs? Checkout the Tailwind Nextjs Starter Blog template.'
image:
  {
    '@types': 'imageObject',
    author: 'John Lee (@john_artifexfilm)',
    url: '/static/images/canada/mountains.jpg',
    alt: 'Montanhas, lago moreno e natureza em Canada',
    width: 288,
    height: 206.249,
  }
coverImage:
  {
    url: '/static/images/canada/mountains.jpg',
    alt: 'Montanhas, lago moreno e natureza em Canada',
    width: 288,
    height: 206.249,
  }
images: ['/static/images/canada/mountains.jpg']
authors: ['default', 'sparrowhawk']
layout: PostLayout
canonicalUrl: https://tailwind-nextjs-starter-blog.vercel.app/blog/introducing-tailwind-nextjs-starter-blog
---
```

**Note:**

The `url` of `coverImage` is automatically used as the value for `image` and `images`, if these do not have their values defined.

## Deploy

### GitHub Pages

A [`pages.yml`](.github/workflows/pages.yml) workflow is already provided. Simply select "GitHub Actions" in: `Settings > Pages > Build and deployment > Source`.

### Vercel

The easiest way to deploy the template is to deploy on [Vercel](https://vercel.com). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Netlify

[Netlify](https://www.netlify.com/)’s Next.js runtime configures enables key Next.js functionality on your website without the need for additional configurations. Netlify generates serverless functions that will handle Next.js functionalities such as server-side rendered (SSR) pages, incremental static regeneration (ISR), `next/images`, etc.

See [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/#next-js-runtime) for suggested configuration values and more details.

### Static hosting services (GitHub Pages / S3 / Firebase etc.)

Run:

```sh
$ EXPORT=1 UNOPTIMIZED=1 yarn build
```

Then, deploy the generated `out` folder or run `npx serve out` it locally.

> [!IMPORTANT]
> If deploying with a URL base path, like https://example.org/myblog you need an extra `BASE_PATH` shell-var to the build command:
>
> ```sh
> $ EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog yarn build
> ```
>
> => In your code, `${process.env.BASE_PATH || ''}/robots.txt` will print `"/myblog/robots.txt"` in the `out` build (or only `/robots.txt` if `yarn dev`, ie: on localhost:3000)

> [!TIP]
> Alternatively to `UNOPTIMIZED=1`, to continue using `next/image`, you can use an alternative image optimization provider such as Imgix, Cloudinary or Akamai. See [image optimization documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization) for more details.

Consider removing the following features that cannot be used in a static build:

1. Comment out `headers()` from `next.config.js`.
2. Remove `api` folder and components which call the server-side function such as the Newsletter component. Not technically required and the site will build successfully, but the APIs cannot be used as they are server-side functions.

## Frequently Asked Questions

- [How can I add a custom MDX component?](/faq/custom-mdx-component.md)
- [How can I customize the `kbar` search?](/faq/customize-kbar-search.md)
- [Deploy with docker](/faq/deploy-with-docker.md)

## Support

Using the template? Support this effort by giving a star on GitHub, sharing your own blog and giving a shoutout on Twitter or becoming a project [sponsor](https://github.com/sponsors/timlrx).

## Licence

[MIT](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/LICENSE) © [Timothy Lin](https://www.timlrx.com)
