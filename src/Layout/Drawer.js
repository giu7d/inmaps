import React, { Component } from 'react'
import { Drawer as MaterialDrawer } from '@material-ui/core';

import AppBar from '../UI/AppBar';
import PlaceList from '../Places/PlacesList';
import Place from '../Places/Place';

class Drawer extends Component {
  
  render() {
    return (
      <MaterialDrawer className="Drawer"
                      anchor="left"
                      variant = "permanent">

        <AppBar />
        <PlaceList />
        <Place />
      </MaterialDrawer>
    )
  }
}

export default Drawer;