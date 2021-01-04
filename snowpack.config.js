/** @type {import("snowpack").SnowpackUserConfig } */
const { version } = require('./package.json')
const { execSync } = require('child_process')
process.env.SNOWPACK_PUBLIC_VERSION = version
process.env.SNOWPACK_PUBLIC_HASH = execSync('git rev-parse HEAD').toString().replace('\n', '')
process.env.SNOWPACK_PUBLIC_BRANCH = execSync('git rev-parse --abbrev-ref HEAD').toString().replace('\n', '')

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_'
  },
  testOptions: { 
    files: ['test/*.test.js'],
    port: 3003
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
  ],
  scripts: {
    // "mount:packagejson": "mount / --to /public",
  },
  install: ['@sentry/minimal'],
  devOptions: {
    port: 3001
  },
  installOptions: {
    polyfillNode: true
  }
}