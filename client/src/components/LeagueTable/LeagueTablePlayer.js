import React, { Component } from 'react';

class LeagueTablePlayer extends Component {
  render () {
    const round = this.props.round;
    return (
      <tr>
        <td>{round.leaguePosition}</td>
        <td>{round.leaguePoints}</td>
        <td>{this.props.name}</td>
        <td>{round.leaguePerfect}</td>
        <td>{round.leagueCorrect}</td>
        <td>{round.leagueMisses}</td>
        <td>{round.gold}</td>
        <td>{round.silver}</td>
        <td>{round.bronze}</td>
        <td>{round.underdog}</td>
      </tr>
    )
  }
}

export default LeagueTablePlayer;
