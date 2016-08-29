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
      time: 0,
      min: 0
    }
  }
  _goHome = () => {
    this.props.goHome('home')
  }

  componentDidMount () {
    const start = new Date()
    let minutes = 0
    setInterval(() => {
      let end = new Date()
      let time = moment.duration(end - start).seconds()
      if (time >= 59) { minutes++ }
      this.setState({time: time, min: minutes})
    }, 1000)
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
      <h1>{this.state.min}:{this.state.time}</h1>
      <h1>The Score Is: {this.state.turns}</h1>
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
