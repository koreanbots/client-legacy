import React, { Component } from 'react'
import { Form, Container, Message, TextArea, Segment } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown/with-html'

class SubmitBot extends Component {
  state = { id: '', lib: '', prefix: '', intro: '', desc: '', category: '', website: '', git: '', url: ''}

  handleChange = (e, { name, value }) => {
    if( name === 'desc') this.setState({ desc: value.replace(/</gi, '&lt').replace(/>/gi, '&gt') })
    this.setState({ [name]: value })
    if(name === 'intro' && value.length > 120) this.setState({ desc: value.slice(0, 120)})
    else if(name === 'desc' && value.length > 1000) this.setState({ desc: value.slice(0, 1000)})
  }

  handleSubmit = () => {
    const { id, prefix, lib } = this.state

  }

  render() {
    const { id, prefix, lib, intro, desc, category, website, git, url } = this.state
    if(!localStorage.userCache || !JSON.parse(localStorage.userCache)) return(        
    <div className="loader">
    <h1>로그인 해주세요!</h1>
  </div>)
    return (
      <Container>
          <h1>새로운 봇 추가하기</h1>
          <Message info>
              <Message.Header>
              신청하시기 전에 다음 사항을 확인해주세요!!
              </Message.Header>
              <Message.Content>
                  <li><a href="/discord">디스코드</a>에 참가하셨나요?</li>
                  <li>봇이 <a href="/guidelinews">가이드라인</a>을 지키고 있나요?</li>
              </Message.Content>
          </Message>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='387548561816027138'
              label='Bot ID'
              description="GG"
              name='id'
              value={id}
              maxLength={18}
              onChange={this.handleChange}
             
            />
            <Form.Input
              placeholder='.'
              label='접두사 (Prefix)'
              name='prefix'
              value={prefix}
              maxLength={32}
              onChange={this.handleChange}
            />
             <Form.Select
              placeholder='discord.js'
              label='라이브러리 (Library)'
              name='lib'
              value={lib}
              onChange={this.handleChange}
              options={[{"text":"Eris","value":"Eris"}, {"text": "discord.js", "value": "discord.js"}, {"text":"discord.py","value":"discord.py"}, {"text":"discordcr","value":"discordcr"},{"text":"Nyxx","value":"Nyxx"},{"text":"Discord.Net","value":"Discord.Net"},{"text":"DSharpPlus","value":"DSharpPlus"},{"text":"Nostrum","value":"Nostrum"},{"text":"coxir","value":"coxir"},{"text":"DiscordGo","value":"DiscordGo"},{"text":"Discord4J","value":"Discord4J"},{"text":"Javacord","value":"Javacord"},{"text":"JDA","value":"JDA"},{"text":"Discordia","value":"Discordia"},{"text":"RestCord","value":"RestCord"},{"text":"Yasmin","value":"Yasmin"},{"text":"disco","value":"disco"},{"text":"discordrb","value":"discordrb"},{"text":"serenity","value":"serenity"},{"text":"SwiftDiscord","value":"SwiftDiscord"},{"text":"Sword","value":"Sword"},{"text":"기타","value":"기타"}, {"text": "비공개", value: "비공개"} ]}
            />
        </Form.Group>
            <Form.Input
                placeholder='봇을 설명할 수 있는 간단한 설명을 적어주세요! (최대 120자)'
                width={16}
                label='봇 소개'
                name='intro'
                value={intro}
                onChange={this.handleChange}
                maxLength={120}
            />
            <div className="field">
            <label>봇 설명</label>

            <TextArea 
            name='desc'
            value={desc}
            onChange={this.handleChange}
            placeholder='봇의 자세하게 설명해주세요! 마크다운을 지원합니다. (최대 1000자)' 
            maxLength={1000}/>
            <div className="field">
                <label>미리보기</label>
                <Segment>
                <ReactMarkdown
                source={desc}
                />
                 
                </Segment>
            </div>
            <Form.Button content='Submit' />
            </div>
            
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ id, prefix, lib, intro, desc }, null, 2)}</pre>

        </Container>
    )
  }
}

export default SubmitBot