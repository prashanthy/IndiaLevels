import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import LevelsForm from './Levelsform';
import {Navbar, NavbarBrand} from 'reactstrap'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('Click happened');
  }

  render(){
    return (
      <div className="App">
        <div style={{textAlign:'center'}}>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">India Levels.fyi</NavbarBrand>

          </Navbar>
        </div>
        <LevelsForm />
      </div>
    );
  }
}

export default App;
