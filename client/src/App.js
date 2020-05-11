import React from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import LevelsForm from './Levelsform';


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
      <div className="App">
        <Navbar className="Color-nav" light expand="md">
          <NavbarBrand className="mx-auto" href="/" style={{color:'white'}}>India Levels.fyi</NavbarBrand>
        </Navbar>
        <br/>
        <LevelsForm />
      </div>
    );
  }
}

export default App;
