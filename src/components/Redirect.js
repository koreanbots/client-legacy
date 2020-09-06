import React from 'react'
import { Container } from 'semantic-ui-react'

const Redirecting = props => {
  if (!props.to) throw new Error('No Link')
  window.location.assign(props.to)
  if (props.content) return <props.content />
  return (
    <Container>
      <a href={props.to}>자동으로 리다이렉트되지 않는다면 클릭하세요</a>
    </Container>
  )
}

export default Redirecting
