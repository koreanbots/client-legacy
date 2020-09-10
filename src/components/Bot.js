import React, { useState } from 'react'
import {
  Card,
  Button,
  Item,
  Icon,
  Label,
  Divider,
  Segment
} from 'semantic-ui-react'

function Bot({
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
  const [lookHover, setLookHover] = useState(false)
  const [inviteHover, setinviteHover] = useState(false)
  return (
    <>
      <Card
        className={`botcard ${
          (banner && boosted) || (banner && trusted) ? 'bg' : ''
        }`}
        style={
          (banner && boosted) || (banner && trusted)
            ? {
                background: `linear-gradient(to right, rgba(34, 36, 38, 0.68), rgba(34, 36, 38, 0.68)), url(${banner}) top/cover no-repeat`
              }
            : {}
        }
      >
        <Card.Content className="botimg">
          <Card.Header>
            {' '}
            <Item.Image
              floated="left"
              src={avatar}
              wrapped
              ui={false}
              size="small"
              width="128"
            />
            {count === undefined ? (
              ''
            ) : (
              <Segment
                floated="right"
                style={
                  count === 0
                    ? { background: 'gold', color: 'black' }
                    : count === 1
                    ? { background: '#c7c7d0', color: 'black' }
                    : count === 2
                    ? { background: '#af602e', color: 'white' }
                    : {}
                }
              >
                {count + 1 + '위'}
              </Segment>
            )}
          </Card.Header>

          <Card.Description>
            <br />

            <h1>
              <Label className="status" style={{ background: 'transparent' }}>
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
                  style={{ color: '#7289da !important' }}
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
              <Icon className="heart" /> {formatNum(votes)}
            </Label>
            <Label className="discord">{formatNum(servers)} 서버</Label>
            <br />
            <br />
            {intro}
          </Card.Description>
          <br />
        </Card.Content>
        <Card.Content extra>
          {category.slice(0, 5).map(c => (
            <a style={{ color: '#7289DA' }} href={'/categories/' + c} key={c}>
              #{c}{' '}
            </a>
          ))}
          <span>
            {' '}
            {category.length - 5 > 0 ? ` +${category.length - 5}` : ''}
          </span>
          <Divider />
          <div className="ui two buttons">
            <Button
              disabled={state === 'example'}
              basic={!lookHover}
              href={
                '/bots/' +
                ((vanity && boosted) || (vanity && trusted) ? vanity : id)
              }
              color="blue"
              onMouseOver={() => setLookHover(true)}
              onMouseOut={() => setLookHover(false)}
            >
              보기
            </Button>
            <Button
              disabled={
                state === 'private' ||
                state === 'archived' ||
                state === 'example'
              }
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
  )
}

export default Bot

const statusColor = {
  online: 'green',
  idle: 'yellow',
  dnd: 'red',
  offline: 'grey',
  streaming: 'purple'
}

const statusText = {
  online: '온라인',
  idle: '자리 비움',
  dnd: '다른 용무중',
  offline: '오프라인',
  streaming: '방송중',
  null: '알 수 없음'
}


function formatNum (value) {
  var suffixes = ["", "K", "M", "B","T"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
  }
  return shortValue+suffixes[suffixNum];
}