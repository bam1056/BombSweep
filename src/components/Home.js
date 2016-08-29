import React, { Component } from 'react'
import { Select } from 'rebass'

class Home extends Component {
  _handleClick = () => {
    this.props.navigate('game')
  }
  render () {
    return <div className="Home">
    <h1>Welcome to BombSniffer&trade;</h1>
      <Select
        label="Select Your Difficulty"
        name="Difficulty Level"
        options={[{children: 'Hard', value: 2}, {children: 'Medium', value: 1}, {children: 'Easy', value: 0}]}
        rounded
      />
      <br />
      <button onClick={this._handleClick}>Happy Sweeping!</button>
    </div>
  }
}

Home.propTypes = {
  navigate: React.PropTypes.func.isRequired
}

export default Home
