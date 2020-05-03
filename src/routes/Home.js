import React from "react";
import fetch from "node-fetch";
import Bot from "../components/Bot";
import { Message, Container, Card } from "semantic-ui-react";
import config from "../config";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bot: {},
      message: false
    };
  }

  removeParam = parameter => {
    var url = window.location.href;
    var urlparts = url.split("?");

    if (urlparts.length >= 2) {
      var urlBase = urlparts.shift();
      var queryString = urlparts.join("?");

      var prefix = encodeURIComponent(parameter) + "=";
      var pars = queryString.split(/[&;]/g);
      for (var i = pars.length; i-- > 0; )
        if (pars[i].lastIndexOf(prefix, 0) !== -1) pars.splice(i, 1);
      url = urlBase + "?" + pars.join("&");
      window.history.pushState("", document.title, url); // added this line to push the new url directly to url bar .
    }
    return url;
  };
  getData = async () => {
    const bot = await fetch(config.api + "/bots/get", {
      method: "GET",
      headers: {
        token: localStorage.token,
        id: localStorage.id,
        time: localStorage.date
      }
    }).then(r => r.json());
    this.setState({ bot, isLoading: false });
  };
  componentDidMount() {
    if (this.props.location.search.replace(/^\?message=/, ""))
      this.setState({
        message:
          messages[this.props.location.search.replace(/^\?message=/, "")] ||
          false
      });
    this.getData();
  }
  handleDismiss = async () => {
    this.setState({ message: false });
    this.removeParam("message");
  };
  render() {
    const { isLoading, bot } = this.state;

    return (
      <Container>
        {this.state.message ? (
          <Message
            header={this.state.message.title}
            onDismiss={this.handleDismiss}
            className={this.state.message.level}
            content={this.state.message.message}
          />
        ) : (
          ""
        )}
        <br />
        <section>
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : bot.code !== 200 ? (
            <div className="loader">
              <span className="loader__text">{bot.message}</span>
            </div>
          ) : (
            <div>
              <Card.Group itemsPerRow={3} stackable>
                {bot.data.map(bot => (
                  <>
                    <Bot
                      data={bot}
                      key={bot.id}
                      id={bot.id}
                      name={bot.name}
                      avatar={
                        bot.avatar !== false
                          ? "https://cdn.discordapp.com/avatars/" +
                            bot.id +
                            "/" +
                            bot.avatar +
                            ".png"
                          : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                              5}.png`
                      }
                      votes={bot.votes}
                      servers={bot.servers}
                      category={bot.category}
                      intro={bot.intro}
                      desc={bot.desc}
                      invite={bot.url === false ? `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0` : bot.url}
                      state={bot.state}
                    />
                  </>
                ))}
              </Card.Group>
            </div>
          )}
        </section>
      </Container>
    );
  }
}

export default Home;

const messages = {
  submitSuccess: {
    level: "success",
    title: "봇 신청 성공!",
    message: "봇을 성공적으로 신청하였습니다! 신난다! 곧 다시 연락드리겠습니다!"
  },
  editSuccess: {
    level: "success",
    title: "봇 정보 수정 성공!",
    message: "봇의 정보를 성공적으로 수정했습니다! 오예!"
  },
  lockOn: {
    level: "success",
    title: "봇 잠금 성공!",
    message: "봇의 잠금을 성공했습니다! 이제 더 이상 초대할 수 없습니다."
  },
  lockOff: {
    level: "success",
    title: "봇 잠금 해제 성공!",
    message: "봇의 잠금해제를 성공했습니다! 다시 초대가 허용됩니다."
  }
};
