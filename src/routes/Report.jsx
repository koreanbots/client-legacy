import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Container, Divider, Image, Label, Segment, Table } from 'semantic-ui-react'
import CodeBlock from '../components/Code'
import graphql from '../utils/graphql'

export default function Report({ match }) {
    const [ data, setData ] = useState(null)
    const id = match.params.id
    useEffect(()=> {
        async function fetchData() {
            const res = await graphql(`query {
                report(id: "${id}") {
                    id
                    type
                    state
                    category
                    desc
                    issuer {
                        id
                        username
                        avatar
                        tag
                    }
                    bot {
                        id
                        name
                        tag
                        avatar
                    }
                }
            }`)
            setData(res)
        }

        fetchData()
    }, [ id ])
    return (
        <Container>
            {
                !data ? (
                    <div className="loader">
                        <span>Loading...</span>
                    </div>
                ) : data.code !== 200 ? (
                    <div className="loader">
                        <span>{data.message}</span>
                    </div>
                ) : data.data.report ? (
                    (
                        <div className="botDetail">
                            <h1>#{data.data.report.id} 신고 <Label color={data.data.report.state !== 0 ? 'green' : 'grey'}>{data.data.report.state !== 0 ? '답변완료' : '대기중'}</Label></h1>
                            <Image avatar size='mini' src={ data.data.report.issuer.avatar ? 'https://cdn.discordapp.com/avatars/' +
                                data.data.report.issuer.id +
                                '/' +
                                data.data.report.issuer.avatar +
                                (data.data.report.issuer.avatar.startsWith('a_') ? '.gif' : '.png') + '?size=1024'
                              : `https://cdn.discordapp.com/embed/avatars/${data.data.report.issuer.tag %
                                  5}.png?size=1024`} /> { data.data.report.issuer.username.toUpperCase() }#{ data.data.report.issuer.tag }
                            <Divider />
                            <h2>신고 내용</h2>
                            {
                                data.data.report.type === 'bot' ? (
                                    <>
                                    <Label as={Link} to={`/bots/${data.data.report.bot.id}`}>
                                        <Image avatar size='mini' src={ data.data.report.bot.avatar ? 'https://cdn.discordapp.com/avatars/' +
                                    data.data.report.bot.id +
                                    '/' +
                                    data.data.report.bot.avatar +
                                    (data.data.report.bot.avatar.startsWith('a_') ? '.gif' : '.png') + '?size=1024'
                                : `https://cdn.discordapp.com/embed/avatars/${data.data.report.bot.tag %
                                    5}.png?size=1024`} /> { data.data.report.bot.name }#{ data.data.report.bot.tag }
                                    </Label>
                                        <h3>카테고리: { data.data.report.category }</h3>
                                    </>
                                ) : ''
                            }
    
                            <Segment style={{
                                wordWrap: 'break-word',
                                color: 'black'
                            }}>
                                <ReactMarkdown
                                    source={data.data.report.desc.replace(/!\[(.*?)\]\((.*?)\)/g, function(whole, alt, link){
                                    let isURL
                                    try {
                                    isURL = new URL(link)
                                    } catch(e) {
                                    isURL = false
                                    }
                                    if(!isURL) return `![${alt}](${link})`
                                    else return `![${alt}](https://cdn.statically.io/img/${isURL.host}${isURL.pathname}${isURL.search})`
                                    })}
                                    renderers={{
                                    table: Table,
                                    thead: Table.Header,
                                    tr: Table.Cell,
                                    code: CodeBlock
                                    }}
                                />
                            </Segment>
                            <Divider />
                            <h2>답변 내용</h2>
                            {
                                data.data.report.state !== 0 ? (
                                    <>
                                        
                                        <Segment style={{
                                        wordWrap: 'break-word',
                                        color: 'black'
                                        }}>
                                            <ReactMarkdown
                                            source={reply[data.data.report.state]} />
                                        </Segment>
                                    </>
                                ) : (
                                    <h3>답변 대기중</h3>
                                )
                            }
                        </div>
                    )
                ) : (
                    <div className="loader">
                        <h3>존재하지 않거나 권한이 없습니다.</h3>
                    </div>
                )
            }
        </Container>
    )
}

const reply = {
    1: `안녕하세요!

해당 문제를 제보해 주셔서 대단히 감사드립니다. 제공해주신 정보를 바탕으로 조사를 시작했으며, 조사 결과에 따라 조치를 할 예정입니다. 다만, 개인 정보 보호 차원에서, 조치 내용에 관해서는 따로 안내해 드릴 수 없다는 점 이해해 주시기 바랍니다.

**한국 디스코드봇 리스트**를 더욱 더 안전하고 깨끗한 환경으로 만드는 것에 기여해 주셔서 감사드리며, 앞으로도 많은 지원과 성원 부탁드립니다.

감사합니다.

KOREANBOTS 보안팀 드림`,
    2: `안녕하세요!
해당 문제를 제보해 주셔서 대단히 감사드립니다. 제공해주신 정보를 검토해보았지만, 이를 바탕으로 조사를 진행하기엔 어려움이 있어 거부되었습니다.

관련한 자료가 부족한 경우 거부하고 있습니다. [공식 디스코드 서버](/discord)에 가입하거나 다시 신고를 해주셔서 자료를 더 제공해주시면 감사드리겠습니다.

**한국 디스코드봇 리스트**를 더욱 더 안전하고 깨끗한 환경으로 만드는 것에 기여해 주셔서 감사드리며, 앞으로도 많은 지원과 성원 부탁드립니다.

감사합니다.

KOREANBOTS 보안팀 드림`,
    3: `안녕하세요!
    
해당 문제를 제보해 주셔서 대단히 감사드립니다. 아쉽지만 신고하신 내용은 거부되었습니다.

위반사항의 카테고리가 올바른지 다시 한 번 확인해주시고, 혹시 자료가 부족하진 않은지도 확인해주시길 바랍니다.

도움이 필요하시다면 [공식 디스코드 서버](/discord)를 이용해주세요.

감사합니다.

KOREANBOTS 보안팀 드림`}