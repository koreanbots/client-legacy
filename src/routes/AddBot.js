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
  Checkbox,
  Transition,
  Table
} from 'semantic-ui-react'
import Redirect from '../components/Redirect'
import ReactMarkdown from 'react-markdown/with-html'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import CodeBlock from '../components/Code'
import graphql from '../utils/graphql'

class SubmitBot extends Component {
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
    read: false,
    visible: false,
    data: { state: 0, data: {} }
  }
  componentDidMount() {
    this.setState({ visible: true })
  }
  myRef = React.createRef()
  sendSumbit = async body => {
    this.setState({ data: { state: 4 }})
    const res = await graphql(`mutation {
      submitBot(id: "${body.id.replace(/\n/g, '\\n').replace(/"/g, '\\"')}", category: ${JSON.stringify(body.category)}, lib: "${body.lib}", prefix: "${body.prefix.replace(/\n/g, '\\n').replace(/"/g, '\\"')}", intro: "${body.intro.replace(/\n/g, '\\n').replace(/"/g, '\\"')}", desc: "${body.desc.replace(/\n/g, '\\n').replace(/"/g, '\\"')}", web: ${body.web ? '"' + body.web.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"' :  null}, git: ${body.git ? '"' + body.git.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"' :  null}, url: ${body.url ? '"' + body.url.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"' :  null}, discord: "${body.discord.replace(/\\$/gi, '\\\\').replace(/"/g, '\\"')}") {
        id
      }
    }`)
  
  this.setState({ data: { state: 0, data: {} }})
  if (res.code === 200) this.setState({ data: { state: 1 } })
  else this.setState({ data: { state: 2, data: res } })
  }

  handleChange = (e, { name, value }) => {
    if (name === 'desc')
      this.setState({
        desc: value.replace(/</gi, '&lt').replace(/>/gi, '&gt')
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
    if (!this.state.read) {
      this.scrollToMyRef()
      return this.setState({ visible: !this.state.visible })
    }
    if (
      this.state.id &&
      this.state.lib &&
      this.state.intro &&
      this.state.desc &&
      this.state.category &&
      this.state.category.length > 0
    ) {
      await this.sendSumbit(this.state)
    } else {
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

      this.setState({
        data: {
          state: 3,
          data: { message: '필수 입력칸을 전부 작성해주세요!' }
        }
      })
    }
  }

  toggle = () => this.setState(prevState => ({ read: !prevState.read }))
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
      discord,
      read
    } = this.state
    if (!localStorage.userCache || !JSON.parse(localStorage.userCache))
      return (
        <div className="loader">
          <h1>로그인 해주세요!</h1>
        </div>
      )
    else
      return (
        <Container>
          <HelmetProvider>
              <Helmet>
                <title>봇 추가하기 - 한국 디스코드봇 리스트</title>
                <meta
                  name="description"
                  content="본인의 봇을 리스트에 추가합니다!"
                />
              </Helmet>
          </HelmetProvider>
          <br />
          <h1>새로운 봇 추가하기</h1>
          <Transition
            animation="shake"
            duration={700}
            visible={this.state.visible}
          >
            <section id="readme">
              <Message error ref={this.myRef}>
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
                  <li>
                    또한, 봇을 등록하게되면 작성하신 모든 정보는 웹과 API에
                    공개됩니다.
                  </li>
                </Message.Content>
              </Message>
              <br />
              <Checkbox checked={read} onChange={this.toggle} />
              <strong>
                {' '}
                해당 내용을 숙지하였으며, 모두 이행하였고 위 내용에 해당하는
                거부 사유는 답변받지 않는다는 점을 이해합니다.
              </strong>
              <br />
            </section>
          </Transition>

          <Divider />
          <h2>봇 정보</h2>
          <p>* 표시된 항목은 모두 작성해주셔야합니다.</p>
          <Form onSubmit={this.handleSubmit} style={{ marginBottom: '20px'}}>
            <Form.Group>
              <Form.Input
                placeholder="653534001742741552"
                label={'봇 ID (*)'}
                name="id"
                value={id}
                maxLength={19}
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
              style={{ width: '70%' }}
              labelPosition="right"
              placeholder="JEh53MQ"
              name="discord"
              value={discord}
              onChange={this.handleChange}
              maxLength={10}
            >
              <Label basic>discord.gg/</Label>
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
                style={{ minHeight: '200px' }}
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
              <p>심사는 영업일 기준 최대 3일까지 소요될 수 있습니다.<br/>
                심사 결과는 DM으로 전달됩니다.
              </p>
              <Form.Button
                content="제출"
                disabled={this.state.data.state === 4}
              />
            </div>
          </Form>

          {this.state.data.state === 1 ? (
            <Redirect to="/?message=submitSuccess" content=""/>
          ) : this.state.data.state === 2 ? (
            <Message error>{this.state.data.data.message}</Message>
          ) : this.state.data.state === 3 &&
            !(
              this.state.id &&
              this.state.lib &&
              this.state.intro &&
              this.state.desc &&
              this.state.category &&
              this.state.category.length > 0
            ) ? (
            <Message error>
              {this.state.data.data.message}(
              {!this.state.id
                ? '아이디'
                : !this.state.prefix
                ? '접두사'
                : !this.state.lib
                ? '라이브러리'
                : !this.state.category
                ? '카테고리'
                : this.state.category.length === 0
                ? '카테고리'
                : !this.state.intro
                ? '봇 소개'
                : !this.state.desc
                ? '봇 설명'
                : ''}
              )
            </Message>
          ) : (
            <></>
          )}
        </Container>
      )
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop)
}

export default SubmitBot

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
  return !!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/)
}