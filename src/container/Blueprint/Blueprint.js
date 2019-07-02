/* global google */

import { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import BlueprintOverlay from './BlueprintOverlay';
import Utils from '../../utils/Utils';

class Blueprint extends Component {

  // Create Overlay Instances from a Blueprint
  create = (blueprint) => {

    const { mapAPI } = this.props.map;
    const { border } = blueprint;

    const sw = border.getSouthWest();
    const ne = border.getNorthEast();
    
    // Size/Position COntrol Markers
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

    const overlay = new BlueprintOverlay(mapAPI, blueprint, markerA, markerB, this.save, this.delete);

    //Markers Logic
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

  //  Load Overlays[] from Place Blueprint[]
  load = () => {

    const { blueprint, center } = this.props.place;

    blueprint.forEach(async (bl) => { 

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

  // Add a new or modified Overlay to Overlays[]
  save = (overlay) => {

    const { overlays, setOverlays } = this.props;
    const index = overlays.indexOf(overlay);

    if (index === -1) {
      overlays.push(overlay);
    } else {
      overlays[index] = overlay;
    }
    
    setOverlays(overlays);
    this._store(overlays);
  }

  // Delete from Overlays[]
  delete = (index) => {
    
    const { overlays, setOverlays } = this.props;

    overlays.splice(index, 1);

    setOverlays(overlays);
    this._store(overlays);
  }

  // Persist changes to Redux Store and Firebase
  _store= (overlays) => {

    const { place } = this.props;
    const blueprints = overlays.map(overlay => overlay.getAsBlueprint());

    place.blueprint = [...blueprints];
    this.props.update(place);
  }

  componentDidMount() {

    // Load Overlays from Place Blueprit 
    const { blueprint} = this.props.place;
    if (blueprint.lenght !== 0){
      this.load();
    }
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
    setOverlays: (OVERLAYS_ARRAY) => dispatch({
      type: Actions.setOverlays,
      overlays: OVERLAYS_ARRAY
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blueprint)
