import React, { Component } from 'react';
import Drawer from './container/Layout/Drawer';
import Map from './container/Layout/Map';

class App extends Component {
  
  render() {
    return (
      <main>
        <Drawer />
        <Map />
      </main>
    )
  }
}

export default App;
