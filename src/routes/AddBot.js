import React, { Component } from "react";
import {
  Form,
  Container,
  Message,
  TextArea,
  Segment,
  Label,
  Divider,
  Dropdown,
  Input
} from "semantic-ui-react";
import Redirect from "../components/Redirect";
import ReactMarkdown from "react-markdown/with-html";
import fetch from "node-fetch";
import config from "../config";

class SubmitBot extends Component {
  state = {
    id: "",
    lib: "",
    prefix: "",
    intro: "",
    desc: "",
    category: [],
    website: "",
    git: "",
    url: "",
    discord: "",
    data: { state: 0, data: {} }
  };

  sendSumbit = async body => {
    const token = localStorage.token,
      id = localStorage.id,
      date = localStorage.date;
    return await fetch(config.api + "/bots/submit", {
      method: "POST",
      headers: { token, id, time: date, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(res => {
        if (res.code === 200) this.setState({ data: { state: 1 } });
        else this.setState({ data: { state: 2, data: res } });
      });
  };

  handleChange = (e, { name, value }) => {
    if (name === "desc")
      this.setState({
        desc: value.replace(/</gi, "&lt").replace(/>/gi, "&gt")
      });
    this.setState({ [name]: value });
    if (name === "intro" && value.length > 120)
      this.setState({ desc: value.slice(0, 120) });
    else if (name === "desc" && value.length > 1000)
      this.setState({ desc: value.slice(0, 1000) });
  };
  handleCategory = e => {
    this.setState({ category: e.value });
  };

  handleSubmit = async () => {
    if (
      this.state.id &&
      this.state.lib &&
      this.state.intro &&
      this.state.desc &&
      this.state.category &&
      this.state.category.length > 0
    ) {
      await this.sendSumbit(this.state);
    } else {
      this.setState({
        data: {
          state: 2,
          data: { message: "필수 입력칸을 전부 작성해주세요!" }
        }
      });
    }
  };

  render() {
    const {
      id,
      prefix,
      lib,
      intro,
      desc,
      website,
      git,
      url,
      discord
    } = this.state;
    if (!localStorage.userCache || !JSON.parse(localStorage.userCache))
      return (
        <div className="loader">
          <h1>로그인 해주세요!</h1>
        </div>
      );
    else
      return (
        <Container>
          <br />
          <h1>새로운 봇 추가하기</h1>
          <Message error>
            <Message.Header>
              신청하시기 전에 다음 사항을 확인해주세요!!
            </Message.Header>
            <Message.Content>
              <li>
                <a href="/discord">디스코드</a>에 참가하셨나요?
              </li>
              <li>
                봇이 <a href="/guidelines">가이드라인</a>을 지키고 있나요?
              </li>
              <li>
                본인이 봇의 소유자라는 것을 증명할 수 있나요? 본인이 봇
                소유자임을 증명하려면, 태그가 포함되어야합니다. <br />
                다음 명령어(접두사로 시작하는) 중 하나 이상에 소유자를
                표시하셔야합니다.
                <ol>- 도움 명령어: 도움, 도움말, 명령어, help, commands</ol>
                <ol>
                  - 도움 명령어에 소유자임을 나타내고 싶지 않으시다면, 아래
                  명령어를 만들어주세요
                  <br />
                  명령어: [접두사]hellothisisverification 응답:
                  유저#태그(아이디)
                </ol>
              </li>
            </Message.Content>
          </Message>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                placeholder="387548561816027138"
                label={"봇 ID (*)"}
                description="GG"
                name="id"
                value={id}
                maxLength={18}
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder="."
                label="접두사 (Prefix) (*)"
                name="prefix"
                value={prefix}
                maxLength={32}
                onChange={this.handleChange}
              />
              <Form.Select
                placeholder="discord.js"
                label="라이브러리 (Library) (*)"
                name="lib"
                value={lib}
                onChange={this.handleChange}
                options={[
                  { text: "discord.js", value: "discord.js" },
                  { text: "Eris", value: "Eris" },
                  { text: "discord.py", value: "discord.py" },
                  { text: "discordcr", value: "discordcr" },
                  { text: "Nyxx", value: "Nyxx" },
                  { text: "Discord.Net", value: "Discord.Net" },
                  { text: "DSharpPlus", value: "DSharpPlus" },
                  { text: "Nostrum", value: "Nostrum" },
                  { text: "coxir", value: "coxir" },
                  { text: "DiscordGo", value: "DiscordGo" },
                  { text: "Discord4J", value: "Discord4J" },
                  { text: "Javacord", value: "Javacord" },
                  { text: "JDA", value: "JDA" },
                  { text: "Discordia", value: "Discordia" },
                  { text: "RestCord", value: "RestCord" },
                  { text: "Yasmin", value: "Yasmin" },
                  { text: "disco", value: "disco" },
                  { text: "discordrb", value: "discordrb" },
                  { text: "serenity", value: "serenity" },
                  { text: "SwiftDiscord", value: "SwiftDiscord" },
                  { text: "Sword", value: "Sword" },
                  { text: "기타", value: "기타" },
                  { text: "비공개", value: "비공개" }
                ]}
              />
            </Form.Group>
            <Form.Input
              placeholder="https://wonderbot.xyz"
              label="웹사이트"
              name="website"
              value={website}
              type="url"
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="https://github.com/wonderlandpark/wonderbot"
              label="깃"
              name="git"
              value={git}
              type="url"
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="비워두시면 자동으로 생성합니다."
              label="초대 링크"
              name="url"
              value={url}
              type="url"
              onChange={this.handleChange}
            />
            <div className="field">
              <label>지원 디스코드 서버</label>
            </div>
            <Input
              style={{width: '70%'}}
              labelPosition="right"
              placeholder="JEh53MQ"
              name="discord"
              value={discord}
              onChange={this.handleChange}
              maxLength={8}
            >
              <Label basic >discord.gg/</Label>
              <input />
            </Input>

            <div className="field">
              <br />
              <label>카테고리 (*)</label>
              <Dropdown
                name="category"
                placeholder="해당하는 카테고리들을 선택해주세요!!"
                fluid
                multiple
                selection
                options={options}
                onChange={this.handleChange}
              />
            </div>
            <Form.Input
              placeholder="봇을 설명할 수 있는 간단한 설명을 적어주세요! (최대 60자)"
              width={16}
              label="봇 소개 (*)"
              name="intro"
              value={intro}
              onChange={this.handleChange}
              maxLength={60}
            />
            <div className="field">
              <label>봇 설명 (*)</label>
              <TextArea
                name="desc"
                value={desc}
                onChange={this.handleChange}
                placeholder="봇을 자세하게 설명해주세요! 마크다운을 지원합니다. (최대 1000자)"
                maxLength={1000}
              />
              <div className="field">
                <br />
                <Segment style={{ wordWrap: "break-word" }}>
                  <Label attached="top">설명 미리보기</Label>
                  <br />
                  <ReactMarkdown source={desc} escapeHtml={true} />
                  <br />
                  <Divider />
                  <p>다음 결과는 실제와 다를 수 있습니다.</p>
                </Segment>
              </div>

              <Form.Button content="제출" />
            </div>
          </Form>
          {this.state.data.state === 1 ? (
            <Redirect to="/?message=submitSuccess" />
          ) : this.state.data.state === 2 ? (
            <Message error>{this.state.data.data.message}</Message>
          ) : (
            <> </>
          )}
        </Container>
      );
  }
}

export default SubmitBot;

const options = [
  { text: "관리", value: "관리", key: "관리" },
  { text: "뮤직", value: "뮤직", key: "뮤직" },
  { text: "전적", value: "전적", key: "전적" },
  { text: "웹 대시보드", value: "웹 대시보드", key: "웹 대시보드" },
  { text: "로깅", value: "로깅", key: "로깅" },
  { text: "도박", value: "도박", key: "도박" },
  { text: "게임", value: "게임", key: "게임" },
  { text: "밈", value: "밈", key: "밈" },
  { text: "레벨링", value: "레벨링", key: "레벨링" },
  { text: "유틸리티", value: "유틸리티", key: "유틸리티" },
  { text: "번역", value: "번역", key: "번역" },
  { text: "대화", value: "대화", key: "대화" },
  { text: "NSFW", value: "NSFW", key: "NSFW" },
  { text: "검색", value: "검색", key: "검색" }
];
