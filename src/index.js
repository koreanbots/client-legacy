import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import GitInfo from "react-git-info/macro";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import version from "../package.json";

import "fomantic-ui-css/semantic.min.css";

console.log(
  `[빌드 정보] 버전: ${GitInfo().branch} Build Version v.${version.version} 해시: ${GitInfo().commit.hash}`
);

ReactDOM.render(<App/>, document.getElementById("potato"));
