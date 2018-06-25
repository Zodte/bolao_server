import React, { Component } from 'react';

class AddScoreRow extends Component {
  constructor(props){
    super(props);

    this.state = {
      homeTeamScore : 0,
      awayTeamScore: 0
    }
  }
  render(){
    const match = this.props.match;
    return (
      <div>
        <p>{match.homeTeam}</p>
        <input type="number" min="0" value={this.state.homeTeamScore} onChange={e => this.setState({...this.state, homeTeamScore: e.target.value})} />
        <input type="number" min="0" value={this.state.awayTeamScore} onChange={e => this.setState({...this.state, awayTeamScore: e.target.value})} />
        <p>{match.awayTeam}</p>
        <button onClick={() => this.props.saveScore({...match, homeTeamScore: this.state.homeTeamScore, awayTeamScore: this.state.awayTeamScore})}>Save</button>
      </div>
    )
  }
}

export default AddScoreRow;
