import React, { Component } from 'react'

class Home extends Component {
  _handleClick = () => {
    this.props.navigate('game')
  }
  render () {
    return <div className="Home">
      <button onClick={this._handleClick}>StartSweeping</button>
    </div>
  }
}
export default Home
