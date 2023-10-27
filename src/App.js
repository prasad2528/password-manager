import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    latestList: [],
    isTrue: false,
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSubmitData = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const colors = colorList[Math.floor(Math.random() * 5)]
    const newItem = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: colors,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newItem],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      isShow,
      searchInput,
      latestList,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="card-container">
          <form className="input-container" onSubmit={this.onClickSubmitData}>
            <h2>Add New Password</h2>
            <div className="container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="logo"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
                className="input"
              />
            </div>
            <div className="container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="logo"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
                className="input"
              />
            </div>
            <div className="container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="logo"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
                className="input"
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager"
            alt="password manager"
          />
        </div>
        <div className="main-container">
          <div className="card-headings">
            <div className="headings">
              <h2 className="heading">Your Passwords</h2>
              <p className="length">{newList.length}</p>
            </div>
            <div className="flex">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="logo"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
                value={searchInput}
                className="input"
              />
            </div>
          </div>
          <div className="password-container">
            <input
              type="checkbox"
              id="check"
              onChange={this.showPassword}
              className="checkbox"
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          <div className="passwords">
            {!isTrue && (
              <div className="empty-list">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="empty"
                />
                <p className="alert">No Passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="result-container">
                {newList.map(eachValue => (
                  <li className="list" id={eachValue.id} key={eachValue.id}>
                    <p className={`initial ${eachValue.classAdd}`}>
                      {eachValue.initialValue}
                    </p>
                    <div className="list-content">
                      <p className="website-name">{eachValue.websiteName}</p>
                      <p className="username-name">{eachValue.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars"
                        />
                      )}
                      {isShow && (
                        <p className="password">{eachValue.Password}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      data-testid="delete"
                      className="delete-btn"
                      onClick={() => this.deleteItem(eachValue.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
