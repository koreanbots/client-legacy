import React from "react";
import fetch from "node-fetch";
import {
  Container
} from "semantic-ui-react";
import Redirect from "../components/Redirect"
import config from "../config";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: false,
      isLoading: true
    };
  }


  componentDidMount() {
    
  }
  render() {
    const { isLoading, error } = this.state;
    return <Container>
      {
        isLoading ? error ? (
          <div className="loader">
            <span>데이터 검증에 실패하였습니다. 다시 시도해주세요.<br/>{{ error }}</span>
          </div>
        ) : (
          <div className="loader">
            <span>데이터 검증중...</span>
          </div>
        ) : (
          <Redirect to="/"/>
        )
      }
    </Container>;
  }
}

export default Detail;
