import React from "react";
import { Segment, Grid, Button, Item } from "semantic-ui-react";
import "./Bot.css";
import { Link } from "react-router-dom";

function Bot({
  data,
  id,
  name,
  avatar,
  votes,
  servers,
  category,
  intro,
  desc
}) {
  return (
    <div style={{ marginTop: "10px" }}>
      <Grid.Column
        mobile={10}
        tablet={5}
        computer={5}
        largeScreen={5}
        widescreen={5}
      >
        <Segment stacked padded>
          <Grid
          as={Link}
          to={"/bots/" + id}>
            <Grid.Row>
              <Grid.Column width={16}>
                <Item.Group link>
                  <Item>
                    <Item.Image size="small" src={avatar} avatar />

                    <Item.Content>
                      <Link to={"/bots/" + id} />
                      <Item.Header>
                        <a href={"/bots/" + id}>{name}</a>
                      </Item.Header>
                      <Item.Description>{intro}</Item.Description>
                      <Button
                        className="discord"
                        content={servers === 0 ? "N/A" : servers + " 서버"}
                      ></Button>
                      <Button
                        content={votes}
                        color="red"
                        icon="heart"
                        labelPosition="right"
                      />
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </div>
  );
}

export default Bot;
