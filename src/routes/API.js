import React, { useState } from 'react';
import { Container, Grid, Menu, Sidebar, Responsive, Button, Icon, Segment, Table, Label } from 'semantic-ui-react';

import docs from "./docs.json"
import ReactMarkdown from 'react-markdown';

import './API.css'

function API(params){
    const [ topic, setTopic ] = useState( params.match.params.topic || 'main')
    const [ doc, setDoc ] = useState(params.match.params.doc || 'starting')
    const [ visible, setVisible ] = useState(false)
    const handleItemClick = (__e, { topic, id }) => { setTopic(topic); setDoc(id); setVisible(false); window.history.pushState('', document.title, `/api/${topic}/${id}`); };

    return(
        <div style={{ height: '100% !important'}}>
                <Responsive minWidth={1500} >
                    <Grid>
                        <Grid.Column width={2}>
                        <Menu vertical inverted style={{ borderRadius: 0, width: '100%', height: '150vh', marginBottom: '-190px'}}>
                { (Object.keys(docs.docs)).map(el=> {
                    return(
                        <>
                        <Menu.Item>
          <Menu.Header>{docs.docs[el].name}</Menu.Header>
          <Menu.Menu>
           {
               Object.keys(docs.docs[el].docs).map(d=> {
                   const here = docs.docs[el].docs[d]
                return(
                    <>
                                  
            <Menu.Item
              name={here.name}
              id={d}
              topic={el}
              active={doc === d}
              onClick={handleItemClick}
            />

                    </>
                )
               })
           }
                     </Menu.Menu>
        </Menu.Item>
                        </>
                    )
                }) }
      </Menu>
                        </Grid.Column>

                        <Grid.Column width={12}>
                        <Container>
                <ReactMarkdown source={docs.docs[topic].docs[doc].content} escapeHtml={false} renderers={{ table: Table, thead: Table.Header, tr: Table.Cell }} />

        </Container>
                        </Grid.Column>
                    </Grid>
            
        </Responsive>
        <Responsive maxWidth={1499}>
            <Container style={{ height: '100%'}}>
        <Button {...Responsive.onlyComputer} onClick={()=> setVisible(true)} content="목차보기"/><br/>
                <ReactMarkdown source={docs.docs[topic].docs[doc].content} escapeHtml={false} renderers={{ table: Table, thead: Table.Header, tr: Table.Cell }} />

        </Container>
        <Sidebar animation="scale down" visible={visible} vertical width="wide" direction="left">
            <Menu vertical inverted style={{ borderRadius: 0, width: '100%', height: '100%'}}>
                <Menu.Item onClick={()=>setVisible(false)}><Icon className="close"/>닫기</Menu.Item>
                { (Object.keys(docs.docs)).map(el=> {
                    return(
                        <>
                        <Menu.Item>
          <Menu.Header>{docs.docs[el].name}</Menu.Header>
          <Menu.Menu>
           {
               Object.keys(docs.docs[el].docs).map(d=> {
                   const here = docs.docs[el].docs[d]
                return(
                    <>
                                  
            <Menu.Item
              name={here.name}
              id={d}
              topic={el}
              active={doc === d}
              onClick={handleItemClick}
            />

                    </>
                )
               })
           }
                     </Menu.Menu>
        </Menu.Item>
                        </>
                    )
                }) }
      </Menu>
        </Sidebar>
        </Responsive>
        </div>
    )
}

export default API


