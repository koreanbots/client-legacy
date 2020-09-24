import React from 'react'
import { Link } from 'react-router-dom'

import { Segment, Container, Grid, Icon, List } from 'semantic-ui-react'
function Footer(props) {

  return (
    <Segment
      inverted
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        minHeight: '20rem',
        maxHeight: '34rem',
        borderRadius: 0
      }}
    >
      <Container>
        <Grid stackable padded="vertically" className="footer">
          <Grid.Column width={7}>
           <div>
            <h1>국내봇을 한 곳에서.</h1>
              <p>
              2020 Koreanbots, All rights reserved.
              </p>
              <p>
              <a href="/discord">
                  <Icon className="discord large" style={{ color: 'white', background: 'inhert' }} />
                </a>
                <a href="https://github.com/koreanbots">
                  <Icon className="github large" style={{ color: 'white' }} />
                </a>
                <a href="mailto:wonderlandpark@callisto.team">
                  <Icon className="mail large" style={{ color: 'white' }} />
                </a>
              </p>
            </div>
             
          </Grid.Column>
          <Grid.Column width={3}>
            <h4>한국 디스코드봇 리스트</h4>
            <List>
            <List.Item as={Link} to="/about">소개</List.Item>
            <List.Item as={Link} to="/api">API</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={2}>
            <h4>커뮤니티</h4>
            <List>
              <List.Item as={Link} to="/partners">파트너</List.Item>
              <List.Item as={Link} to="/verification">인증</List.Item>
              <List.Item as={Link} to="/boost">부스트</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={2}>
            <h4>약관</h4>
            <List>
              <List.Item as={Link} to="/privacy">개인정보취급방침</List.Item>
              <List.Item as={Link} to="/guidelines">가이드라인</List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  )
}

export default Footer
