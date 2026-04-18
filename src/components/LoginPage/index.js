import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtTkoken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtTkoken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    let userDetails = {
      username,
      password,
    }

    if (username === 'sri@gmail.com' && password === 'sri@2026') {
      userDetails = {
        username: 'rahul',
        password: 'rahul@2021',
      }
    }

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) return <Redirect to="/" />

    return (
      <div className="login-bg">
        <div className="login-card">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
            <h2 className="brand">Jobby</h2>
          </div>

          <form onSubmit={this.submitForm} className="form">
            <label htmlFor="username">sri@gmail.com</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Enter username"
            />

            <label htmlFor="password">sri@2026</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Enter password"
            />

            <button type="submit">Login</button>

            {showSubmitError && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
