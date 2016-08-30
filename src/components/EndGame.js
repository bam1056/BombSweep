import React, {Component} from 'react'

class EndGame extends Component {
  reset = () => {
    window.location.reload()
  }
  render () {
    return <div className="Result">
      <h1>You {this.props.result}</h1>
      <button onClick={this.reset}>StartOver</button>
    </div>
  }
}
EndGame.propTypes = {
  result: React.PropTypes.string.isRequired
}
export default EndGame
