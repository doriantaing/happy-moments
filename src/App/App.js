import React, { Component } from 'react';
import '../assets/style/style.scss';
import Complete from './Complete.js'
import Home from './Home.js'
import About from './About.js'

class App extends Component {
  async componentDidMount(){
    const res = await fetch('http://localhost:5000/all')
    const { data } = await res.json();
    console.log(data)
  }
  render() {
    return (
      <div className="App">
        {/* <Home/> */}
        <About/>
        {/* <Complete/> */}
      </div>
    );
  }
}

export default App;
