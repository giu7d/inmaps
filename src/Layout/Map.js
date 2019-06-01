/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../Redux/Actions';
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
  

  // Start Drawing tools
  // _startDrawMgmt = () => {

  //   const drawingManager = new google.maps.drawing.DrawingManager({
  //     drawingMode: google.maps.drawing.OverlayType.MARKER,
  //     drawingControl: true,
  //     drawingControlOptions: {
  //       position: google.maps.ControlPosition.TOP_CENTER,
  //       drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
  //     },
  //     markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
  //     circleOptions: {
  //       fillColor: '#ffff00',
  //       fillOpacity: 1,
  //       strokeWeight: 5,
  //       clickable: false,
  //       editable: true,
  //       zIndex: 1
  //     }
  //   });

  //   this.setState({drawMgmt: drawingManager})

  // }

  _startMap = () => {
    return new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      zoom: this.props.zoom
    });
  }

  _changeMapPosition = (map, lat, lng, zoom) => {
    map.setCenter(new google.maps.LatLng(lat, lng));
    map.setZoom(zoom);
  }

  componentDidMount() {
    const { setup } = this.props;
    setup(this._startMap());
  }

  componentDidUpdate() {
    const { map, lat, lng, zoom } = this.props;
    this._changeMapPosition(map, lat, lng, zoom);
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

const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setup: (map) => dispatch({
      type: Actions.setMap,
      map: map
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Map));