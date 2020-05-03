  import React from "react";
import fetch from "node-fetch";
import {
  Image,
  Grid,
  Container,
  Label,
  Divider,
  Button,
  Icon,
  Message
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown/with-html";
import config from "../config";
import Redirect from "../components/Redirect";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      bot: {}
    };
  }

  getData = async (id, date) => {
    await fetch(config.api + "/bots/pending/" + id + "/" + date)
      .then(r => r.json())
      .then(bot =>
        this.setState({
          bot: bot.code === 200 ? bot.data : false,
          isLoading: false
        })
      );
  };

  componentDidMount(props) {
    const {
      match: {
        params: { id, date }
      }
    } = this.props;
    this.getData(id, date);
  }
  render() {
    const { bot, isLoading } = this.state;
    function Success() {
      return (
        <Message success>
          {" "}
          해당 봇은 이미 승인되었습니다! 봇 페이지로 리다이랙트합니다.
        </Message>
      );
    }
    return (
      <Container>
        <br />

        {isLoading ? (
          <div className="loader">
            <span>Loading...</span>
          </div>
        ) : bot ? (
          <>
            {bot.state === 0 ? (
              <Message info>해당 봇은 아직 승인 대기 상태입니다.</Message>
            ) : bot.state === 1 ? (
              <>
                <Redirect to={"/bots/" + bot.id} content={<Success />} />
              </>
            ) : bot.state === 2 ? (
              <Message error>해당 봇은 승인 거부 되었습니다.</Message>
            ) : (
              <></>
            )}
            <Grid stackable divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    src={`https://cdn.discordapp.com/embed/avatars/${(bot.tag ===
                    "????"
                      ? 5555
                      : bot.tag) % 5}.png?size=1024`}
                    size="medium"
                    rounded
                  />
                </Grid.Column>
                <Grid.Column>
                  <br />
                  <h1 style={{ fontSize: "50px" }}>
                    {bot.name}{" "}
                    {bot.trusted ? (
                      <Label className="discord">
                        <Icon className="icon mini check" /> 디스코드 인증됨
                      </Label>
                    ) : (
                      ""
                    )}
                    {bot.verified ? (
                      <Label className="green">
                        <Icon className="icon mini check" /> 신뢰함
                      </Label>
                    ) : (
                      ""
                    )}
                  </h1>
                  <Label>
                    상태
                    <Label.Detail>
                      <Icon
                        className="circle"
                        color={status[bot.status]}
                        empty
                        key="status"
                      />{" "}
                      {statusText[bot.status]}
                    </Label.Detail>
                  </Label>

                  <Label>
                    접두사
                    <Label.Detail>{bot.prefix}</Label.Detail>
                  </Label>
                  <Label>
                    라이브러리
                    <Label.Detail>{bot.lib}</Label.Detail>
                  </Label>
                  <br />
                  <p style={{ marginTop: "10px", fontSize: "20px" }}>
                    {bot.intro}
                  </p>
                  <br />
                  <Label.Group tag>
                    카테고리 : <br />
                    {bot.category.length === 0
                      ? " 지정되지 않음"
                      : bot.category.map(c => (
                          <Label as="a" key={c}>
                            {c}
                          </Label>
                        ))}
                  </Label.Group>
                  <br />
                  {bot.url === false ? (
                    <Button
                      className="discord"
                      content="초대하기"
                      labelPosition="left"
                      icon="plus"
                      href={`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`}
                    ></Button>
                  ) : (
                    <Button
                      className="discord"
                      content="초대하기"
                      labelPosition="left"
                      icon="discord"
                      href={bot.url}
                    ></Button>
                  )}
                  {bot.web === false ? (
                    ""
                  ) : (
                    <Button
                      color="blue"
                      content="웹사이트"
                      labelPosition="left"
                      icon="globe"
                      href={bot.web}
                    ></Button>
                  )}
                  {bot.discord === false ? (
                    ""
                  ) : (
                    <Button
                      className="discord"
                      content="지원 디스코드"
                      labelPosition="left"
                      icon="discord"
                      href={"https://discord.gg/" + bot.discord}
                    ></Button>
                  )}
                  {bot.git === false ? (
                    ""
                  ) : (
                    <Button
                      color="black"
                      content="Git"
                      labelPosition="left"
                      icon="git"
                      href={bot.git}
                    ></Button>
                  )}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={5}>
                <Grid.Column>
                  <Button
                    className="discord"
                    content={bot.servers === 0 ? "N/A" : bot.servers + " 서버"}
                  ></Button>
                  <Button
                    content={bot.votes}
                    color="red"
                    icon="heart"
                    labelPosition="right"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>
        ) : (
          <div className="loader">
            <h1>심사 데이터가 삭제되었거나 존재하지 않습니다.</h1>
          </div>
        )}
        <div>
          제작/개발:{" "}
          {(bot.owners || []).map(o =>
            o.avatar !== false ? (
              <>
                <Image
                  src={
                    "https://cdn.discordapp.com/avatars/" +
                    o.id +
                    "/" +
                    o.avatar +
                    ".webp"
                  }
                  avatar
                />
                <span>
                  {" "}
                  {o.username}#{o.tag}
                </span>
              </>
            ) : (
              <>
                <Image
                  src={`https://cdn.discordapp.com/embed/avatars/${o.tag %
                    5}.png`}
                  avatar
                />
                <span>
                  {" "}
                  {o.username}#{o.tag}
                </span>
              </>
            )
          )}
        </div>

        <Divider section />
        <ReactMarkdown style={{ wordWrap: "break-word" }} source={bot.desc} />
      </Container>
    );
  }
}

export default Detail;

const status = {
  online: "green",
  idle: "yellow",
  dnd: "red",
  offline: "gray",
  streaming: "purple",
  black: "알 수 없음"
};

const statusText = {
  online: "온라인",
  idle: "자리 비움",
  dnd: "다른 용무중",
  offline: "오프라인",
  streaming: "방송중",
  "???": "알 수 없음"
};
