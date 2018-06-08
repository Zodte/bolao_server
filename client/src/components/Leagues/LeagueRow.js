import React, { Component } from 'react';

class LeagueRow extends Component {
  render () {
    return (
      <tbody>
        <tr>
          <td>{this.props.league.name}</td>
          <td>{this.props.league.championship_ID.name}</td>
          <td>{this.props.league.players.length}/{this.props.league.playersLimit}</td>
          <td>{this.props.league.private ? 'Yes' : 'No'}</td>
          <td><button onClick={() => this.props.promptJoinLeague(this.props.league)}>Join</button></td>
        </tr>
      </tbody>
    )
  }
}

export default LeagueRow;
