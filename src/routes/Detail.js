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
  Message,
  Segment
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown/with-html";
import config from "../config";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: {},
      isLoading: true,
      bot: {}
    };
  }

  getData = async id => {
    await fetch(config.api + "/bots/get/" + id, {
      method: "GET",
      headers: {
        token: localStorage.token,
        id: localStorage.id,
        time: localStorage.date
      }
    })
      .then(r => r.json())
      .then(bot =>
        this.setState({
          bot: bot.code === 200 ? bot.data : false,
          isLoading: false,
          error: bot.code === 200 ? { code: 200 } : bot
        })
      );
  };

  voteAction = async () => {
    const res = await fetch(
      config.api + "/bots/vote/" + this.props.match.params.id,
      {
        method: "POST",
        headers: {
          token: localStorage.token,
          id: localStorage.id,
          time: localStorage.date
        }
      }
    ).then(r => r.json());
    if (res.code !== 200) return (window.location.href = "/login");
    else {
      this.state.bot.votes = res.count
      this.state.bot.voted = res.state
      this.setState({ bot: this.state.bot })
    }
  };

  componentDidMount(props) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.getData(id);
  }
  render() {
    const { bot, isLoading } = this.state;
    console.log(this.state.bot);
    return (
      <Container>
        <br />

        {isLoading ? (
          <div className="loader">
            <span>Loading...</span>
          </div>
        ) : this.state.error.code === 200 ? (
          <>
            {bot.url === "private" ? (
              <Message>
                해당 봇은 특수목적 봇이므로 초대하실 수 없습니다.
              </Message>
            ) : bot.url === "archived" ? (
              <Message error>
                해당 봇은 서비스 중이지 않습니다.
                <br />
                일부 행동이 제한될 수 있습니다.
              </Message>
            ) : (
              <></>
            )}
            <Grid stackable divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    centered
                    floated
                    src={
                      bot.avatar !== false
                        ? "https://cdn.discordapp.com/avatars/" +
                          bot.id +
                          "/" +
                          bot.avatar +
                          ".webp?size=1024"
                        : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                            5}.png?size=1024`
                    }
                    size="medium"
                    rounded
                  />
                </Grid.Column>
                <Grid.Column>
                  <br />
                  <h1 style={{ fontSize: "50px" }}>
                    {bot.name}{" "}
                    </h1>
                    {bot.verified ? (
                      <Label className="discord">
                        <Icon className="icon check" /> 디스코드 인증됨
                      </Label>
                    ) : (
                      ""
                    )}
                    {bot.trusted ? (
                      <Label className="green">
                        <Icon className="icon check" /> 신뢰함
                      </Label>
                    ) : (
                      ""
                    )}
                  <br/><br/>
                  <Label>
                    상태
                    <Label.Detail>
                      <Icon
                        className="circle"
                        color={status[bot.status]}
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
                      className="yellow"
                      content="초대하기"
                      labelPosition="left"
                      icon="plus"
                      href={`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`}
                    ></Button>
                  ) : (
                    <Button
                      disabled={bot.url === "private" || bot.url === "disabled"}
                      className="yellow"
                      content="초대하기"
                      labelPosition="left"
                      icon="plus"
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

              <Grid.Row columns={2}>
                <Grid.Column>
                  <Button
                    className="discord"
                    content={bot.servers === 0 ? "N/A" : bot.servers + " 서버"}
                  ></Button>
                  {bot.url === "archived" ? (
                    <Button
                      basic={bot.voted === 1 ? false : true}
                      color="red"
                      content={bot.voted === 1 ? "하트 삭제" : "하트 추가"}
                      icon="heart"
                      disabled
                      label={{
                        basic: true,
                        color: "red",
                        pointing: "left",
                        content: bot.votes
                          .toString()
                          .split("...")
                          .join(",")
                      }}
                    />
                  ) : (
                    <Button
                      basic={bot.voted === 1 ? false : true}
                      color="red"
                      content={bot.voted === 1 ? "하트 삭제" : "하트 추가"}
                      icon="heart"
                      onClick={this.voteAction}
                      label={{
                        basic: true,
                        color: "red",
                        pointing: "left",
                        content: bot.votes
                          .toString()
                          .split("...")
                          .join(",")
                      }}
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
          </>
        ) : (
          <div className="loader">
            <p>{this.state.error.message}</p>
          </div>
        )}

        <Divider section />
        <Segment style={{ wordWrap: "break-word"}}>
          <ReactMarkdown source={bot.desc} />
        </Segment>
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
  streaming: "purple"
};

const statusText = {
  online: "온라인",
  idle: "자리 비움",
  dnd: "다른 용무중",
  offline: "오프라인",
  streaming: "방송중"
};
