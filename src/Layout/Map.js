import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { BaseMap } from '../UI';


class Map extends Component {
  render() {
    return (
      <Grid item 
            xl={12}
            className="FullHeight">

      <BaseMap 
        zoom={17}
        center={{lat: -25.300763, lng: -54.114198}}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb4pC6745EetjePNEQLn1936Wg4yYRceQ&v=3.exp&libraries=geometry,drawing,places"
      />
      </Grid>
    )
  }
}

export default Map;