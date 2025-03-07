'use client'

import type { ReactNode, ComponentType } from 'react'
import Pre from 'pliny/ui/Pre'
import { Tab, TabGroup, TabPanel, TabPanels, TabList } from '@headlessui/react'
import { Fragment } from 'react'

interface PreviewableCodeBlock {
  type: string
  props: {
    className?: string
    children: ReactNode
  }
}

const extractTextFromAST = (children: ReactNode): string => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractTextFromAST).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const childrenWithProps = children as { props: { children: ReactNode } }
    return extractTextFromAST(childrenWithProps.props.children)
  }
  return String(children || '')
}

const isPreviewableCodeBlock = (children: unknown): children is PreviewableCodeBlock => {
  return (
    children !== null &&
    typeof children === 'object' &&
    'props' in children &&
    'type' in children &&
    (children as any).type === 'code'
  )
}

interface PreviewableCodeProps {
  children: ReactNode
  enablePreview?: boolean
  defaultView?: 'preview' | 'code'
  renderers: { [key: string]: ComponentType<any> }
  [key: string]: unknown
}

const PreviewableCode = ({
  children,
  enablePreview = true,
  defaultView = 'preview',
  renderers,
  ...props
}: PreviewableCodeProps) => {
  // If preview is disabled or the code block is not previewable, return the raw code block
  if (!enablePreview || !isPreviewableCodeBlock(children)) {
    return <Pre {...props}>{children}</Pre>
  }

  const { className } = children.props
  const languageMatch = /language-(\w+)/.exec(className || '')

  if (!languageMatch) {
    return <Pre {...props}>{children}</Pre>
  }

  const language = languageMatch[1]
  const Renderer = renderers[language]

  if (!Renderer) {
    console.warn(`No renderer found for language: ${language}`)
    return <Pre {...props}>{children}</Pre>
  }

  const rawText = extractTextFromAST(children.props.children)

  return (
    <TabGroup defaultIndex={defaultView === 'preview' ? 0 : 1}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <TabList className="-mb-px flex space-x-8">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } `}
              >
                Code
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } `}
              >
                Preview
              </button>
            )}
          </Tab>
        </TabList>
      </div>
      <TabPanels>
        <TabPanel>
          <Pre {...props}>{children}</Pre>
        </TabPanel>
      </TabPanels>
      <TabPanel>
        <div className="">
          <Renderer code={rawText} {...props} />
        </div>
      </TabPanel>
    </TabGroup>
  )
}

export default PreviewableCode
