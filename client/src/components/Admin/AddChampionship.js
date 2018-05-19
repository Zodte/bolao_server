import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adminActions from '../../actions/adminActions';
import axios from 'axios';

class AddChampionship extends Component {
  constructor(props){
    super(props);

    this.state = {
      championship_name: '',
      team_name: '',
      teams: [],
      championships: [],
      selectedChampionship: {}
    }
  }

  componentDidMount(){
    this.getChampionships();
  }

  getChampionships(){
    axios.get('/api/championship')
    .then(response => {
      this.setState({
        ...this.state,
        championships: response.data
      });
    })
  }

  render(){
    const addTeam = () => {
      const team = this.state.team_name
      const ok = this.state.teams.indexOf(team);
      if(ok === -1 && team != ''){
        this.setState({
          ...this.state,
          teams: [ ...this.state.teams, team],
          team_name: ''
        })
      }
    }
    const removeTeam = team => {
      const team_index = this.state.teams.indexOf(team);
      let newTeams = [...this.state.teams];
      newTeams.splice(team_index,1);
      this.setState({
        ...this.state,
        teams: newTeams
      })
    }
    const createChampionship = () => {
      if(this.state.championship_name != ''){
        const championship = {
          name: this.state.championship_name,
          teams: this.state.teams
        }
        this.props.adminCreateNewChampionship(championship)
        this.getChampionships()
      }
    }
    const showTeamInfo = () => {
      const champs = this.state.selectedChampionship;

      const isEmpty = obj =>{
        for(var prop in champs) {
            if(champs.hasOwnProperty(prop))
                return false;
        }
        return true;
      }
      if( !isEmpty(champs) ){
        return(
          <div>
            <p>{champs.name}</p>
            {champs.teams.map((team) => team )}
          </div>
        )
      }

    }

    return(
      <div>
        <input type="text" placeholder="Championship Name" value={ this.state.championship_name } onChange={ e => this.setState({ ...this.state, championship_name: e.target.value }) } />
        <ul>
          {
            this.state.teams.map(
              team => {
                return (
                   <li key={team}>
                     {this.state.teams.indexOf(team)+1}
                     {team}
                     <button name={team} onClick={(e) => removeTeam(e.target.name)}>Remove</button>
                   </li>
                )
              }
            )
          }
        </ul>
        <input
          type="text" placeholder="Team Name"
          value={ this.state.team_name }
          onChange={ e => this.setState({ ...this.state, team_name: e.target.value }) }
          onKeyPress={ e => {
            if(e.key === 'Enter'){
              addTeam();
            }
          }}
          />
        <button onClick={ addTeam }>Add Team</button>
        <button onClick={ createChampionship }>Create Championship</button>
        <h3>Existing Championships</h3>
        {
          this.state.championships.map(championship => {
          return <p key={championship._id} onClick={((e) => this.setState({...this.state, selectedChampionship: championship}))}>{championship.name}</p>
          })
        }
        {
          showTeamInfo()
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(adminActions, dispatch);
}

export default connect(null, mapDispatchToProps)(AddChampionship);
