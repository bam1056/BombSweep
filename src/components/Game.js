import React, { Component } from 'react'
import Cell from './Cell'
import moment from 'moment'
moment().format()

const API_URL = 'http://minesweeper-api.herokuapp.com'

class Game extends Component {
  constructor () {
    super()
    this.state = {
      board: [],
      turns: 0,
      time: ''
    }
  }
  _goHome = () => {
    this.props.goHome('home')
  }

  componentDidMount () {
    const start = new Date()
    setInterval(() => {
      let end = new Date()
      let diff = moment.duration(end - start)
      let time = '0' + diff.minutes().toString() + ':0' + diff.seconds().toString()
      this.setState({time: time})
    }, 500)
    window.fetch(`${API_URL}/games?difficulty=${this.props.difficulty}`, {
      method: 'POST'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState(data)
    })
  }

  revealCell = (row, col) => {
    this.setState({turns: this.state.turns + 1})
    window.fetch(`${API_URL}/games/${this.state.id}/check?row=${row}&col=${col}`, {
      method: 'POST'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState(data)
    })
  }

  flagCell = (row, col) => {
    window.fetch(`${API_URL}/games/${this.state.id}/flag?row=${row}&col=${col}`, {
      method: 'POST'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState(data)
    })
  }

  render () {
    const rows = this.state.board.map((row, i) => {
      const cells = row.map((cell, j) => {
        return <Cell
          type={cell}
          revealCell={this.revealCell}
          flagCell={this.flagCell}
          row={i}
          col={j}
          key={j} />
      })
      return <tr key={i}>{cells}</tr>
    })
    return <div className="Game">
      <div className="Stats">
        <h1>|Timer:| {this.state.time}</h1>
        <h1>|Score:| {this.state.turns}</h1>
      </div>
      <h1>Bomb Sniffer!</h1>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
      <br />
      <button onClick={this._goHome}>Start New Game</button>
    </div>
  }
}
Game.propTypes = {
  difficulty: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.number.isRequired
  ]),
  goHome: React.PropTypes.func.isRequired
}
export default Game
