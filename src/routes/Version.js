import React from 'react'

import GitInfo from 'react-git-info/macro'
import version from '../../package.json'

import Article from '../components/Article'

function Version() {
  return (
      <Article title="클라이언트 정보" description="클라이언트 정보들입니다.">
        <h1>빌드 정보</h1>
        <p>v{version.version}</p>
        <p>해시: {GitInfo().commit.hash}</p>
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