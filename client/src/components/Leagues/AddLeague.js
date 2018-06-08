import React, { Component } from 'react';
import axios from 'axios';

class AddLeague extends Component {
  constructor(props){
    super(props);

    this.state = {
      championshipSelector: '',
      selectedChampionship: {},
      championships:[],
      nameInput: '',
      privateInput: true,
      playersLimitInput: '1',
      passwordInput: ''

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
    const createNewLeague = () => {
      const playersLimit = parseInt(10, this.state.playersLimitInput)
      if(this.state.nameInput.length < 3 || this.state.nameInput.length > 36){
        console.log('The league name must be between 3 and 36 characters long');
        return;
      }
      if(this.state.privateInput && (this.state.passwordInput.length < 6 || this.state.passwordInput.length > 36)){
        console.log(this.state.passwordInput)
        console.log('Private leagues need a password with length between 6 and 36 characters long');
        return;
      }
      if(isNaN(playersLimit)){
        console.log('A number must be entered for the players limit input');
        return;
      }
      if(playersLimit < 1 || playersLimit > 999){
        console.log('This number of players is not allowed')
        return;
      }

      const league = {
        name: this.state.nameInput,
        private: this.state.privateInput,
        password: (this.state.privateInput) ? this.state.passwordInput : '',
        playersLimit: playersLimit,
        championship_ID: this.state.selectedChampionship._id
      }
      axios.post('/api/league', league)
      .then(response => console.log(response))
    }

    return (
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
        <label> Name
          <input type="text" value={this.state.nameInput} onChange={(e) => this.setState({...this.state, nameInput: e.target.value})} />
        </label>
        <label> Private
          <input type="checkbox" checked={this.state.privateInput} onChange={(e) => this.setState({...this.state, privateInput: e.target.checked})} />
        </label>
        <label> Password
          <input type="text" disabled={!this.state.privateInput} value={this.state.passwordInput} onChange={(e) => this.setState({...this.state, passwordInput: e.target.value})} />
        </label>
        <label>Players Limit
          <input type="number" min="1" max="999" value={this.state.playersLimitInput} onChange={(e) => this.setState({...this.state, playersLimitInput: e.target.value})} />
        </label>
        <button onClick={createNewLeague}>Create</button>

      </div>
    )
  }
}

export default AddLeague;
