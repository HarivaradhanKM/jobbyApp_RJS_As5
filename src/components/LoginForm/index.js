import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', errorOccurred: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFail = error => {
    this.setState({errorMsg: error, errorOccurred: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://api.ccbp.in/login'
    const options = {
      method: 'Post',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onSubmitFail(data.error_msg)
    }
  }

  render() {
    const {username, password, errorOccurred, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="form-logo-container">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            value={username}
            placeholder="username"
            id="username"
            onChange={this.onChangeUserName}
            className="form-input"
          />
          <br />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            value={password}
            placeholder="password"
            id="password"
            onChange={this.onChangePassword}
            className="form-input"
          />
          <br />
          <br />
          <button className="form-submit-button" type="submit">
            Login
          </button>
          {errorOccurred && <p className="error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
