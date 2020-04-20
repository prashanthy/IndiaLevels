import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import LevelsForm from './Levelsform';

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
          <Button color="primary" onClick={this.handleClick}>Check Console</Button>
        </div>
        <LevelsForm />
      </div>
    );
  }
}

export default App;
