import React, { Component } from 'react';

class RoundTablePlayer extends Component {
    render(){
      const round = this.props.round;
      return (
        <tr>
          <td>{round.roundPosition}</td>
          <td>{round.roundPoints}</td>
          <td>{this.props.name}</td>
          <td>{round.roundPerfect}</td>
          <td>{round.roundCorrect}</td>
          <td>{round.roundMisses}</td>
        </tr>
      )
    }
}

export default RoundTablePlayer;
