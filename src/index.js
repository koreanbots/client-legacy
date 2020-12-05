import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import GitInfo from "react-git-info/macro";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import version from "../package.json";

import "semantic-ui-css/semantic.min.css";
import { experimentDebugger as _debugger, emitter } from "@marvelapp/react-ab-test";

if(process.env.NODE_ENV === 'development') _debugger.enable()

emitter.addPlayListener(function(experimentName, variantName) {
  console.log(`[DEBUG] Displaying experiment "${experimentName}" variant "${variantName}"`);
});


console.log(
  `[빌드 정보] 버전: ${version.version} 해시: ${GitInfo().commit.hash}`
);

ReactDOM.render(<App/>, document.getElementById("potato"));
