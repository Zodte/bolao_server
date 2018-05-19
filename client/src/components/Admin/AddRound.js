import React, { Component } from 'react';
import axios from 'axios';
import TimeInput from 'react-time-input';

class AddRound extends Component {
  constructor(props){
    super(props);

    this.state = {
      championshipSelector: '',
      selectedChampionship: {},
      gamesInput: 1,
      roundInput: 1,
      championships:[]
    }
  }

  async componentDidMount(){
    const res = await axios.get('/api/championship');
    await this.setState({
      championshipSelector: res.data[0].name,
      selectedChampionship: res.data[0],
      championships: res.data
    })
    console.log(res.data[0])
  }

  render(){
    const onTimeChange = () => {

    }

    const selecteChampionship = (e) => {
      const index = this.state.championships.map( championship => championship.name).indexOf(e.target.value)
      this.setState({...this.state, championshipSelector: e.target.value, selectedChampionship: this.state.championships[index]})
    }

    const renderGamesForm = () => {
      let gamesInput = []
      if(this.state.selectedChampionship.teams){
        for(let i=0; i<this.state.gamesInput; i++){
          gamesInput.push(<div key={i}>
            <input type='date' />
            <TimeInput initTime='12:30' />
            <select>
            {
              this.state.selectedChampionship.teams.map( team => {
                return <option key={team}>{team}</option>
              })
            }
            </select>
            <input type='text' placeholder='Home Team'/>
            <input type='text' placeholder='Away Team'/>
          </div>)
        }
      }
      return gamesInput;
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
          <input type='number' name='round' value={this.state.gamesInput} onChange={((e) => this.setState({...this.state, gamesInput: e.target.value}))} min='1'/>
        </label>
        {
          renderGamesForm()
        }
        {
          this.state.selectedChampionship.teams
        }
      </div>
    )
  }
}

export default AddRound;
