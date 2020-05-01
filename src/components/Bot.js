import React from "react";
import { Card, Button, Item, Icon, Label } from "semantic-ui-react";
import "./Bot.css";

function Bot({ data, id, name, avatar, votes, servers, intro, category }) {
  return (
    <>
      <Card href={"/bots/" + id}>
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
            <Button basic color="blue">
              보기
            </Button>
            <Button href="/gg" basic color="green">
              초대하기
            </Button>
          </div>
        </Card.Content>
      </Card>
    </>
  );
}

export default Bot;
