/* global google */

import { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import BlueprintOverlay from './BlueprintOverlay';
import Utils from '../../utils/Utils';

class Blueprint extends Component {

  
  state = {
    overlays: [],
  }

  create = (blueprint) => {

    const { mapAPI } = this.props.map;
    const { border } = blueprint;

    const sw = border.getSouthWest();
    const ne = border.getNorthEast();
    
    const markerA = new google.maps.Marker({
      position: sw,
      visible: false,
      map: mapAPI,
      draggable: true,
      title: `SW: lat:${sw.lat()} + lng: ${sw.lng()}`
    });

    const markerB = new google.maps.Marker({
      position: ne,
      visible: false,
      map: mapAPI,
      draggable: true,
      title: `NE: lat:${ne.lat()} + lng: ${ne.lng()}`
    });

    const overlay = new BlueprintOverlay(mapAPI, blueprint, markerA, markerB, () => {
      this.props.setLayerView('BLUEPRINT_OPTIONS');
      window.selectOverlay = overlay;
    });

    const updatePoints = () => {
      const newPointA = markerA.getPosition();
      const newPointB = markerB.getPosition();
      const newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
      overlay.updateBounds(newBounds);
    }

    Utils.addListener(markerA, 'drag', updatePoints);
    Utils.addListener(markerB, 'drag', updatePoints);

    return overlay;
  }

  load = () => {

    const { blueprint, center } = this.props.place;

    blueprint.forEach(async (bl, index) => { 

      const {url, border} = bl
      const {width, height} = await Utils.getImageMeta(url);
      
      bl.border = (border === null) ? (new google.maps.LatLngBounds(
        new google.maps.LatLng(center.latitude, center.longitude),
        new google.maps.LatLng(center.latitude + (height * 0.000001), center.longitude + (width * 0.000001))
      )): (new google.maps.LatLngBounds(
        new google.maps.LatLng(border.sw.latitude, border.sw.longitude),
        new google.maps.LatLng(border.ne.latitude, border.ne.longitude),
      ));

      const overlay = this.create(bl);
      
      this.save(overlay);        
    });    
  }

  position = (overlay, visibility) => {

    const { markerA, markerB } = overlay;
    
    markerA.setVisible(visibility);
    markerB.setVisible(visibility);
    
  }

  transform = (overlay, angle, scale) => {
    overlay.updateTransform(angle, scale);
  }
  
  delete = (overlay) => {

    
    overlay.setMap(null);

    const { overlays } = this.state;
    const index = overlays.indexOf(overlay);
    overlays.splice(index, 1);
    
    this.setState({ overlays: [...overlays] });
  }

  save = (overlay) => {

    const { overlays } = this.state;
    const index = overlays.indexOf(overlay);

    if ( index === -1) {
      overlays.push(overlay);
    } else {
      overlays[index] = overlay;
    }

    this.setState({ overlays: [...overlays] })

    // Upload

    const { place } = this.props;

    const blueprints = overlays.map(overlay => {
      return {
        url: overlay._src,
        image: overlay._image,
        border: {
          sw: {
            latitude: overlay._bounds.getSouthWest().lat(),
            longitude: overlay._bounds.getSouthWest().lng(),
          },
          ne: {
            latitude: overlay._bounds.getNorthEast().lat(),
            longitude: overlay._bounds.getNorthEast().lng(),
          }
        },
        scale: overlay._scale,
        rotation: overlay._rotation
      }
    })

    console.log(blueprints);

    place.blueprint = [...blueprints];
    this.props.update(place);
  }


  componentWillMount() {
    // Map functions to redux
    this.props.setTransformFunction(this.transform);
    this.props.setPositionFunction(this.position);
    this.props.setDeleteFunction(this.delete);
    this.props.setSaveFunction(this.save);
  }

  componentDidMount() {
    if (this.props.place.blueprint.lenght !== 0){
      this.load();
    }
  }



  componentWillUnmount() {
    this.state.overlays.map(overlay => overlay.setMap(null));
    this.props.setTransformFunction(null);
    this.props.setPositionFunction(null);
    this.props.setDeleteFunction(null);
    this.props.setSaveFunction(null);
  }

  
  render() { return null }

}


// 
// Redux
// 
const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLayerView: (TYPE) => dispatch({
      type: Actions.setLayerView,
      layerView: TYPE
    }),
    setTransformFunction: (func) => dispatch({
      type: Actions.setOverlayTransformFunc,
      transformFunc: func
    }),
    setPositionFunction: (func) => dispatch({
      type: Actions.setOverlayPositionFunc,
      positionFunc: func
    }),
    setDeleteFunction: (func) => dispatch({
      type: Actions.setOverlayDeleteFunc,
      deleteFunc: func
    }),
    setSaveFunction: (func) => dispatch({
      type: Actions.setOverlaySaveFunc,
      saveFunc: func
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blueprint)
