import React from 'react';
import { Container } from 'semantic-ui-react';
import Redirect from '../components/Redirect';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }

  componentDidMount() {
    delete localStorage.userCache;
    delete localStorage.token;
    delete localStorage.date;
    delete localStorage.id;
    this.setState({ done: true });
  }
  render() {
    const { done } = this.state;
    return (
      <Container>
        {done ? (
          <Redirect to="/" />
        ) : (
          <div className="loader">
            <span>로그아웃중...</span>
          </div>
        )}
      </Container>
    );
  }
}

export default Detail;
