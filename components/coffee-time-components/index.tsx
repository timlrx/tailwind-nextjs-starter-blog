'use client'

import {
  Details,
  Summary as SummaryLib,
  Content,
  List as ListLib,
  ListItem,
  Section as SectionLib,
  Heading as HeadingLib,
} from 'coffee-time-components'

const Summary = (props) => {
  return <SummaryLib className="not-prose" {...props} />
}

const List = (props) => {
  return <ListLib className="not-prose" {...props} />
}

const Section = (props) => {
  return <SectionLib className="not-prose" {...props} />
}

const Heading = (props) => {
  return <HeadingLib className="not-prose" {...props} />
}

export { Details, Content, Summary, List, ListItem, Section, Heading }
