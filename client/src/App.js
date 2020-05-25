import React from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import LevelsForm from './components/Levelsform';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Maindata from './components/Alldata';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){

  }

  handleClick(e) {
    console.log('Click happened');
  }

  render(){
    return (
      <Router>

      <div className="App">
        <Navbar className="Color-nav" light expand="md">
          <NavbarBrand className="mx-auto" href="/" style={{color:'white'}}>India Levels.fyi</NavbarBrand>
        </Navbar>
        <br/>
        
        <Switch>
          <Route path="/maindata">
            <Maindata />
          </Route>
          <Route path="/">
            <LevelsForm />
          </Route>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
