import GitInfo from "react-git-info/macro";

import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";

import version from "../package.json";

import "semantic-ui-css/semantic.min.css";

console.log(
  `[빌드 정보] 버전: ${GitInfo().branch} Build Version v.${version.version} 해시: ${GitInfo().commit.hash}`
);

Sentry.init({
  dsn: "https://f8cee800d2f245dc9d3ee9fb00b878a3@o466973.ingest.sentry.io/5483180",
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App/>, document.getElementById("potato"));
