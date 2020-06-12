import React, { useState } from 'react';
import fetch from 'node-fetch';
import {
  Container,
  Item,
  Button,
  Icon,
  Card,
  Divider
} from 'semantic-ui-react';

import Redirect from '../components/Redirect';
import config from '../config';
import Bot from '../components/Bot';
import { Helmet } from 'react-helmet';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: { code: 401 },
      isLoading: true
    };
  }

  getProfile = async () => {
    const token = localStorage.token,
      id = localStorage.id,
      date = localStorage.date;
    const res = await fetch(config.api + '/users/@me/profile', {
      method: 'GET',
      headers: { token, id, time: date }
    }).then(r => r.json());

    this.setState({ result: res, isLoading: false });
  };
  componentDidMount() {
    this.getProfile();
  }
  render() {
    if (!localStorage.userCache || !JSON.parse(localStorage.userCache))
      return (
        <div className="loader">
          <h1>로그인 해주세요!</h1>
        </div>
      );
    const { result } = this.state;
    return (
      <Container>
        <Helmet>
        <title>프로필 - 한국 디스코드봇 리스트</title>
        <meta name="description" content="전반적인 본인의 프로필입니다!!" />
        </Helmet>
        {this.state.isLoading ? (
          <div className="loader">
            <span>Loading...</span>
          </div>
        ) : result.code !== 200 ? (
          result.code === 401 ? (
            <Redirect to={"/logout/" + JSON.parse(localStorage.userCache).id} content={<></>} />
          ) : (
            <div className="loader">
              <span>{result.message}</span>
            </div>
          )
        ) : (
          <div>
            <br />
            <h1>프로필</h1>
            <Button href="/addbot" content="봇 추가하기" icon="plus" />
            <h2>나의 봇</h2>
            {result.user.bots.length === 0 ? (
              <h3>승인된 봇이 없습니다.</h3>
            ) : (
              <>
                <Card.Group stackable itemsPerRow={3}>
                  {result.user.bots.map(bot => (
                    <MyBots bot={bot} />
                  ))}
                </Card.Group>
                <br />
              </>
            )}
            <Divider />
            <h2>심사 이력</h2>
            {result.user.submitted.length === 0 ? (
              <h3>심사 이력이 없습니다.</h3>
            ) : (
              <Card.Group stackable itemsPerRow={3}>
                {result.user.submitted.map(bot => (
                  <Submitted bot={bot} />
                ))}
              </Card.Group>
            )}
            <Divider />
            <h2>하트를 남긴 봇</h2>
            {result.user.voted.length === 0 ? (
              <h3>하트를 남긴 봇이 없습니다.</h3>
            ) : (
              <Card.Group stackable itemsPerRow={3}>
                {result.user.voted.map(bot => (
                  <Bot
                    key={bot.id}
                    id={bot.id}
                    name={bot.name}
                    avatar={
                      bot.avatar !== false
                        ? 'https://cdn.discordapp.com/avatars/' +
                          bot.id +
                          '/' +
                          bot.avatar +
                          '.png'
                        : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                            5}.png`
                    }
                    votes={bot.votes}
                    servers={bot.servers}
                    category={bot.category}
                    intro={bot.intro}
                    desc={bot.desc}
                    invite={
                      bot.url === false
                        ? `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`
                        : bot.url
                    }
                    state={bot.state}
                    vanity={bot.vanity}
                    boosted={bot.boosted}
                    status={bot.status}
                    bg={bot.bg}
                    banner={bot.banner}
                    verified={bot.verified}
                    trusted={bot.trusted}
                  />
                ))}
              </Card.Group>
            )}
          </div>
        )}
        <br />
      </Container>
    );
  }
}

export default Detail;

const stateColor = ['gray', 'green', 'red'];
const state = ['심사중', '승인됨', '거부됨'];

function MyBots(props) {
  const [see, hoverSee] = useState(false);
  const [manage, hoverManage] = useState(false);
  const { bot } = props;
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {' '}
          <Item.Image
            floated="right"
            src={
              bot.avatar !== false
                ? 'https://cdn.discordapp.com/avatars/' +
                  bot.id +
                  '/' +
                  bot.avatar +
                  '.png'
                : `https://cdn.discordapp.com/embed/avatars/${bot.tag % 5}.png`
            }
            wrapped
            ui={false}
            avatar
          />
          {bot.name}
        </Card.Header>
        <Card.Meta>
          <a style={{ color: '#7289DA' }}>{bot.servers} 서버</a> |{' '}
          <a style={{ color: 'red' }}>
            {bot.votes} <Icon className="heart" />
          </a>
        </Card.Meta>
        <Card.Description>{bot.intro}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            href={'/bots/' + ((bot.vanity && bot.boosted) || (bot.vanity && bot.trusted) ? bot.vanity : bot.id)}
            basic={!see}
            color="blue"
            onMouseOver={() => hoverSee(true)}
            onMouseOut={() => hoverSee(false)}
          >
            보기
          </Button>
          <Button
            href={'/manage/' + bot.id}
            basic={!manage}
            color="green"
            onMouseOver={() => hoverManage(true)}
            onMouseOut={() => hoverManage(false)}
          >
            관리하기
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

function Submitted(props) {
  const [preview, hoverPrev] = useState(false);
  const { bot } = props;
  return (
    <Card href={bot.state === 1 ? "/bots/" + bot.id : "/pendingBots/" + bot.id + "/" + bot.date}>
      <Card.Content>
        <Card.Header>
          <a>{bot.id}</a>
        </Card.Header>
        <Card.Meta>
          상태:{' '}
          <a style={{ color: stateColor[bot.state] }}>{state[bot.state]}</a>
        </Card.Meta>
        <Card.Description>
          설명:
          {bot.intro}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic={!preview}
            color="blue"
            onMouseOver={() => hoverPrev(true)}
            onMouseOut={() => hoverPrev(false)}
          >
            {bot.state === 1 ? "이동하기" : "미리보기"}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
