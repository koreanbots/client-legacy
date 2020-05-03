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
  Input,
  Grid,
  Image,
  Button,
  Popup
} from "semantic-ui-react";
import Redirect from "../components/Redirect";
import ReactMarkdown from "react-markdown/with-html";
import fetch from "node-fetch";
import config from "../config";

class ManageBot extends Component {
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
    token: "",
    info: { code: 0 },
    data: { state: 0, data: {} }
  };

  sendSumbit = async body => {
    const token = localStorage.token,
      id = localStorage.id,
      date = localStorage.date;
    return await fetch(config.api + "/bots/edit/" + body.id, {
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
  showToken = () => {
      if(this.state.token.match(/^\*/)) this.setState({ token: this.state.info.data.token })
      else this.setState({ token: '******' })
  }
  regenToken = async() => {
      const res = await fetch(config.api + '/bots/regenToken', {
        method: 'POST',
        headers: {
            token: this.state.info.data.token
        }
      }).then(r=> r.json())
      console.log(res)
      return window.location.reload()
    }
  handleChange = (e, { name, value }) => {
    if (name === "desc")
      this.setState({
        desc: '******'
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

  archive = async () => {
    const token = localStorage.token,
    id = localStorage.id,
    date = localStorage.date;
  await fetch(config.api + "/bots/archive/" + this.state.info.data.id, {
    method: "POST",
    headers: { token, id, time: date, "Content-Type": "application/json" },
  })
    .then(r => r.json())
    .then(res=> {
      if(res.code === 200) {
        if(res.archived) window.location.href = "/?message=lockOn"
        else window.location.href = "/?message=lockOff"
      }
    })
  }

  async componentDidMount() {
      const res = await fetch(config.api + '/bots/completeInfo/' + this.props.match.params.id, {
          headers: {
              token: localStorage.token,
              id: localStorage.id,
              time: localStorage.date
          }
      }).then(r=> r.json())
      if(res.code !== 200 ) this.setState({ info: res })
      else this.setState({ info: res, id: res.data.id, prefix: res.data.prefix, lib: res.data.lib, website: res.data.web || '', git: res.data.git || '', url: res.data.url || '', discord: res.data.discord || '', category: res.data.category, intro: res.data.intro, desc: res.data.desc, token: '******' })

      console.log(this.state.info)
    }
  render() {
    const {
      id,
      prefix,
      lib,
      intro,
      desc,
      category,
      website,
      git,
      url,
      discord,
      info
    } = this.state;
    const bot = info.data
    if (!localStorage.userCache || !JSON.parse(localStorage.userCache))
      return (
        <div className="loader">
          <h1>로그인 해주세요!</h1>
        </div>
      );
    if(this.state.info.code !== 200) return (
        <div className="loader">
        <h1>{this.state.info.message}</h1>
      </div>
    )
    else
      return (
        <Container>
          <br />
          <h1>봇 관리하기</h1>
          <Grid stackable divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    centered
                    floated="left"
                    src={
                      bot.avatar !== false
                        ? "https://cdn.discordapp.com/avatars/" +
                          bot.id +
                          "/" +
                          bot.avatar +
                          ".png?size=1024"
                        : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                            5}.png??size=1024`
                    }
                    size="medium"
                    rounded
                  />
                </Grid.Column>
                <Grid.Column>
                <h1>{bot.name}</h1><br/>
                <h5>ID: {id}</h5>
                토큰: <pre>{this.state.token} </pre>
                <br/>
                <Button content={this.state.token.startsWith('*') ? "보이기" : "가리기  "} onClick={this.showToken}/> <Button content="복사하기" onClick={()=> {navigator.clipboard.writeText(this.state.info.data.token); alert('복사되었습니다!')}}/> <Button onClick={this.regenToken} content="재발급"/>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            
                    <br/>
          <Form onSubmit={this.handleSubmit} disabled>
            <Form.Group>
              <Form.Input
                placeholder="."
                label="접두사 (Prefix)"
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
              labelPosition="right"
              placeholder="JEh53MQ"
              name="discord"
              value={discord}
              onChange={this.handleChange}
              maxLength={8}
            >
              <Label basic>discord.gg/</Label>
              <input />
            </Input>

            <div className="field">
              <br />
              <label>카테고리 (*)</label>
              <Dropdown
                name="category"
                value={category}
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
              <Form.Button content="수정하기" />
            </div>
          </Form>
          {this.state.data.state === 1 ? (
            <Redirect to="/?message=editSuccess" />
          ) : this.state.data.state === 2 ? (
            <Message error>{this.state.data.data.message}</Message>
          ) : (
            <> </>
          )}
          <h2>위험구역</h2>
                <Segment>
                  <h3>봇을 잠금 처리합니다</h3>
                  <p>봇을 잠금처리하면 더 이상 초대할 수 없는 상태가 되면서, 잠금된 봇이라 안내됩니다.</p>
              <Button color='red' onClick={this.archive}>{this.state.info.data.state === 'archived' ? '잠금해제' : '잠금하기'}</Button>

              <h3>봇을 삭제합니다</h3>
                  <p>봇을 영구적으로 삭제합니다.</p>
 <br/>

              <Form.Field inline>

              <Popup content='해당 기능은 사용하실 수 없습니다. 관리자에게 문의해주세요' trigger={<Button color='red' content="삭제하기"/>} />

    </Form.Field>
              
               
                </Segment>
        </Container>
      );
  }
}

export default ManageBot;

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
