import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import SavedPassword from '../SavedPassword/index'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordLists: [],
    website: '',
    username: '',
    password: '',
    search: '',
    count: 0,
    isPasswordShown: false,
  }

  addWebsite = event => {
    this.setState({website: event.target.value})
  }

  addUsername = event => {
    this.setState({username: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  addNewPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    if (website !== '') {
      this.setState(prev => ({
        passwordLists: [...prev.passwordLists, newPassword],
        website: '',
        username: '',
        password: '',
        count: prev.count + 1,
      }))
    }
  }

  searchPassword = event => {
    this.setState({search: event.target.value})
  }

  deleteUser = id => {
    const {passwordLists} = this.state
    const updatedList = passwordLists.filter(eachItem => eachItem.id !== id)

    this.setState(prev => ({passwordLists: updatedList, count: prev.count - 1}))
  }

  showHidePassword = () => {
    this.setState(prev => ({isPasswordShown: !prev.isPasswordShown}))
  }

  render() {
    const {
      passwordLists,
      website,
      username,
      password,
      search,
      count,
      isPasswordShown,
    } = this.state

    const searchResult = passwordLists.filter(eachItem =>
      eachItem.username.toLowerCase().includes(search.toLowerCase()),
    )

    const isResultFound = searchResult.length !== 0

    return (
      <div className="bg_container">
        <div className="app_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app_logo"
          />
          <div className="form_container">
            <form className="form" onSubmit={this.addNewPassword}>
              <h4 className="heading">Add New Password</h4>
              <div className="input_box">
                <div className="logo_box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="input_logo"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.addWebsite}
                  value={website}
                />
              </div>
              <div className="input_box">
                <div className="logo_box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="input_logo"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.addUsername}
                  value={username}
                />
              </div>
              <div className="input_box">
                <div className="logo_box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="input_logo"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.addPassword}
                  value={password}
                />
              </div>
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div className="img_container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="app_img"
              />
            </div>
          </div>

          <div className="password_container">
            <div className="password_header">
              <div className="password_count">
                <h4 className="password_heading">Your Passwords</h4>
                <p className="count">{count}</p>
              </div>

              <div className="input_box">
                <div className="logo_box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="input_logo"
                  />
                </div>
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  onChange={this.searchPassword}
                  value={search}
                />
              </div>
            </div>
            <hr className="ruler" />
            <div className="list_container">
              <div className="checkbox_box">
                <input
                  type="checkbox"
                  id="checkBox"
                  className="checkbox"
                  onChange={this.showHidePassword}
                />
                <label htmlFor="checkBox" className="password_label">
                  Show passwords
                </label>
              </div>
              {!isResultFound && (
                <>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no_password_img"
                  />
                  <p className="no_password">No Passwords View</p>
                </>
              )}
              {isResultFound && (
                <ul className="ul_list">
                  {searchResult.map(userDetails => (
                    <SavedPassword
                      key={userDetails.id}
                      userDetails={userDetails}
                      deleteUser={this.deleteUser}
                      isPasswordShown={isPasswordShown}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
