import React, { Component } from 'react'
import Game from './Game'
import Home from './Home'
import '../styles/screen.sass'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentScreen: 'home'
    }
  }

  _changePage = (scr) => {
    this.setState({ currentScreen: scr })
  }

  render () {
    let screen
    switch (this.state.currentScreen) {
      case 'home': screen = <Home navigate={this._changePage} />
        break
      case 'game': screen = <Game difficulty={this.state.difficulty} />
        break
      default: screen = <Home navigate={this._changePage} />
    }
    return <div className="App">
      {screen}
    </div>
  }
}

export default App
