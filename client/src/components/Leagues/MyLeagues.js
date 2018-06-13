import React, { Component } from 'react';
import { connect } from 'react-redux';
import { leaguesTableActions, leagueActions } from '../../actions';
import LeagueRow from './LeagueRow';

class MyLeagues extends Component {
  componentDidMount(){
    this.props.leaguesTableFetchMyLeagues();
  }
  render(){
    const renderLeagueRows = () => {
      return (
        this.props.leaguesTable.allLeagues.map(league => {
          return <LeagueRow league={league} key={league._id} button={{text:'Open', click:openLeague}}/>
        })
      )
    }
    const openLeague = league => {
      this.props.leagueAddFetchId(league._id);
      this.props.history.push('./league')
    }
    return (
      <div>
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
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    leaguesTable: state.leaguesTable
  }
}

export default connect(mapStateToProps, {...leaguesTableActions, ...leagueActions})(MyLeagues);
