import React, { Component } from 'react';
import { Actions } from '../../store/Actions';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { PlaceTwoTone } from '@material-ui/icons';
import { Header, HeaderSubtitle, HeaderControl, CustomSkeleton } from '../../presentational';

import PlaceService from './PlaceService';

import BorderButton from '../Border/BorderButton';
import BorderOptions from '../Border/BorderOptions';

import BlueprintButton from '../Blueprint/BlueprintButton';
import BlueprintUpload from '../Blueprint/BlueprintUpload';
import BlueprintOptions from '../Blueprint/BlueprintOptions';

import Layer from '../Layer/Layer';

class Place extends Component {

  // Get Place From Id State
  _getByURLId = () => {
    const urlId = this.props.match.params.id;
    PlaceService.getById(urlId, (res) => {        
      
      try{
      
        const { key, data } = res;

        const place = {
          ...data,
          id: key
        }

        this.props.setMapLocation(data.center);
        this.props.setPlace(place);
      } catch (e) {
        console.log(e);
      }

    });
  }
    
  componentDidMount() {
    this._getByURLId();
  }


  render() {

    const { match, place } = this.props;

    if (place === null) {
      return (
        <CustomSkeleton />
      );
    }

    return (
        <div>
          {/* Header Element */}
          {/* Display Project Infos & Controls */}
          <Header icon={<PlaceTwoTone />} 
                  title={place.title || <Skeleton /> }>

            <HeaderSubtitle>
              {place.description || <Skeleton count={3} />}
            </HeaderSubtitle>

            {/* Control Buttons */}
            <HeaderControl>
              <BorderButton />
              <BlueprintButton />
              {/* <IconButton icon={<AddLocation />} title="Marcar Salas" />  */}
            </HeaderControl>
          </Header>

          {/* Routes*/}
          <div>
            {/* Layer
              * On path / place /: id */}
            <Route path={`${match.path}/`} exact component={Layer}/>

            {/* Border */}
            {/* Border Create
              * On Path /place/:id/border/options */}
            <Route path={`${match.path}/border/:contourIndex/options`} exact component={BorderOptions}/>

            {/* Blueprint */}
            {/* Blueprint Upload
              * On path /place/:id/blueprint */}
            <Route path={`${match.path}/blueprint`} exact component={BlueprintUpload} />

            {/* Blueprint Options
              * On path /place/:id/blueprint/:overlayIndex/options */}
            <Route path={`${match.path}/blueprint/:overlayIndex/options`} exact component={BlueprintOptions} />

          </div>


          {/* Initiate Types Instances */}
          {/* <Border /> */}

          {/* <Blueprint  place={this.state.place} 
                      update={this.updatePlace}/> */}
         
        </div>
    );
  }
}

// 
// Redux
// 
const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlace: (place) => dispatch({
      type: Actions.setPlace,
      place: place
    }),
    setMapLocation: (position) => dispatch({
      type: Actions.setMapLocation,
      lat: position.latitude,
      lng: position.longitude,
      zoom: 18
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Place));