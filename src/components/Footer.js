import React from 'react'

import { Segment, Container, Grid, Icon, List, Button } from 'semantic-ui-react'
function Footer(props) {
  function toggleDarkmode() {
    props.setDark(!props.Dark)
    localStorage.dark = !props.Dark
  }
  return (
    <Segment
      className="footer"
      inverted
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '27rem',
        borderRadius: 0
      }}
    >
      <Container>
        <Grid columns={2} stackable>
          <Grid.Column>
            <h1>KOREANBOTS</h1>
            <p>
              <Icon className="copyright" /> 2020 Koreanbots, All rights reserved.
            </p>
            <p>
              이 사이트는 <Icon className="blue react" />로 제작된{' '}
              <Icon className="red heart" /> 프로젝트입니다.
            </p>
          </Grid.Column>
          <Grid.Column>
            <h2>링크</h2>
            <List>
              <List.Item href="/discord">공식 디스코드 서버</List.Item>
              <List.Item href="/guidelines">가이드라인</List.Item>
              <List.Item href="/privacy">개인정보취급방침</List.Item>
            </List>
            <a href="https://github.com/koreanbots">
              <Icon className="github" style={{ color: 'white' }} />
            </a>
            <a href="mailto:wonderlandpark@callisto.team">
              <Icon className="mail" style={{ color: 'white' }} />
            </a>
            <br />
            <Button onClick={toggleDarkmode}>
              {props.Dark ? (
                <>
                  <Icon className="sun" /> 화이트모드 켜기
                </>
              ) : (
                <>
                  <Icon className="moon" /> 다크모드 켜기 (추천)
                </>
              )}
            </Button>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  )
}

export default Footer
