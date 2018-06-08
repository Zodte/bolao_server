import React, { Component } from 'react';

class LeaguesJoin extends Component {
  render(){
    return (
      <div>
        <p>Would you like to join {this.props.league.name}</p>
        <p>{this.props.league.players.length}/{this.props.league.playersLimit} players</p>
        <p>{this.props.league.championship_ID.name}</p>
        {(this.props.league.private) ? <label>Password<input id="leaguesJoin_password" type="password"/></label> :<input id="leaguesJoin_password" hidden type="password"/>}
        <button onClick={() => this.props.joinLeague(document.getElementById('leaguesJoin_password').value)}>Join</button>
      </div>
    )
  }
}

export default LeaguesJoin;
