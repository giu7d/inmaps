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
  // Starting API's
  // Google Maps and Draw Library Manager
  // 
  
  _startMapAPI = () => {
    return new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      zoom: this.props.zoom
    });
  }

  _startDrawAPI = () => {
    return new google.maps.drawing.DrawingManager({
      // drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false
    });
  }

  // 
  // Manipulating Maps
  // 
  
  _changeMapPosition = (map, lat, lng, zoom) => {
    map.setCenter({
      lat: lat,
      lng: lng
    });
    map.setZoom(zoom);
  }

  // 
  // Component Functions
  // 
  
  componentDidMount() {
    const { setMapAPI, setDrawAPI } = this.props;
    const mapAPI = this._startMapAPI();
    const drawAPI = this._startDrawAPI();

    drawAPI.setMap(mapAPI);

    setMapAPI(mapAPI);
    setDrawAPI(drawAPI);
  
  }
  
  componentDidUpdate() {
    const { mapAPI, lat, lng, zoom } = this.props.map;
    this._changeMapPosition(mapAPI, lat, lng, zoom);
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