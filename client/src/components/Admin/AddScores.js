import React, { Component } from 'react';
import axios from 'axios';
import AddScoreRow from './AddScoreRow'

class AddScore extends Component {
  constructor(props){
    super(props);

    this.state = {
      championshipSelector: '',
      selectedChampionship: {},
      roundInput: 1,
      championships:[],
      selectedRound: 1,
    }
  }

  async componentDidMount(){
    const res = await axios.get('/api/championship');

    await this.setState({
      championshipSelector: res.data[0].name,
      selectedChampionship: res.data[0],
      championships: res.data,
      rounds: [],
      selectedRound: 1,
    })

    this.getChampionshipRounds()

  }
  async getChampionshipRounds(){
    const res = await axios.get(`/api/rounds/?championship_ID=${this.state.selectedChampionship._id}`)
    await this.setState({
      ...this.state,
      rounds: res.data
    })
  }
  renderRow(){
    if(this.state.rounds){
      if(this.state.rounds.length){
        return this.state.rounds[this.state.selectedRound].matches.map(match => {
          return (
            <AddScoreRow key={match._id} match={match} saveScore={this.saveScore}/>
          )
        });
      }
    }
  }

  async saveScore(match){
    const res = await axios.post('/api/saveMatchScore', match);
    console.log(res.data);
  }

  render(){
    const selecteChampionship = async (e) => {
      const index = this.state.championships.map( championship => championship.name).indexOf(e.target.value)
      await this.setState({...this.state, championshipSelector: e.target.value, selectedChampionship: this.state.championships[index]});
      this.getChampionshipRounds();
    }
    const setSelectedRound = (e) => {
      if(e.target.value > 0 && e.target.value < this.state.rounds.length){
        this.setState({ ...this.state, selectedRound: e.target.value })
      }
    }

    return (
      <div>
        <select value={this.state.championshipSelector} onChange={(e) => selecteChampionship(e)}>
          {
            this.state.championships.map((championship) => {
              return(
                <option key={championship._id}>{championship.name}</option>
              )
            })
          }
        </select>
        <p>Round</p>
        <input type="number" value={this.state.selectedRound} min="1" onChange={setSelectedRound}/>
        {
          this.renderRow()
        }
      </div>


    )
  }
}

export default AddScore;
