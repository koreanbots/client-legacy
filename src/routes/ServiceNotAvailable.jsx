import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import Article from '../components/Article'

export default function ServiceNotAvailable(props) {
    return (
        <Article title="문제가 발생하였습니다">
            <h1>{props.title || '지나가던 고양이가 서버선을 밟고 넘어졌습니다.'}</h1>
            <p>{props.desc || 'API 처리중에 문제가 발생하였습니다.'}</p>
            <p>기다리시면 문제가 해결될거 같습니다. 도움이 필요하시면 공식 디스코드 서버를 방문해주세요.</p>
            <br/><br/>
            <Button className="discord" href="/discord"><Icon className="discord" />공식 디스코드 서버</Button>
            <Button href="https://github.com/koreanbots/koreanbots/issues/new/choose"><Icon className="github" />버그 제보하기</Button>
            <Button color="blue" href="https://status.koreanbots.dev"><Icon className="calendar check outline"/>상태 페이지</Button>
        </Article>
    )
}