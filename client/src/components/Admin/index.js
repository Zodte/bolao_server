import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {
  render(){
    return(
      <div>
        <Link to='/addChampionship'>Add Championship</Link>
        <Link to='/addRound'>Add Round</Link>
        <Link to='/addScores'>Add Scores</Link>
      </div>
    )
  }
}

export default Admin;
