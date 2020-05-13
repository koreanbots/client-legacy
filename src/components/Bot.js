import React, { useState } from 'react';
import {
  Card,
  Button,
  Item,
  Icon,
  Label,
  Divider,
  Segment
} from 'semantic-ui-react';

function Bot({
  data,
  id,
  name,
  avatar,
  votes,
  servers,
  intro,
  category,
  invite,
  state,
  count,
  trusted,
  verified,
  vanity,
  boosted,
  bg,
  status,
  banner
}) {
  const [lookHover, setLookHover] = useState(false);
  const [inviteHover, setinviteHover] = useState(false);
  return (
    <>
      <Card
        className="botcard"
        style={
          banner && boosted
            ? {
                background: `url(${banner}) 2% 2% / cover`,
                backgroundBlendMode: 'overlay'
              }
            : {}
        }
      >
        <Card.Content className="botimg">
          <Card.Header>
            {' '}
            <Item.Image floated="left" src={avatar} wrapped ui={false} />
            {count === undefined ? (
              ''
            ) : (
              <Segment floated="right">{count + 1 + '위'}</Segment>
            )}
          </Card.Header>

          <Card.Description>
            <br />

            <h1>
              <Label style={{ background: 'transparent' }}>
                <Icon
                  className="circle"
                  color={statusColor[status]}
                  key="status"
                />{' '}
                {statusText[status]}
              </Label>
              <br />
              {name}{' '}
              {verified ? (
                <Icon
                  size="small"
                  className="check"
                  style={{ color: '#7289da' }}
                />
              ) : (
                ''
              )}
              {trusted ? (
                <Icon size="small" color="green" className="certificate" />
              ) : (
                ''
              )}
              <br />
            </h1>
            <Label color="red">
              <Icon className="heart" /> {votes}
            </Label>
            <Label className="discord">{servers} 서버</Label>
            <br />
            <br />
            {intro}
          </Card.Description>
          <br />
        </Card.Content>
        <Card.Content extra>
          {category.slice(0, 5).map(c => (
            <a style={{ color: '#7289DA' }} href={'/categories/' + c}>
              #{c}{' '}
            </a>
          ))}
          <span style={{ color: 'white' }}>
            {' '}
            {category.length - 5 > 0 ? ` +${category.length - 5}` : ''}
          </span>
          <Divider />
          <div className="ui two buttons">
            <Button
              basic={!lookHover}
              href={'/bots/' + (vanity && boosted ? vanity : id)}
              color="blue"
              onMouseOver={() => setLookHover(true)}
              onMouseOut={() => setLookHover(false)}
            >
              보기
            </Button>
            <Button
              disabled={state === 'private' || state === 'archived'}
              href={invite}
              basic={!inviteHover}
              color="green"
              onMouseOver={() => setinviteHover(true)}
              onMouseOut={() => setinviteHover(false)}
            >
              초대하기
            </Button>
          </div>
        </Card.Content>
      </Card>
    </>
  );
}

export default Bot;

const statusColor = {
  online: 'green',
  idle: 'yellow',
  dnd: 'red',
  offline: false,
  streaming: 'purple'
};

const statusText = {
  online: '온라인',
  idle: '자리 비움',
  dnd: '다른 용무중',
  offline: '오프라인',
  streaming: '방송중',
  '???': '알 수 없음'
};
