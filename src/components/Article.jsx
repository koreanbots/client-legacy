import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Container } from 'semantic-ui-react'

import './Article.css'

/**
 * 
 * @param {*} props 
 * props.title
 * props.description
 * props.subheader?
 */
function Article (props) {
    return (
        <div className="article">
        <HelmetProvider>
            <Helmet>
                <title>{props.title} - 한국 디스코드봇 리스트</title>
                <meta
                name="description"
                content={props.description}
                />
            </Helmet>
        </HelmetProvider>
        {
            props.colorHeader ? ( 
                <div className="articleDiv">
                <div className="verytop" style={{ marginBottom: '1em', backgroundImage: `url('${props.image}')`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundPosition: 'right top', backgroundSize: '35% 40%' }}>
                    <Container className="article">
                        <h1 style={{ fontSize: '45px' }}>
                            {props.title}
                        </h1>
                        { props.subheader && <p style={{ fontSize: '20px' }}>{props.subheader}</p>}
                        { props.description && <p style={{ fontSize: '20px' }}>{props.description}</p>}
                    </Container>
                </div>
                <Container>
                    {props.children}
                </Container>
                </div>
            ) : (
                <Container className="article">
                <div style={{ marginBottom: '5em' }}>
                    <h1 style={{ fontSize: '45px' }}>
                        {props.title}
                    </h1>
                    { props.subheader && <p style={{ fontSize: '20px' }}>{props.subheader}</p>}
                    { props.description && <p style={{ fontSize: '20px' }}>{props.description}</p>}
                </div>
                {props.children}
            </Container>
            )
        }
    </div>
    )
}

export default Article