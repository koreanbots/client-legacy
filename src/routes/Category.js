import React from 'react';
import fetch from 'node-fetch';
import Bot from '../components/Bot';
import { Message, Container, Card, Pagination, Label } from 'semantic-ui-react';
import config from '../config';

import queryString from 'query-string';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bot: {},
      message: false,
      activePage: 1,
      totalPage: 1
    };
  }

  removeParam = parameter => {
    var url = window.location.href;
    var urlparts = url.split('?');

    if (urlparts.length >= 2) {
      var urlBase = urlparts.shift();
      var qus = urlparts.join('?');

      var prefix = encodeURIComponent(parameter) + '=';
      var pars = qus.split(/[&;]/g);
      for (var i = pars.length; i-- > 0; )
        if (pars[i].lastIndexOf(prefix, 0) !== -1) pars.splice(i, 1);
      url = urlBase + '?' + pars.join('&');
      window.history.pushState('', document.title, url); // added this line to push the new url directly to url bar .
    }
    return url;
  };

  editParm = (parm, val) => {
    window.history.pushState(
      '',
      document.title,
      `${window.location.origin}${window.location.pathname}?${parm}=${val}`
    );
  };
  getData = async page => {
    const bot = await fetch(
      config.api +
        `/bots/category/${this.props.match.params.category}?page=` +
        page,
      {
        method: 'GET',
        headers: {
          token: localStorage.token,
          id: localStorage.id,
          time: localStorage.date
        }
      }
    ).then(r => r.json());
    this.setState({
      bot,
      isLoading: false,
      totalPage: bot.totalPage,
      activePage: page
    });
  };
  handlePaginationChange = (e, { activePage }) => {
    this.editParm('page', activePage);
    this.getData(activePage, this.props);
  };

  componentDidMount(props) {
    const query = queryString.parse(window.location.search);
    const page =
      Number.isNaN(Number(query.page)) || Number(query.page) < 1
        ? 1
        : query.page;
    this.setState({ activePage: page });
    this.getData(page);
  }
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
          ''
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
              <h3>
                {' '}
                <Label tag size="large">
                  {this.props.match.params.category}
                </Label>{' '}
                카테고리 봇들
              </h3>
              <br />
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
                          ? 'https://cdn.discordapp.com/avatars/' +
                            bot.id +
                            '/' +
                            bot.avatar +
                            '.png'
                          : `https://cdn.discordapp.com/embed/avatars/${bot.tag %
                              5}.png`
                      }
                      votes={bot.votes}
                      servers={bot.servers}
                      category={bot.category}
                      intro={bot.intro}
                      desc={bot.desc}
                      invite={
                        bot.url === false
                          ? `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`
                          : bot.url
                      }
                      state={bot.state}
                      count={
                        this.state.bot.data.findIndex(r => r.id === bot.id) +
                        (this.state.activePage - 1) * 9
                      }
                      verified={bot.verified}
                      trusted={bot.trusted}
                      vanity={bot.vanity}
                      boosted={bot.boosted}
                      status={bot.status}
                      banner={bot.banner}
                      bg={bot.bg}
                    />
                  </>
                ))}
              </Card.Group>
              <br />
              <Container textAlign="center">
                <Pagination
                  href="#"
                  boundaryRange={0}
                  siblingRange={1}
                  ellipsisItem={null}
                  activePage={this.state.activePage}
                  totalPages={this.state.totalPage}
                  onPageChange={this.handlePaginationChange}
                />
                
              </Container>
              <br/>
            </div>
          )}
        </section>
      </Container>
    );
  }
}

export default Category;
