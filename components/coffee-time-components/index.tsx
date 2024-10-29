'use client'

import {
  Details,
  Summary as SummaryLib,
  Content,
  List as ListLib,
  ListItem,
} from 'coffee-time-components'

const Summary = (props) => {
  return <SummaryLib className="not-prose" {...props} />
}

const List = (props) => {
  return <ListLib className="not-prose" {...props} />
}

export { Details, Content, Summary, List, ListItem }
