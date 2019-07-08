/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import { withStyles } from '@material-ui/core';

const styles = {
  map: {
    position: 'absolute',
    top: 0,
    margin: 0,
    width: `100vw`,
    height: `100vh`
  }
}


class Map extends Component {
  
  // 
  // API
  // Google Maps, Draw Library, Overlays...
  // 
  _initAPIs = () => {
    // => Init. API's
    const mapAPI = this._startMapAPI();
    const drawAPI = this._startDrawAPI();

    // => Set Managers to API's
    drawAPI.setMap(mapAPI);

    // => Store API's state
    const { setMapAPI, setDrawAPI } = this.props;
    setMapAPI(mapAPI);
    setDrawAPI(drawAPI);
  }

 _startMapAPI = () => {
    return new google.maps.Map(document.getElementById('map'), {
      center:  new google.maps.LatLng(this.props.lat, this.props.lng),
      zoom: this.props.zoom
    });
  }

  _startDrawAPI = () => {
    return new google.maps.drawing.DrawingManager({
      drawingControl: false
    });
  }

  // 
  // Maps Options
  // 
  _changeMapPosition = () => {

    const { mapAPI, lat, lng, zoom } = this.props.map;
    
    mapAPI.setCenter({
      lat: lat,
      lng: lng
    });

    mapAPI.setZoom(zoom);
  }
  
  
  // 
  // React Components
  // 
  componentDidMount() {
    this._initAPIs()
  }
  
  componentDidUpdate() {
    this._changeMapPosition();
  }

  render() {
    const { classes } = this.props;
    return (
        <div  id="map"
              className={classes.map}>
        </div>
    );
  }
  
}


// 
// REDUX
// 
const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMapAPI: (mapAPI) => dispatch({
      type: Actions.setMapAPI,
      mapAPI: mapAPI
    }),
    setDrawAPI: (drawAPI) => dispatch({
      type: Actions.setMapDrawAPI,
      drawAPI: drawAPI
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Map));