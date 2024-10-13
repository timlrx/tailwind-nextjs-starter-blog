import { Details, Summary as SummaryLib, Content } from 'coffee-time-components'

const Summary = (props) => {
  return <SummaryLib className="not-prose" {...props} />
}

export { Details, Content, Summary }
