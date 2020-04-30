import React from "react";
import fetch from "node-fetch";
import { Container, Grid, Segment, Item, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Redirect from "../components/Redirect";
import config from "../config";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: { code: 401 },
      isLoading: true
    };
  }

  getProfile = async () => {
    const token = localStorage.token,
      id = localStorage.id,
      date = localStorage.date;
    const res = await fetch(config.api + "/users/@me/profile", {
      method: "GET",
      headers: { token, id, time: date }
    }).then(r => r.json());

    this.setState({ result: res, isLoading: false });
  };
  componentDidMount() {
    this.getProfile();
  }
  render() {
    if (!localStorage.userCache || !JSON.parse(localStorage.userCache))
      return (
        <div className="loader">
          <h1>로그인 해주세요!</h1>
        </div>
      );
    const { result } = this.state;
    return (
      <Container>
        {this.state.isLoading ? (
          <div className="loader">
            <span>Loading...</span>
          </div>
        ) : result.code !== 200 ? (
          <div className="loader">
            <span>{result.message}</span>
          </div>
        ) : (
          <div>
            <br />
            <h1>프로필</h1>
            <h2>나의 봇</h2>
            {result.user.bots.length === 0 ? (
              <h3>승인된 봇이 없습니다.</h3>
            ) : (
              <Grid stackable columns={4}>
                {result.user.bots.map(bot => (
                  <div style={{ marginTop: "10px" }}>
                    <Grid.Column
                      mobile={10}
                      tablet={5}
                      computer={5}
                      largeScreen={5}
                      widescreen={5}
                    >
                      <Segment>
                        <Grid as={Link} to={"/bots/" + bot.id}>
                          <Grid.Row>
                            <Grid.Column width={16}>
                              <Item.Group link>
                                <Item>
                                  <Item.Image
                                    size="small"
                                    src={
                                      bot.avatar !== "false"
                                        ? "https://cdn.discordapp.com/avatars/" +
                                          bot.id +
                                          "/" +
                                          bot.avatar +
                                          ".webp"
                                        : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                                            5}.png`
                                    }
                                    avatar
                                  />

                                  <Item.Content>
                                    <Link to={"/bots/" + bot.id} />
                                    <Item.Header>
                                      <a href={"/bots/" + bot.id}>{bot.name}</a>
                                    </Item.Header>
                                    <Item.Description>
                                      {bot.intro}
                                    </Item.Description>
                                    <Button
                                      color="blue"
                                      icon="cog"
                                      content="관리"
                                    ></Button>
                                  </Item.Content>
                                </Item>
                              </Item.Group>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                    </Grid.Column>
                  </div>
                ))}
              </Grid>
            )}
            <h2>심사 이력</h2>
            {result.user.submitted.length === 0 ? (
              <h3>심사 이력이 없습니다.</h3>
            ) : (
              <Grid stackable columns={4}>
                {result.user.submitted.map(bot => (
                  <div style={{ marginTop: "10px" }}>
                    <Grid.Column
                      mobile={10}
                      tablet={5}
                      computer={5}
                      largeScreen={5}
                      widescreen={5}
                    >
                      <Segment>
                        <Grid as={Link} to={"/pendingBots/" + bot.id}>
                          <Grid.Row>
                            <Grid.Column width={16}>
                              <Item.Group link>
                                <Item>
                                  <Item.Content>
                                    <Item.Header>
                                      <a>
                                        {bot.name} ({bot.id})
                                      </a>
                                    </Item.Header>
                                    <Item.Description>
                                      {bot.intro}
                                    </Item.Description>
                                    상태:{" "}
                                    <a style={{ color: stateColor[bot.state] }}>
                                      {state[bot.state]}
                                    </a>
                                  </Item.Content>
                                </Item>
                              </Item.Group>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                    </Grid.Column>
                  </div>
                ))}
              </Grid>
            )}
          </div>
        )}
      </Container>
    );
  }
}

export default Detail;

const stateColor = ["gray", "green", "red"];
const state = ["심사중", "승인됨", "거부됨"];
