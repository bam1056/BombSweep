import React, { Component } from 'react'
import Cell from './Cell'

const API_URL = 'http://minesweeper-api.herokuapp.com'

class Game extends Component {
  constructor () {
    super()
    this.state = {
      board: [],
      turns: 0
    }
  }

  componentDidMount () {
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
      <h1>The Score Is: {this.state.turns}</h1>
      <h1>Bomb Sniffer!</h1>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  }
}
Game.propTypes = {
  difficulty: React.PropTypes.string.isRequired
}
export default Game
