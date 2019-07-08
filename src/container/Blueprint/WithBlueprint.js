/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import BlueprintOverlay from './BlueprintOverlay';
import Utils from '../../utils/Utils';
import PlaceService from '../Place/PlaceService';
import { PropTypes } from 'prop-types';

export const withBlueprint = InputComponent => { 

  class WithBlueprintComponent extends Component {

    // Create Overlay Instances from a Blueprint
    create = (blueprint) => {
      
      const { mapAPI } = this.props.map;
      const { north, east, south, west } = blueprint.border;

      const latLngBorder = new google.maps.LatLngBounds(
        new google.maps.LatLng(south, west),
        new google.maps.LatLng(north, east)
      )

      const ne = latLngBorder.getNorthEast();
      const sw = latLngBorder.getSouthWest();
      
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

      this.clear();

      const { blueprint } = this.props.place;

      blueprint.forEach((bl) => { 
        const overlay = this.create(bl);        
        this.save(overlay);        
      });
    }

    // Add a new or modified Overlay to Overlays[]
    save = (overlay) => {
      
      const { overlays } = this.props;
      const index = overlays.indexOf(overlay);

      if (index === -1) {
        overlays.push(overlay);
      } else {
        overlays[index] = overlay;
      }
      
      this.store(overlays);
    }

    // Delete from OvWithBlueprinterlays[]
    delete = (index) => {
      
      const { overlays } = this.props;
      
      overlays.splice(index, 1);

      this.store(overlays);
    }

    // Persist changes to Redux Store and Firebase
    store= (overlays) => {
      const { place, setOverlays } = this.props;
      const blueprints = overlays.map(overlay => overlay.getAsBlueprint());
      
      setOverlays(overlays);
      this._storePlace({
        ...place,
        blueprint: [...blueprints]
      });
    }

    // Upload File and Add Overlay
    upload = (file, uploadUIHandlers) => {
      
      PlaceService.upload('blueprint/', file, uploadUIHandlers, async (url, hashedFileName) => {

        console.log(url);
        
        const { place } = this.props;
        const { width, height } = await Utils.getImageMeta(url); 
        
        // Create Standart Boards
        const border = new google.maps.LatLngBounds(
          new google.maps.LatLng(place.center.latitude, place.center.longitude),
          new google.maps.LatLng(place.center.latitude + (height * 0.000001), place.center.longitude + (width * 0.000001))
        );
        console.log(border);


        // Initialize a new Blueprint
        const blueprint = {
          image: hashedFileName,
          border: border.toJSON(),
          url: url,
          scale: 1,
          rotation: 0,
        }

        // Create a Overlay;
        const overlay = this.create(blueprint);

        // Save overlay and blueprint
        this.save(overlay);
      });
    }

    _storePlace(place) {
      try {
        console.log('STORE PLACE');
        this.props.setPlace(place);
        PlaceService.update(place.id, place);
      } catch (e) {
        console.log(e);
      }
    }

    // Clear All overlays from Map and Array, 
    // DO NOT remove blueprints from Place
    clear = () => {
      const { overlays, setOverlays } = this.props;

      // Hide Overlays from map
      overlays.forEach(overlay => {
        overlay.setMap(null);
      });

      // Reset Overlays[] 
      setOverlays(new Array(0));
    }

    componentWillMount() {

      const { isOverlaysLoaded, setOverlaysLoaded, place } = this.props;
      // Load Overlays from Place Blueprit 
      if (!isOverlaysLoaded && place.blueprint.lenght !== 0){
        this.load();
        setOverlaysLoaded(true);
      } else if (place.blueprint.length === 0) {
        setOverlaysLoaded(true);
      }
    }
    
    render() { 
      return (
        <InputComponent {...this.props}
                        createBlueprint={this.create}
                        loadBlueprint={this.load}
                        saveBlueprint={this.save}
                        deleteBlueprint={this.delete}
                        storeBlueprint={this.store}
                        uploadBlueprint={this.upload} />
      );
    }
  }


  WithBlueprintComponent.propTypes = {
    overlays: PropTypes.array.isRequired,
    place: PropTypes.object.isRequired,
  };

  // Redux
  const mapStateToProps = (state) => {
    return {...state};
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setPlace: (place) => dispatch({
        type: Actions.setPlace,
        place: place
      }),
      setOverlays: (OVERLAYS_ARRAY) => dispatch({
        type: Actions.setOverlays,
        overlays: OVERLAYS_ARRAY
      }),
      setOverlaysLoaded: (STATE) => dispatch({
        type: Actions.setOverlaysLoaded,
        isOverlaysLoaded: STATE
      }),
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithBlueprintComponent);
}





