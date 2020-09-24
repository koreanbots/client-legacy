import React, { useEffect, useState } from 'react'
import { Button, Container, Divider, Image, List } from 'semantic-ui-react'
import Article from '../components/Article'
import graphql from '../utils/graphql'

export default function Trusted( ) {
    const [ trusted, setTrusted ] = useState(null)
    useEffect(() => {
        async function getData() {
            const res = await graphql(`query {
                list(type: TRUSTED) {
                    data {
                        id
                        tag
                        avatar
                    }
                }
            }`)
    
            if(res.code === 200) setTrusted(res.data.list.data)
        }
        getData()
    }, [ ])
    
    return (
        <Article title="신뢰된 봇" description="투명하고 깔끔한 디스코드봇 커뮤니티를 만들기 위해, 봇 인증제를 운영하고 있습니다." subheader="디스코드의 다소 낮은 인증기준으로 더 신뢰를 주기위해서입니다." colorHeader>
            <Container textAlign="center" style={{ margin: '50px 0' }}>
                <h1>저희 사이트에서 신뢰하는 봇들입니다.</h1>
                <p>단, 신뢰된 봇에서 발생한 피해에 대하여 당사는 어떠한 책임도 지지않습니다.</p>
                <Image.Group size='mini'>
                    {
                        trusted && trusted.map(bot=> (
                            <Image avatar src={
                                bot.avatar
                                ? 'https://cdn.discordapp.com/avatars/' +
                                    bot.id +
                                    '/' +
                                    bot.avatar +
                                    '.png?size=128'
                                : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                                    5}.png?size=128`
                            } />
                        ))
                    }
            </Image.Group>
            </Container>
            <Divider />
            <h1>다양한 혜택이 제공됩니다.</h1>
            <h3>1. 부스터 혜택 제공</h3>
            <p>광고 제거, 고유 URL, 미리보기 배경, 프로필 배경 커스터마이징 혜택을 제공합니다.</p>
            <h3>2. 뱃지 제공</h3>
            <p>신뢰된 봇 뱃지가 봇에 표시됩니다.</p>

            <h1>어떠한 조건을 만족해야하나요?</h1>
            <h2>아래 모든 조건을 만족해야합니다.</h2>
            <List bulleted animated>
                <List.Item>700개 이상의 서버</List.Item>
                <List.Item>10만명 이상의 중복 유저</List.Item>
                <List.Item>디스코드 ToS와 개발자 약관을 완벽하게 준수</List.Item>
                <List.Item>유저가 지원받을 수 있는 방법이 존재</List.Item>
                <List.Item>수집하는 개인정보와 이용범위를 서비스에 명시</List.Item>
                <List.Item>평균 90퍼센트 이상의 업타임</List.Item>
                <List.Item>안전하고 신뢰할 수 있는 저장방식</List.Item>
                <List.Item>메인 콘텐츠가 존재해야합니다. (다양한 기능이 있어도 되지만, 하나의 메인 기능이 필요합니다. ex. 관리, 밈 등등)</List.Item>
                <List.Item>디스코드 인증된 봇</List.Item>
            </List>
            <h2>혹은 아래 조건 중 하나 이상을 만족해야합니다.</h2>
            <List bulleted animated>
                <List.Item>디스코드 인증된 봇이며, 봇 또는 개발팀의 서버가 디스코드와 파트너쉽이 체결된 봇</List.Item>
                <List.Item>당사의 특수 목적 봇</List.Item>
                <List.Item>기타 저명한 단체혹은 기업에서 제작/개발한 봇</List.Item>
            </List>
            <Divider style={{ margin: '80px 0' }} />
            <Container textAlign="center">
                <h1>제 봇의 인증을 신청하고 싶습니다.</h1>
                <p>인증은 깃허브 이슈를 통해 받고 있습니다.</p>
                <Button color="black" circular href="https://github.com/koreanbots/verification">깃허브</Button>
            </Container>
        </Article>
    )
}