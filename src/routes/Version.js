import React from 'react'

import GitInfo from "react-git-info/macro";
import version from "../../package.json";
import { Icon } from 'semantic-ui-react';

function Version () {
    return(
        <div className="loader">
              <span>
                [빌드정보] 버전: {version.version} 해시: {GitInfo().commit.hash}
              </span>
              
        </div>
    )
}

export default Version