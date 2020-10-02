import React, { useEffect, useState } from 'react'
import { Button, Container, Divider, Image } from 'semantic-ui-react'
import Article from '../components/Article'
import graphql from '../utils/graphql'

export default function Partners( ) {
    const [ partners, setPartners ] = useState(null)
    useEffect(() => {
        async function getData() {
            const res = await graphql(`query {
                list(type: PARTNERED) {
                    data {
                        id
                        tag
                        avatar
                    }
                }
            }`)
    
            if(res.code === 200) setPartners(res.data.list.data)
        }
        getData()
    }, [ ])
    
    return (
        <Article title="파트너" description="한국 디스코드봇 리스트와 함께하실래요?" colorHeader image="/img/growup.svg">
            <Container textAlign="center" style={{ margin: '50px 0' }}>
                <h1>저희 파트너분들을 만나보세요.</h1>
                <p>파트너분들께는 다양한 혜택이 함께 제공됩니다.</p>
                <Image.Group size='mini'>
                    {
                        partners && partners.map(bot=> (
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
            <h3>1. 사이트 수익 분배</h3>
            <p>해당봇이 수익에 기여한 일부의 금액을 광고 크레딧으로 되돌려드립니다.</p>
            <h3>2. 부스터 혜택 제공</h3>
            <p>고유 URL, 미리보기 배경, 프로필 배경 커스터마이징 혜택을 제공합니다.</p>
            <h3>3. 파트너 전용 빠른 지원</h3>
            <p>파트너 담당 부서에서 지속적으로 관리해드리며, 문의사항에 더 빠른 지원을 받으실 수 있습니다.</p>

            <h1>파트너가 되고 싶습니다.</h1>
            <p>파트너는 아래 요구사항을 만족하셔야합니다.</p>
            <h3>700서버 이상, 일정 조회수 이상</h3>
            <p>조회수는 미공개 사항이기에 심사할때 확인합니다.</p>
            <h3>API 사용하여 봇에 투표시 혜택 부여</h3>
            <p>사이트에 봇에 투표시 혜택을 부여해주셔야합니다.</p>
            <Divider style={{ margin: '80px 0' }} />
            <Container textAlign="center">
                <h1>파트너에 지원하겠습니다!</h1>
                <p>파트너는 디스코드 서버를 통해 신청 받고 있습니다.</p>
                <Button circular className="discord" href="/discord" disabled>디스코드 서버</Button><br/><br/>
                아직 오픈 예정입니다.
            </Container>
        </Article>
    )
}