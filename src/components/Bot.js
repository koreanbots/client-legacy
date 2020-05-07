import React, { useState } from "react";
import { Card, Button, Item, Icon, Label, Divider } from "semantic-ui-react";
import "./Bot.css";

function Bot({ data, id, name, avatar, votes, servers, intro, category, invite, state, count, trusted, verified }) {
  const [ lookHover, setLookHover ] = useState(false)
  const [ inviteHover, setinviteHover ] = useState(false)
  return (
    <>
      <Card className="botcard">
        <Card.Content>
          <Card.Header>
            {" "}
            <Item.Image
              floated="right"
              src={avatar}
              wrapped
              ui={false}
              avatar
            />
            {count === undefined ? '' : count+1 + '. '} {name} { verified ? (<Icon size="small" className="check" style={{color: '#7289da'}}/>) : ''}{trusted ? (<Icon size="small" color='green' className="certificate"/>) : ''}
          </Card.Header>
          <Card.Meta>
          <span style={{ color: "red" }}>
          <Icon className="heart" /> {votes}</span> | {""}
            <span style={{ color: "#7289DA" }}>{servers} 서버</span>
           
            <br/>
          </Card.Meta>
          <Card.Description>{intro}</Card.Description>
          <br/>
                  </Card.Content>
        <Card.Content extra>
          {category.slice(0,5).map(c=> (
            <a style={{ color: "#7289DA" }} href={"/categories/" + c}>{c} </a>
          ))}
           <span style={{color: 'white'}}> { category.length - 5 > 0 ? ` +${category.length - 5}` : ''}</span>
            <Divider/>
          <div className="ui two buttons">
            <Button basic={!lookHover}  href={"/bots/" + id} color="blue" onMouseOver={()=>setLookHover(true)} onMouseOut={()=>setLookHover(false)}>
              보기
            </Button>
            <Button disabled={state === 'private' || state === 'archived'} href={invite} basic={!inviteHover} color="green" onMouseOver={()=>setinviteHover(true)} onMouseOut={()=>setinviteHover(false)}>
              초대하기
            </Button>
          </div>
        </Card.Content>
      </Card>
    </>
  );
}

export default Bot;
