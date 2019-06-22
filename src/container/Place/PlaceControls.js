/* global google */

import React, { Component } from 'react'
import { Timeline, AttachFile, AddLocation, MoreVert, Close } from '@material-ui/icons';
import { HeaderControl, IconButton } from '../../presentational';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';


class PlaceControls extends Component {

  // 
  // Google Maps
  // 
  _setDrawingMode = (overlayType) => {
      const { drawAPI } = this.props.map;
      drawAPI.setOptions({
        drawingMode: google.maps.drawing.OverlayType[overlayType],
      });
  }

  _addListener = (action, callback) => {
    google.maps.event.addListener(this.props.map.drawAPI, action, callback);
  }


  // 
  // Contour/Border
  // 
  _createContour = () => {
    this._setDrawingMode('POLYGON');
    this._addListener('polygoncomplete', (polygon) => {          
      
      // 
      // Set Polygon Path
      // 
      // => Map polygon path to a array of 'path size'
      const polygonPathSize = polygon.getPath().getLength();
      const polygonPath = [...new Array(polygonPathSize)]
        .map((el, i) =>  polygon.getPath()
                                .getAt(i)
                                .toUrlValue(6)
                                .match(/(\-?\d+(\.\d+)?)/g));

      // => Convert nested array to string for saving in Firebase. 
      const polygonPathString = JSON.stringify(polygonPath);
  
      // 
      // Set State
      // 
      // => Get border state
      const { border } = this.props.place;

      // => Push a new polygon border
      border.push(polygonPathString);

      // => Set the new polygon to global state 
      this.props.setPlaceBorder(border);

      // 
      // Clear
      // 
      // => Erase old/created polygon
      // 
      this._clearContour(polygon);
      this._setDrawingMode(null);
    });
  }

  _setContour = () => {

    const { border } = this.props.place;

    border.map(contourString => {
      
      // => Parse String to Array
      const contour = JSON.parse(contourString); 
      
      // => Create a new Polygon object
      return new google.maps.Polygon({
        paths: contour.map(el => new google.maps.LatLng(el[0], el[1])),
        strokeColor: getRandomHexColor(),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: getRandomHexColor(),
        fillOpacity: 0.35
      });
    }) 
    .filter(el => el.setMap(this.props.map.mapAPI));
  }

  _clearContour = (polygon) => {
    polygon.setMap(null);
  }


  // 
  // React Components
  // 
  // => set new contour on component update
  componentDidUpdate() {
   this._setContour() 
  }


  render() {

    return (
      <HeaderControl>  
  
         <IconButton icon={<Timeline />} 
                    title="Criar Contorno" 
                    action={ this._createContour } />
 
        <IconButton icon={<AttachFile />} 
                    title="Adicionar Planta" />
        <IconButton icon={<AddLocation />} title="Marcar Salas" />
        <IconButton icon={<MoreVert />} title="Mais" />
        {/* {(true) && <IconButton  icon={<Close style={{ color: 'red' }} />} 
                                title="Sair" 
                                action={ this._clearContour } />} */}
      </HeaderControl>
    )
  }
}


// 
//  Redux
// 
const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaceBorder: (border) => dispatch({
      type: Actions.setPlaceBorder,
      border: border 
    })
  }
}


// 
// Random Color Gen
// 
const getRandomHexColor = () => {

  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceControls);