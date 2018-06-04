import React, { Component } from 'react';
import LeagueRow from './LeagueRow';
import { Link } from 'react-router-dom';

class LeaguesTable extends Component {

  componentDidMount(){

  }
  render () {
    return (
      <div>
        < Link to='/addLeague'>Create League</ Link >
        <div className="leagueRow">
          <h3>League</h3>
          <h3>Players</h3>
          <h3>Private</h3>
          <button>Join</button>
        </div>
      </div>
    )
  }
}

export default LeaguesTable
