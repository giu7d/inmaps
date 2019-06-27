/* global google */

import React, { Component } from 'react';
import Utils from '../../utils/Utils';
import { connect } from 'react-redux';

import { Timeline } from '@material-ui/icons';
import { IconButton } from '../../presentational';


class PlaceBorder extends Component{

  create = () => {

    const { drawAPI } = this.props.map;

    Utils.setDrawingMode(drawAPI, 'POLYGON');
    
    Utils.addListener(drawAPI, 'polygoncomplete', (poly) => {

      google.maps.event.clearListeners(poly, 'polygoncomplete'); 
      Utils.setDrawingMode(drawAPI, null);
      Utils.addPolygonEvents(poly, this.save);
      
      this.save(poly);
    });
  }

  save = (polygon) => {

    let  place  = this.props.place;
    
    const index = place.border.indexOf(polygon);

    if ( index === -1) {
      place.border.push(polygon);
    } else {
      place.border[index] = polygon;
    }

    this.props.update(place);
  }

  load = () => {

    const { border } = this.props.place;
    const { mapAPI } = this.props.map;

    const polygons = border.map(pathString => {

      const paths = JSON.parse(pathString);

      return new google.maps.Polygon({
        paths: paths.map(coord => new google.maps.LatLng(coord[0], coord[1])),
        strokeColor: Utils.getRandomHexColor(),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: Utils.getRandomHexColor(),
        fillOpacity: 0.35,
        editable: true,
      });
    })
    .filter(polygon => {
      polygon.setMap(mapAPI);
      Utils.addPolygonEvents(polygon, this.save);
      return polygon;
    });
    
    this.props.setBorder(polygons);
  }

  componentDidMount() {
    if (this.props.place.border.lenght !== 0) {
      this.load();
    }
  }

  componentWillUnmount() {
    Utils.removeAllPolygonsEvents(this.props.place.border);
  }

  render() {
    return (
      <IconButton icon={<Timeline />} title="Criar Contorno" action={this.create} />
    )
  }
}


// 
// Redux
// 
const mapStateToProps = (state) => {
  return {...state};
}

export default connect(
  mapStateToProps
)(PlaceBorder)
