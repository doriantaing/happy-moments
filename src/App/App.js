import React, { Component } from 'react';
import '../assets/style/style.scss';

class App extends Component {
  async componentDidMount(){
    const res = await fetch('http://localhost:5000')
    const { data } = await res.json();
    console.log(data)

  }
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
