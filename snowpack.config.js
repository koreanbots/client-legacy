/** @type {import("snowpack").SnowpackUserConfig } */

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
    "mount:packagejson": "mount / --to /public",
  },
  install: ['@sentry/minimal'],
  devOptions: {
    port: 3001
  },
  installOptions: {
    polyfillNode: true
  }
}