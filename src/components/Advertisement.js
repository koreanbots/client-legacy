import React from 'react'

import GitInfo from "react-git-info/macro";
import { Advertisement } from "semantic-ui-react";

export default function Adsense(props) {
    return (
        <Advertisement unit="panorama" style={{ width: '100%', marginTop: '2em' }} test={GitInfo().branch !== 'stable' ? '광고' : null}>
            <ins class="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-4856582423981759"
                data-ad-slot="3250141451"
                data-ad-format="auto"
                data-adtest="on"
                data-full-width-responsive="true"></ins>
        </Advertisement>
    )
}