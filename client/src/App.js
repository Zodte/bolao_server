import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './actions';

//Components
import Header from './components/Header';
import LeaguesTable from './components/Leagues/LeaguesTable';
import LeagueHome from './components/LeagueHome';
import Admin from './components/Admin/';

import AddChampionship from './components/Admin/AddChampionship';
import AddRound from './components/Admin/AddRound';
import AddScores from './components/Admin/AddScores';
import AddLeague from './components/Leagues/AddLeague';
import MyLeagues from './components/Leagues/MyLeagues';

import data from './states.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: data.players
    }
  }

  componentDidMount(){
    this.props.fetchUser();
  }

  orderPlayersByPosition = (players, round, property="leaguePosition") => {
    const sortFun = ( a, b ) => {
      const aPos = a.rounds[round][property];
      const bPos = b.rounds[round][property];
      if(aPos > bPos){
        return -1;
      }else{
        return 1;
      }
    }
    let arr = players;
    arr.sort(sortFun);
    this.setState({players: arr});
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={LeaguesTable} />
            <Route exact path='/league' component={LeagueHome} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/addChampionship' component={AddChampionship} />
            <Route exact path='/addRound' component={AddRound} />
            <Route exact path='/addLeague' component={AddLeague} />
            <Route exact path='/addScores' component={AddScores} />  
            <Route exact path='/myLeagues' component={MyLeagues} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, userActions)(App);
