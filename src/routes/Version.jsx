import React from 'react'

import { Button, Container, Modal, TextArea } from 'semantic-ui-react'

import Article from '../components/Article'
import Clipboard from 'react-clipboard.js';

function Version() {
  const infos = `## 사용자 정보
버전: ${import.meta.env.SNOWPACK_PUBLIC_BRANCH.toUpperCase()} Build v.${import.meta.env.SNOWPACK_PUBLIC_VERSION} Hash: ${import.meta.env.SNOWPACK_PUBLIC_HASH}
브라우저: \`${getBrowser()}\`(${navigator.userAgent})
플랫폼: ${navigator.platform}
`
  return (
      <Article title="클라이언트 정보" description="클라이언트 정보들입니다.">
        
        <Modal className={localStorage.dark === 'true' ? 'darkmode' : 'lightmode'} trigger={
          <Button color="blue">
            이슈 제출용 정보 복사
          </Button>
        }>
          <Modal.Header>
            이슈 제출용 정보 복사
          </Modal.Header>
          <Modal.Description>
            <Container style={{ padding: '10px' }}>
              <TextArea style={{ width: '100%' }}
                value={infos}
                />
              <Clipboard component={Button} data-clipboard-text={infos} onSuccess={()=> alert('복사되었습니다!')}>
                복사하기
              </Clipboard>
            
            </Container>
          </Modal.Description>
        </Modal>
        <h1>빌드 정보</h1>
        <p>${import.meta.env.SNOWPACK_PUBLIC_BRANCH.toUpperCase()} Build v.${import.meta.env.SNOWPACK_PUBLIC_VERSION} Hash: ${import.meta.env.SNOWPACK_PUBLIC_HASH}</p>
        <h1>User-Agent</h1>
        <p>{navigator.userAgent}</p>
        <h1>Browser</h1>
        <p>{getBrowser()}</p>
        <h1>Platform</h1>
        <p>{navigator.platform}</p>
        <h1>Language</h1>
        <p>{navigator.language}</p>
        <h1>Online?</h1>
        <p>{navigator.onLine ? 'true' : 'false'}</p>
      </Article>
  )
}

export default Version

function getBrowser(){
  let navUserAgent = navigator.userAgent;
  let browserName  = navigator.appName;
  let browserVersion  = ''+parseFloat(navigator.appVersion); 
  let tempNameOffset,tempVersionOffset,tempVersion;


if ((tempVersionOffset=navUserAgent.indexOf("Opera"))!==-1) {
 browserName = "Opera";
 browserVersion = navUserAgent.substring(tempVersionOffset+6);
 if ((tempVersionOffset=navUserAgent.indexOf("Version"))!==-1) 
   browserVersion = navUserAgent.substring(tempVersionOffset+8);
} else if ((tempVersionOffset=navUserAgent.indexOf("MSIE"))!==-1) {
 browserName = "Microsoft Internet Explorer";
 browserVersion = navUserAgent.substring(tempVersionOffset+5);
} else if ((tempVersionOffset=navUserAgent.indexOf("Chrome"))!==-1) {
 browserName = "Chrome";
 browserVersion = navUserAgent.substring(tempVersionOffset+7);
} else if ((tempVersionOffset=navUserAgent.indexOf("Safari"))!==-1) {
 browserName = "Safari";
 browserVersion = navUserAgent.substring(tempVersionOffset+7);
 if ((tempVersionOffset=navUserAgent.indexOf("Version"))!==-1) 
   browserVersion = navUserAgent.substring(tempVersionOffset+8);
} else if ((tempVersionOffset=navUserAgent.indexOf("Firefox"))!==-1) {
 browserName = "Firefox";
 browserVersion = navUserAgent.substring(tempVersionOffset+8);
} else if ( (tempNameOffset=navUserAgent.lastIndexOf(' ')+1) < (tempVersionOffset=navUserAgent.lastIndexOf('/')) ) {
 browserName = navUserAgent.substring(tempNameOffset,tempVersionOffset);
 browserVersion = navUserAgent.substring(tempVersionOffset+1);
 if (browserName.toLowerCase()===browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}

if ((tempVersion=browserVersion.indexOf(";"))!==-1)
   browserVersion=browserVersion.substring(0,tempVersion);
if ((tempVersion=browserVersion.indexOf(" "))!==-1)
   browserVersion=browserVersion.substring(0,tempVersion);

return `${browserName} ${browserVersion}`

}