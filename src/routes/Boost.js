import React from 'react';
import { Container, Card, Icon } from 'semantic-ui-react';

function Boost() {
  return (
    <Container textAlign="center">
      <h1>부스터</h1>
      <h3>디스코드 서버를 부스트 해주신 멋진 분들에게 드리는 혜택이에요!</h3>
      <Card.Group itemsPerRow={3} stackable>
        <Card>
          <Card.Content>
            <Card.Header>
              <Icon className="paint"/> 커스텀..커스텀..커스텀!
            </Card.Header>
            미리보기 배경부터, 봇 상세정보 페이지 배경 그리고 봇의 특별 URL까지! 완벽하게 커스텀커스텀커스텀해보세요!
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>
              멋진 뱃지
            </Card.Header>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>
              디스코드 서버 혜택
            </Card.Header>
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  );
}

export default Boost;
