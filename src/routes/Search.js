import React from 'react';
import fetch from 'node-fetch';
import 'semantic-ui-css/semantic.min.css';

import Bot from '../components/Bot';
import { Card, Container, Pagination } from 'semantic-ui-react';
import config from '../config';

import queryString from 'query-string';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      bots: {},
      activePage: 1,
      totalPage: 1,
      q: ''
    };
  }

  editParm = (parm, val) => {
    window.history.pushState(
      '',
      document.title,
      `${window.location.origin}?${parm}=${val}`
    );
  };

  getData = async (q, page) => {
    const bot = await fetch(
      config.api + '/bots/search?q=' + q + '&page=' + page
    ).then(r => r.json());
    this.setState({
      bots: bot.code === 200 ? bot.data : [],
      isLoading: false,
      totalPage: bot.totalPage,
      activePage: page
    });
  };

  handlePaginationChange = (e, { activePage }) => {
    this.editParm('page', activePage);
    this.getData(this.state.q, activePage);
  };

  componentDidMount() {
    const query = queryString.parse(window.location.search);
    const page =
      Number.isNaN(Number(query.page)) || Number(query.page) < 1
        ? 1
        : query.page;
    let q = query.query;
    if (!q) this.setState({ bots: [], isLoading: false });
    this.setState({ activePage: page, q });

    this.getData(q, page);
  }
  render() {
    const { bots, isLoading } = this.state;
    return (
      <Container>
        <br />
        <h1>
          "{decodeURI(this.props.location.search.replace(/^\?query=/, ''))}"에
          관한 검색결과
        </h1>
        <br />
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : bots.length === 0 ? (
          <div className="loader">
            <h1>검색 결과가 없습니다.</h1>
          </div>
        ) : (
          <>
            <Card.Group itemsPerRow={3} stackable>
              {bots.map(bot => (
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
                  verified={bot.verified}
                  trusted={bot.trusted}
                  vanity={bot.vanity}
                  boosted={bot.boosted}
                  status={bot.status}
                  banner={bot.banner}
                  bg={bot.bg}
                />
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
          </>
        )}
      </Container>
    );
  }
}

export default Search;
