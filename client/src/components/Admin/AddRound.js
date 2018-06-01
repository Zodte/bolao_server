import React, { Component } from 'react';
import axios from 'axios';
import TimeInput from 'react-time-input';
import Select from 'react-select';

class AddRound extends Component {
  constructor(props){
    super(props);

    this.state = {
      championshipSelector: '',
      selectedChampionship: {},
      gamesInput: 0,
      roundInput: 1,
      championships:[],
      teamsInput:[]
    }
  }

  async componentDidMount(){
    const res = await axios.get('/api/championship');
    await this.setState({
      championshipSelector: res.data[0].name,
      selectedChampionship: res.data[0],
      championships: res.data
    })
  }

  render(){
    const selecteChampionship = (e) => {
      const index = this.state.championships.map( championship => championship.name).indexOf(e.target.value)
      this.setState({...this.state, championshipSelector: e.target.value, selectedChampionship: this.state.championships[index]})
    }

    const updateGamesInput = (e) => {
      let tmpInput = [];
      for(let j=this.state.teamsInput.length; j<e.target.value; j++){
          tmpInput.push({
            homeTeam: '',
            awayTeam: '',
            date: '',
            time: ''
          })
      }
      tmpInput = [...this.state.teamsInput, ...tmpInput];
      this.setState({
        ...this.state,
        teamsInput: tmpInput,
        gamesInput: e.target.value
      })
    }

    const renderGamesForm = () => {
      let gamesInput = []
      if(this.state.selectedChampionship.teams){
        const updateHomeTeamArr = (value, i, prop) => {
          let arr = [...this.state.teamsInput];
          arr[i][prop] = value;
          this.setState(
            {
              ...this.state,
              teamsInput: arr
            }
          )
        }
        const teamsOptions =
        this.state.selectedChampionship.teams.map((team) => {
          return {
            value: team,
            label: team
          }
        })

        for(let i=0; i<this.state.gamesInput; i++){
          gamesInput.push(<div key={i}>
            <input type='date' onChange={e => updateHomeTeamArr(e.target.value, i, 'date')}/>
            <TimeInput onTimeChange={value => updateHomeTeamArr(value, i, 'time')} />
            <Select options={teamsOptions} onChange={value => updateHomeTeamArr(value.value, i, 'homeTeam')}/>
            <Select options={teamsOptions} onChange={value => updateHomeTeamArr(value.value, i, 'awayTeam')}/>
          </div>)
        }
      }
      return gamesInput;
    }

    const submitRound = () => {
      //Check if there are any repeated or empty teamInputs
      if(this.state.gamesInput < 1){
        return;
      }
      let checkArray = [];
      const isEmptyOrRepeat = team => {
        if(team === '' || checkArray.indexOf(team) >= 0){
          return true;
        }else{
          return false
        }
      }
      for(let i in this.state.teamsInput){
        let game = this.state.teamsInput[i]
        if(isEmptyOrRepeat(game.homeTeam)){
          return;
        }else{
          checkArray.push(game.homeTeam);
        }
        if(isEmptyOrRepeat(game.awayTeam)){
          return;
        }else{
          checkArray.push(game.awayTeam);
        }
        //Check if date and time were completed
        if(!(game.date != '' && game.time != '')){
          return;
        }
        let dat = new Date(game.date);
        if(dat.getTime() < Date.now()){
          return;
        }
      }

      const round = {
        round : parseInt(this.state.roundInput),
        matches : this.state.teamsInput,
        championship_ID : this.state.selectedChampionship._id
      }
      axios.post('/api/round', round)
    }

    return(
      <div>
        <select className="championshipSelector" value={this.state.championshipSelector} onChange={(e) => selecteChampionship(e)}>
          {
            this.state.championships.map((championship) => {
              return(
                <option key={championship._id}>{championship.name}</option>
              )
            })
          }
        </select>
        <label>Round
          <input type='number' name='round' value={this.state.roundInput} onChange={((e) => this.setState({...this.state, roundInput: e.target.value}))} min='1'/>
        </label>
        <label>Games
          <input type='number' name='round' value={this.state.gamesInput} onChange={updateGamesInput} min='1'/>
        </label>
        {
          renderGamesForm()
        }
        <button onClick={submitRound}>Submit</button>
      </div>
    )
  }
}

export default AddRound;
