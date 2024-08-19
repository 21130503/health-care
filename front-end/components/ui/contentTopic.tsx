import React from 'react'
interface Props {
    idTopic: number
}
const ContentTopic = ({idTopic}: Props) => {
  return (
    <div>{idTopic}</div>
  )
}

export default ContentTopic