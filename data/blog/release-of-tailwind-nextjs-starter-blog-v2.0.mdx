---
title: 'Release of Tailwind Nextjs Starter Blog v2.0'
date: '2023-08-05'
lastmod: '2023-08-05'
tags: ['next-js', 'tailwind', 'guide', 'feature']
draft: false
summary: 'Release of Tailwind Nextjs Starter Blog template v2.0, refactored with Nextjs App directory and React Server Components setup.Discover the new features and how to migrate from V1.'
images: ['/static/images/twitter-card.png']
---

## Introduction

Welcome to the release of Tailwind Nextjs Starter Blog template v2.0. This release is a major refactor of the codebase to support Nextjs App directory and React Server Components. Read on to discover the new features and how to migrate from V1.

<TOCInline toc={props.toc} exclude="Introduction" />

## V1 to V2

![Github Traffic](/static/images/github-traffic.png)

The template was first released in January 2021 and has since been used by thousands of users. It is featured on [Next.js Templates](https://vercel.com/templates/next.js/tailwind-css-starter-blog), [Tailwind Awesome](https://www.tailwindawesome.com/resources/tailwind-nextjs-starter-blog) among other listing sites. It attracts 200+ unique visitors daily notching 1500-2000 page views, with 1.3k forks and many other clones.

Many thanks to the community of users and contributors for making this template a success! I created a small video montage of the blogs (while cleaning up the list in the readme) to showcase the diversity of the blogs created using the template and to celebrate the milestone:

<video controls>
  <source
    src="https://github-production-user-asset-6210df.s3.amazonaws.com/28362229/258559849-2124c81f-b99d-4431-839c-347e01a2616c.webm"
    type="video/webm"
  />
</video>

Version 2 builds on the success of the previous version and introduces many new features and improvements. The codebase has been refactored to support Next.js App directory and React Server Components. Markdown / MDX is now processed using Contentlayer, a type-safe content SDK that validates and transforms your content into type-safe JSON data. It integrates with Pliny, a new library that provides out of the box Next.js components to enhance your static site with analytics, comments and newsletter subscription. A new command palette (⌘-k) search component is also added to the template.

Let's dive into the new features and improvements in V2.

## Next.js App Directory and React Server Components

Now that [Next.js App router](https://nextjs.org/docs/app) is finally stable and is mostly feature compatible with Page Router, the codebase has been migrated to new setup. This allows for a hybrid rendering approach, with the use of React Server Components generated on the server side for faster page loads and smaller bundle sizes, while retaining the ability to sprinkle in client side React components for interactivity.[^1]

With addition powers comes a [new paradigm](https://nextjs.org/docs/getting-started/react-essentials) to learn. I have migrated the codebase to make use of the new features as much as possible. This includes changes in the folder structure, splitting components into server vs client components, leveraging server side data fetching and using the recommended [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) API for SEO discoverability.

While this simplifies the codebase to some extent, it makes migration from the old codebase more difficult. If you are looking to migrate, I recommend starting from a fresh template and copying over your customizations and existing content. See the [migration recommendations](#migration-recommendations) section for more details.

## Typescript First

The codebase has been migrated to Typescript. While the previous version of the template was available in both Javascript and Typescript, I decided to reduce the maintenance burden and focus on Typescript. This also allows for better type checking and code completion in IDEs.

Typescript is also a perfect match with our new type-safe markdown processor - Contentlayer.

## Contentlayer

[Contentlayer](https://www.contentlayer.dev/) is a content SDK that validates and transforms your content into type-safe JSON data that you can easily import into your application. It makes working with local markdown or MDX files a breeze. This replaces `MDX-bundler` and our own markdown processing workflow.

First, a content source is defined, specifying the name of the document type, the source where it is located along with the frontmatter fields and any additional computed fields that should be generated as part of the process.

```ts:contentlayer.config.ts
export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    ...
  },
  computedFields: {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    }
    ...
  },
}))
```

Contentlayer then processes the MDX files with our desired markdown remark or rehype plugins, validates the schema, generate type definitions and output json files that can be easily imported in our pages. Hot reloading comes out of the box, so edits to the markdown files will be reflected in the browser immediately!

## Pliny

A large reason for the popularity of the template was its customizability and integration with other services from analytics providers to commenting solutions. However, this means that a lot of boilerplate code has to be co-located within the template even if the user does not use the feature. Updates and bug fixes had to be copied manually to the user's codebase.

To solve this, I have abstracted the logic to a separate repository - [Pliny](https://github.com/timlrx/pliny). Pliny provides out of the box Next.js components to enhance static sites:

- Analytics
  - Google Analytics
  - Plausible Analytics
  - Simple Analytics
  - Umami Analytics
  - Posthog
- Comments
  - Disqus
  - Giscus
  - Utterances
- Newsletter (uses Next 13 API Routes)
  - Buttondown
  - Convertkit
  - Email Octopus
  - Klaviyo
  - Mailchimp
  - Revue
- Command palette search with tailwind style sheet
  - Algolia
  - Kbar (local search)
- UI utility components
  - Bleed
  - Newsletter / Blog Newsletter
  - Pre / Code block
  - Table of Contents

Choose your preferred service by modifying `siteMetadata.js` and changing the appropriate fields. For example to change from Umami Analytics to Plausible, we can change the following fields:

```diff-js:siteMetadata.js
analytics: {
-   umamiAnalytics: {
-     // We use an env variable for this site to avoid other users cloning our analytics ID
-     umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
-   },
+    plausibleAnalytics: {
+      plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
+    },
},
```

Changes in the configuration file gets propagated to the components automatically. No modification to the template is required.

Under the hood, Pliny exports high level components such as `<Analytics analyticsConfig={analyticsConfig}/>` and `<Comments commentsConfig={commentsConfig}/>` which takes in a configuration object and renders the appropriate component. Since the layouts are defined on the server side, Next.js is able to use the configuration object to determine which component to render and send only the required component bundle to the client.

## New Search Component

What's a blog in 2023 without a command palette search bar?

One of the most highly requested features have been added 🎉! The search component supports 2 search providers - Algolia and Kbar local search.

### Algolia

[Algolia Docsearch](https://docsearch.algolia.com/) is popular free service used across many documentation websites. It automatically scrapes the website that has is submitted for indexing and makes the search result available via a beautiful dialog modal. The pliny component is greatly inspired by the Docusaurus implementation and comes with a stylesheet that is compatible with the Tailwind CSS theme.

### Kbar

[Kbar](https://github.com/timc1/kbar) is a fast, portable, and extensible cmd+k interface. The pliny implementation uses kbar to create a local search dialog box. The component loads a JSON file, default `search.json`, that was created in the contentlayer build process. Try pressing ⌘-k or ctrl-k to see the search bar in action!

## Styling and Layout Updates

### Theming

`tailwind.config.js` has been updated to use tailwind typography defaults where possible and to use the built-in support for dark mode via the `prose-invert` class. This replaces the previous `prose-dark` class and configuration.

The primary theme color is updated from `teal` to `pink` and the primary gray theme from `neutral` to `gray`.

Inter is now replaced with Space Grotesk as the default font.

### New Layouts

Layout components available in the `layouts` directory, provide a simple way to customize the look and feel of the blog.[^2]

The downside of building a popular template is that you start seeing multiple similar sites everywhere 😆. While users are encouraged to customized the layouts to their liking, having more layout options that are easily switchable promotes diversity and perhaps can be a good starting point for further customizations.

In v2, I added a new post layout - `PostBanner`. It features a large banner image and a centered content container. Check out "[Pictures of Canada](/blog/pictures-of-canada)" blog post which has been updated to use the new layout.

The default blog listing layout has also been updated to include a side bar with blog tags. The search bar in the previous layout has been replace with the new command palette search. To switch back to the old layout, simply change the pages that use the `ListLayoutWithTags` component back to the original `ListLayout`.

## Migration Recommendations

Due to the large changes in directory structure, setup and tooling, I recommend starting from a fresh template and copying existing content, followed by incrementally migrating changes over to the new template.

Styling changes should be relatively minor and can be copied over from the old `tailwind.config.js` to the new one. If copying over, you might need to add back the `prose-dark` class to components that opt into tailwind typography styling. Do modify the font import in the root layout component to use the desired font of choice.

Changes to the MDX processing pipeline and schema can be easily ported to the new Contentlayer setup. If there are changes to the frontmatter fields, you can modify the document type in `contentlayer.config.ts` to include the new fields. Custom plugins can be added to the `remarkPlugins` and `rehypePlugins` properties in the `makeSource` export of `contentlayer.config.ts`.

Markdown layouts are no longer sourced automatically from the `layouts` directory. Instead, they have to be specified in the `layouts` object defined in `blog/[...slug]/page.tsx`.[^3]

To port over larger components or pages, I recommend first specificing it as a client component by using the `"use client"` directive. Once it renders correctly, you can split the interactive components (parts that rely on `use` hooks) as a client component and keep the remaining code as a server component. Consult the comprehensive Next.js [migration guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app) for more details.

## Conclusion

I hope you enjoy the new features and improvements in V2. If you have any feedback or suggestions, feel free to open an issue or reach out to me on [Twitter](https://twitter.com/timlrx).

## Support

Using the template? Support this effort by giving a star on GitHub, sharing your own blog and giving a shoutout on Twitter or be a project [sponsor](https://github.com/sponsors/timlrx).

## Licence

[MIT](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/LICENSE) © [Timothy Lin](https://www.timrlx.com)

[^1]: The previous version injects Preact into the production build. However, this is no longer possible as it does not support React Server Components. While overall bundle size has increased to about 85kB, most of the content can be pre-rendered on the server side, resulting in a low first contentful paint and time to interactive. Using React throughtout also leads to more consistent behavior with external libraries and components.

[^2]: This is different from Next.js App Directory layouts and are best thought of as reusable React containers.

[^3]: This takes advantage of Server Components by making it simple to specify the layout of choice in the markdown file and match against the `layouts` object which is then used to render the appropriate layout component.
