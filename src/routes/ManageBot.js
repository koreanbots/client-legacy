import React, { Component } from 'react'
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
  Table,
  Modal
} from 'semantic-ui-react'
import Redirect from '../components/Redirect'
import ReactMarkdown from 'react-markdown/with-html'
import config from '../config'
import CodeBlock from '../components/Code'
import graphql from '../utils/graphql'

class ManageBot extends Component {
  state = {
    id: '',
    lib: '',
    prefix: '',
    intro: '',
    desc: '',
    category: [],
    website: '',
    git: '',
    url: '',
    discord: '',
    token: '',
    owners: '',
    ownersError: '',
    delete: '',
    info: { code: 0 },
    data: { state: 0, data: {} }
  }

  sendRequest = async data => {
    const res = await graphql(`mutation {
      bot(id: "${data.id}", category: ${JSON.stringify(data.category)}, lib: "${data.lib}", prefix: "${data.prefix.replace(/\n/g, '\\n').replace(/"/g, '\\"')}", intro: "${data.intro.replace(/\n/g, '\\n').replace(/"/g, '\\"')}", desc: "${data.desc.replace(/\n/g, '\\n').replace(/"/g, '\\"')}", web: ${data.web ? '"' + data.web.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"' :  null}, git: ${data.git ? '"' + data.git.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"' :  null}, url: ${data.url ? '"' + data.url.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"' :  null}, discord: "${data.discord.replace(/\\$/gi, '\\\\').replace(/"/g, '\\"')}") {
        id
        lib
        category,
        owners {
          id,
          username,
          tag
        }
      }
    }`)
    console.log(res)
        if (res.code === 200) this.setState({ data: { state: 1 } })
        else this.setState({ data: { state: 2, data: res } })
  }
  showToken = () => {
    if (this.state.token.match(/^\*/))
      this.setState({ token: this.state.token })
    else this.setState({ token: '******' })
  }
  regenToken = async () => {
    const re = await fetch(config.api + '/bots/regenToken', {
      method: 'POST',
      headers: {
        token: this.state.token
      }
    })
    const res = re.json()
    console.log(re.status)
    if (re.status !== 200) alert(res.message)
    else return window.location.reload()
  }
  handleChange = (e, { name, value }) => {
    if (name === 'desc')
      this.setState({
        desc: '******'
      })
    this.setState({ [name]: value })
    if (name === 'intro' && value.length > 120)
      this.setState({ desc: value.slice(0, 120) })
    else if (name === 'desc' && value.length > 1000)
      this.setState({ desc: value.slice(0, 1000) })
  }
  handleCategory = e => {
    this.setState({ category: e.value })
  }

  handleSubmit = async () => {
    if (
      this.state.lib &&
      this.state.intro &&
      this.state.desc &&
      this.state.category &&
      this.state.category.length > 0
    ) {
      if(this.state.desc.match(/!\[.*?\] *\(http:\/\/.*?.*?\)/)) return this.setState({ data: {
        state: 2,
        data: { message: '보안 연결(HTTPS)이 없는 컨텐츠는 사용하실 수 없습니다. (이미지)' }
      } })
      if((this.state.website && !validURL(this.state.website)) || (this.state.git && !validURL(this.state.git)) || (this.state.url && !validURL(this.state.url))) return this.setState({
        data: {
          state: 2,
          data: { message: 'URL형식이 올바르지 않습니다.' }
        }
      })
      await this.sendRequest(this.state)
    } else {
      this.setState({
        data: {
          state: 2,
          data: { message: '필수 입력칸을 전부 작성해주세요!' }
        }
      })
    }
  }

  archive = async () => {
    const res = await graphql(`mutation {
      bot(id: "${this.state.id}", state: ${this.state.state !== 'ok' ? 'ok' : 'archived'} ) {
        state
      }
    }`)

    if (res.code === 200) {
      if (res.data.bot.state === 'archived') window.location.href = '/?message=lockOn'
      else window.location.href = '/?message=lockOff'
    } else alert(res.message)
  }

  setOwner = async () => {
    const res = await graphql(`mutation {
      bot(id: "${this.state.id}", owners: ${JSON.stringify(this.state.owners.replace(/ /gi, '').split(','))}) {
        owners {
          id
        }
      }
    }`)
  
    if (res.code !== 200) this.setState({ ownersError: res.message })
    else window.location.reload()
  }

  removeBot = async() => {
    const token = localStorage.token,
    id = localStorage.id,
    date = localStorage.date
  await fetch(config.api + '/bots/' + this.state.id, {
    method: 'DELETE',
    headers: { token, id, time: date }
  })
    .then(r => r.json())
    .then(res => {
      if (res.code !== 200) alert(res.message)
      else window.location.href = '/?message=delete'
    })
  }

  getBot = async( id ) => {
    return await graphql(`query {
      bot(id: "${id}") {
        id
        lib
        prefix
        votes
        servers
        intro
        desc
        web
        git
        url
        category
        status
        name
        avatar
        tag
        verified
        trusted
        partnered
        discord
        boosted
        state
        vanity
        bg
        banner
        owners {
          id
        }
      }
      token(id: "${id}")
    }`)
  }
  async componentDidMount() {
    const res = await this.getBot(this.props.match.params.id)
    if (res.code !== 200) this.setState({ info: res })
    else
      this.setState({
        info: res,
        id: res.data.bot.id,
        prefix: res.data.bot.prefix,
        lib: res.data.bot.lib,
        website: res.data.bot.web || '',
        git: res.data.bot.git || '',
        url: res.data.bot.url || '',
        discord: res.data.bot.discord || '',
        category: res.data.bot.category,
        intro: res.data.bot.intro,
        desc: res.data.bot.desc,
        state: res.data.bot.state,
        owners: res.data.bot.owners.map(el=> el.id).toString(),
        token: '******'
      })
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
      owners,
      info
    } = this.state
    const bot = info.data
    if (this.state.info.code !== 200)
      return (
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
                    bot.bot.avatar
                      ? 'https://cdn.discordapp.com/avatars/' +
                        bot.bot.id +
                        '/' +
                        bot.bot.avatar +
                        '.png?size=1024'
                      : `https://cdn.discordapp.com/embed/avatars/${bot.bot.tag %
                          5}.png?size=1024`
                  }
                  onError={ (e)=> e.target.src="/img/default.png" }
                  size="medium"
                  rounded
                />
              </Grid.Column>
              <Grid.Column>
                <h1>{bot.bot.name}</h1>
                <br />
                <h5>ID: {id}</h5>
                토큰: <pre>{this.state.token} </pre>
                ※ 토큰은 1년마다 만료됩니다.
                <br />
                <Button
                  content={
                    this.state.token.startsWith('*') ? '보이기' : '가리기  '
                  }
                  onClick={this.showToken}
                />{' '}
                <Button
                  content="복사하기"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(this.state.token)
                      .then(alert('복사되었습니다!'))
                  }}
                />{' '}
                <Button onClick={this.regenToken} content="재발급" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <br />
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
                placeholder="봇 제작 라이브러리입니다."
                label="라이브러리 (Library) (*)"
                name="lib"
                value={lib}
                onChange={this.handleChange}
                options={[
                  { text: 'discord.js', value: 'discord.js' },
                  { text: 'Eris', value: 'Eris' },
                  { text: 'discord.py', value: 'discord.py' },
                  { text: 'discordcr', value: 'discordcr' },
                  { text: 'Nyxx', value: 'Nyxx' },
                  { text: 'Discord.Net', value: 'Discord.Net' },
                  { text: 'DSharpPlus', value: 'DSharpPlus' },
                  { text: 'Nostrum', value: 'Nostrum' },
                  { text: 'coxir', value: 'coxir' },
                  { text: 'DiscordGo', value: 'DiscordGo' },
                  { text: 'Discord4J', value: 'Discord4J' },
                  { text: 'Javacord', value: 'Javacord' },
                  { text: 'JDA', value: 'JDA' },
                  { text: 'Discordia', value: 'Discordia' },
                  { text: 'RestCord', value: 'RestCord' },
                  { text: 'Yasmin', value: 'Yasmin' },
                  { text: 'disco', value: 'disco' },
                  { text: 'discordrb', value: 'discordrb' },
                  { text: 'serenity', value: 'serenity' },
                  { text: 'SwiftDiscord', value: 'SwiftDiscord' },
                  { text: 'Sword', value: 'Sword' },
                  { text: '기타', value: '기타' },
                  { text: '비공개', value: '비공개' }
                ]}
              />
            </Form.Group>
            <Form.Input
              placeholder="https://koreanbots.dev"
              label="웹사이트"
              name="website"
              value={website}
              type="url"
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="https://github.com/koreanbots/client"
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
              maxLength={32}
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
                placeholder="봇을 자세하게 설명해주세요! 마크다운을 지원합니다. (최대 2000자)"
                maxLength={2000}
              />
              <div className="field">
                <br />
                <Segment style={{ wordWrap: 'break-word' }}>
                  <Label attached="top">설명 미리보기</Label>
                  <br />
                  <ReactMarkdown
                    source={desc}
                    escapeHtml={true}
                    renderers={{
                      table: Table,
                      thead: Table.Header,
                      tr: Table.Cell,
                      code: CodeBlock
                    }}
                  />
                  <br />
                  <Divider />
                  <p>다음 결과는 실제와 다를 수 있습니다.</p>
                </Segment>
              </div>
              <Form.Button content="저장하기" icon="save" />
            </div>
          </Form>
          {this.state.data.state === 1 ? (
            <Redirect to="/?message=editSuccess" content=""/>
          ) : this.state.data.state === 2 ? (
            <Message error>{this.state.data.data.message}</Message>
          ) : (
            <> </>
          )}
          <h2>위험구역</h2>
          <Segment>
            <h3>관리자 수정</h3>
            <p>
              관리자는 "관리자 수정"과 "봇 삭제" 이외의 모든 항목을 수정할 수
              있습니다.
              <br />
              관리자는 유저 아이디로 추가하며, 쉼표로 구분합니다.
              <br />
              모든 봇 제작자는 <a href="/discord">디스코드</a>에 참여를
              권장합니다. (소유권 이전은 디스코드로 문의해주세요.)
            </p>
            <Input
              value={owners}
              style={{ width: '100%' }}
              name="owners"
              onChange={this.handleChange}
            />
            <Button
              color="red"
              content="관리자 수정"
              icon="save"
              onClick={this.setOwner}
            />
            {this.state.ownersError ? (
              <Message error>{this.state.ownersError}</Message>
            ) : (
              <></>
            )}
            <h3>
              {this.state.state !== 'ok'
                ? '봇을 잠금 해제합니다.'
                : '봇을 잠금 처리합니다'}
            </h3>
            <p>
              {this.state.state !== 'ok'
                ? '봇을 잠금 해제하면, 봇을 다시 초대할 수 있습니다.'
                : '봇을 잠금처리하면 더 이상 초대할 수 없는 상태가 되면서, 일부 행동이 제한됩니다.'}
            </p>
            <Button
              icon="lock"
              color="red"
              onClick={this.archive}
              content={
                this.state.state !== 'ok'
                  ? '잠금해제'
                  : '잠금하기'
              }
            />

            <h3>봇을 삭제합니다</h3>
            <p>봇을 영구적으로 삭제합니다.</p>
            <Modal className={localStorage.dark === 'true' ? 'darkmode' : 'lightmode'} trigger={<Button color="red" content="삭제하기" icon="trash" />} closeIcon>
              <Modal.Header>
                {bot.bot.name} 삭제하기
              </Modal.Header>
              <Modal.Description>
                <Container style={{ padding: '10px'}}>
                  <p>봇을 삭제하시려면 <strong>{bot.bot.name}</strong> 을 입력해주세요.</p>
                  <Input name="delete" onChange={this.handleChange} value={this.state.delete} placeholder="봇 이름을 입력해주세요." />
                  <br/><br/>
                  봇을 삭제하시게되면 다시는 복구하실 수 없다는 점을 동의합니다.<br/>
                  <Button color="red" content="삭제하기" icon="trash" disabled={this.state.delete !== bot.bot.name} onClick={this.removeBot}/>
                </Container>
              </Modal.Description>
            </Modal>
          </Segment>
        </Container>
      )
  }
}

export default ManageBot

const options = [
  { text: '관리', value: '관리', key: '관리' },
  { text: '뮤직', value: '뮤직', key: '뮤직' },
  { text: '전적', value: '전적', key: '전적' },
  { text: '웹 대시보드', value: '웹 대시보드', key: '웹 대시보드' },
  { text: '로깅', value: '로깅', key: '로깅' },
  { text: '도박', value: '도박', key: '도박' },
  { text: '게임', value: '게임', key: '게임' },
  { text: '밈', value: '밈', key: '밈' },
  { text: '레벨링', value: '레벨링', key: '레벨링' },
  { text: '유틸리티', value: '유틸리티', key: '유틸리티' },
  { text: '번역', value: '번역', key: '번역' },
  { text: '대화', value: '대화', key: '대화' },
  { text: 'NSFW', value: 'NSFW', key: 'NSFW' },
  { text: '검색', value: '검색', key: '검색' }
]


function validURL(url) {
  return !!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
}