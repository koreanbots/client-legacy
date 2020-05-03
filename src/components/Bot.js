import React, { useState } from "react";
import { Card, Button, Item, Icon, Label } from "semantic-ui-react";
import "./Bot.css";

function Bot({ data, id, name, avatar, votes, servers, intro, category, invite, state }) {
  const [ lookHover, setLookHover ] = useState(false)
  const [ inviteHover, setinviteHover ] = useState(false)
  return (
    <>
      <Card>
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
            {name}
          </Card.Header>
          <Card.Meta>
            <a style={{ color: "#7289DA" }}>{servers} 서버</a> |{" "}
            <a style={{ color: "red" }}>
              {votes} <Icon className="heart" />
            </a>
          </Card.Meta>
          <Card.Description>{intro}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic={!lookHover} color="blue" onMouseOver={()=>setLookHover(true)} onMouseOut={()=>setLookHover(false)}>
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
