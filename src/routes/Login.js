import React from 'react'
import Redirecting from '../components/Redirect'
import config from '../config'

function Login() {
  return <Redirecting to={config.url} />
}

export default Login
