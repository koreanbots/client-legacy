import React from 'react'
import { Advertisement } from "semantic-ui-react";

export default function Adsense(props) {
    return (
        <Advertisement unit="panorama" style={{ width: '100%', marginTop: '2em' }} test={import.meta.env.MODE !== 'production' ? '광고' : null}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-4856582423981759"
                data-ad-slot="3250141451"
                data-ad-format="auto"
                data-adtest="on"
                data-full-width-responsive="true"></ins>
        </Advertisement>
    )
}