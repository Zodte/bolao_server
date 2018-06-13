import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { leaguesTableActions, leagueActions } from '../../actions';
import { withRouter } from 'react-router-dom';

import LeagueRow from './LeagueRow';
import LeaguesJoin from './LeaguesJoin';

class LeaguesTable extends Component {

  componentDidMount(){
    this.props.leaguesTableFetchAll();
  }
  render () {
    const renderLeagueRows = () => {
      return (
        this.props.leaguesTable.allLeagues.map(league => {
          return <LeagueRow league={league} key={league._id} button={{text:'Join', click:promptJoinLeague}}/>
        })
      )
    }
    const promptJoinLeague = league => {
      this.props.leaguesTablePromptJoinLeague(league);
    }
    const joinLeague = (password='') => {
      const leagueID = this.props.leaguesTable.joinSelectedLeague._id
      axios.put('/api/addPlayerToLeague', {password:password, leagueID: leagueID})
      .then(response => {
        const res = response.data;
        if(res.error){
          console.log(res.error)
        }else{
          this.props.leagueAddFetchId(leagueID);
          this.props.history.push('./league')
        }
      })
    }
    return (
      <div>
        < Link to='/addLeague'>Create League</ Link >
        < Link to='/myLeagues'>My Leagues</ Link >
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>Championship</th>
              <th>Players</th>
              <th>Private</th>
              <th>Join</th>
            </tr>
          </thead>
          {
            (this.props.leaguesTable.allLeagues.length) ? renderLeagueRows() : <tbody></tbody>
          }
        </table>
        {
          (this.props.leaguesTable.joinLeaguePrompt) ? <LeaguesJoin league={this.props.leaguesTable.joinSelectedLeague} joinLeague={joinLeague}/> : <p>Select a League to join</p>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    leaguesTable: state.leaguesTable
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({...leaguesTableActions, ...leagueActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesTable);
