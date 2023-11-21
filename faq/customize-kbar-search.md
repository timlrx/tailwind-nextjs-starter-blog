# How can I customize the `kbar` search?

Add a `SearchProvider` component such as the one shown below and use it in place of the default `SearchProvider` component in `app/layout.tsx`.

`defaultActions` are the initial list of actions.

`onSearchDocumentsLoad` is a callback function that is called when the documents specified by `searchDocumentsPath` are loaded. Set `searchDocumentsPath` to `false` to disable the dynamically loaded search feature.

```tsx
'use client'

import { KBarSearchProvider } from 'pliny/search/KBar'
import { useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'

export const SearchProvider = ({ children }) => {
  const router = useRouter()
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: '',
            shortcut: ['h', 'h'],
            section: 'Home',
            perform: () => router.push('/'),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: '',
            shortcut: ['p'],
            section: 'Home',
            perform: () => router.push('/projects'),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json.map((post: CoreContent<Blog>) => ({
            id: post.path,
            name: post.title,
            keywords: post?.summary || '',
            section: 'Blog',
            subtitle: post.tags.join(', '),
            perform: () => router.push(post.path),
          }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
```
