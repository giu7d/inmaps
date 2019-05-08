import React, { Component } from 'react';
import Drawer from './Layout/Drawer';
import Map from './Layout/Map';

class App extends Component {
  
  render() {
    return (
      <main>
        <Drawer></Drawer>
        <Map></Map>
      </main>
    )
  }
}

export default App;
