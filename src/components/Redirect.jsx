import React from 'react'
import { Container } from 'semantic-ui-react'

const Redirecting = props => {
  if (!props.to) throw new Error('No Link')
  window.location.assign(props.to)
  return (
    <>
      {
        props.content !== undefined ? props.content
         : (
          <Container>
            <div className="loader">
              <a href={props.to}>자동으로 리다이렉트되지 않는다면 클릭하세요</a>
            </div>
          </Container>
        )
      }
    </>
  )
}

export default Redirecting
