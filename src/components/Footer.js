import React from 'react'

import { Segment, Container, Grid, Icon, List } from "semantic-ui-react";
function Footer() {
    return(
        
        <Segment inverted style={{ position: 'absolute', bottom: 0 ,width: '100%', height: '10rem', borderRadius: 0  }}>
            <Container>
                
            <Grid columns={2}>
                    <Grid.Column>
                    <h1>
                DBKR
            </h1>
            <p><Icon className="copyright"/> 2020 DBKR, All rights reserved.</p>
            <p>이 사이트는 <Icon className="blue react"/>로 제작된 <Icon className="red heart"/> 프로젝트입니다.</p>
                    </Grid.Column>
                    <Grid.Column>
                        <h2>링크</h2>
                        <List>
                            <List.Item href="/discord">
                                디스코드 서버
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
        
    )
}

export default Footer