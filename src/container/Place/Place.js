import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import { PlaceTwoTone } from '@material-ui/icons';
import { Header, HeaderSubtitle, HeaderControl } from '../../presentational';
import Skeleton from 'react-loading-skeleton';
import PlaceService from './PlaceService';
import Layer from '../Layer/Layer';
// import Border from '../Border/Border';
// import BorderButton from '../Border/BorderButton';
import Blueprint from '../Blueprint/Blueprint';
import BlueprintOptions from '../Blueprint/BlueprintOptions';
import BlueprintButton from '../Blueprint/BlueprintButton';
import { Route, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import BlueprintUpload from '../Blueprint/BlueprintUpload';

class Place extends Component {

  state = {
    urlId: '',
    place: {
      id: '',
      title: '',
      description: '',
      address: '',
      placeId: '',
      center: {},
      border: [],
      blueprint: [],
      tag: [],
      creationTime: null,
    }
  }

  // Get Id From URL Parameters and Set State
  _getIDFromURL = () => {
    const params = this.props.match.params;
    this.setState({ urlId: params.id });
  }

  // Get Place From Id State
  _getPlaceById = () => {

    PlaceService.getById(this.state.urlId, (res) => {        
      try{

        const { key, data } = res;

        this.props.setMapLocation(data.center);
        
        this.setState({
          place: { 
            ...data,
            id: key
          } 
        });
      
      } catch (e) {
        console.log(e);
      }

    });
  }
  
  _errorHandler = (e) => {
    // If error set URL Path to component ErrorLayer; 
  }

  // Update Place State and Firebase
  updatePlace = (place) => {
    
    console.log(place);

    this.setState({ place: {...place} });

    try {  
      PlaceService.update(this.state.place.id, place);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this._getIDFromURL();
  }

  componentDidMount() {
    this._getPlaceById();
  }


  render() {

    const { match } = this.props

    const skeletonArea = (
      <Grid container
            spacing={5}
            style={{ margin: 25 }}>
        <Grid item
              xs={5}>
          <Skeleton />
        </Grid>
        <Grid item
              xs={8}>
          <Skeleton count={3} />
        </Grid>
        <Grid item
              xs={8}>
          <Skeleton count={3} />
        </Grid>
        <Grid item
              xs={8}>
          <Skeleton count={3} />
        </Grid>
      </Grid>
    );

    return (this.state.place.id !== '') && (
        <div>

          {/* Header Element */}
          {/* Display Project Infos & Controls */}
          <Header icon={<PlaceTwoTone />} 
                  title={this.state.place.title || <Skeleton />}>

            <HeaderSubtitle>
              {this.state.place.description || <Skeleton count={3} />}
            </HeaderSubtitle>

            {/* Control Buttons */}
            <HeaderControl>
              {/* <BorderButton /> TODO: -> Create new Border => Create Poligon, Save, Show Options */}
              <BlueprintButton />{/* Create new Blueprint => Upload File, Create Overlay, Save, Show Options*/}
                {/* <IconButton icon={<AddLocation />} title="Marcar Salas" />  */}
            </HeaderControl>
          </Header>

          {/* Routes*/}
          <div>
            {/* Layer
              * On path / place /: id */}
            <Route path={`${match.path}/`} exact render={props => (
              <Layer {...props} place={this.state.place} />
            )}/>
            
            {/* Blueprint Options
              * On path /place/:id/blueprint/:overlayIndex/options */}
            <Route path={`${match.path}/blueprint/:overlayIndex/options`} exact render={props => (
              (this.props.overlays.length !== 0) ? <BlueprintOptions {...props} place={this.state.place} /> : skeletonArea
            )}/>

            {/* Blueprint Upload
              * On path /place/:id/blueprint/ */}
            <Route path={`${match.path}/blueprint`} exact render={props => (
              <BlueprintUpload {...props} place={this.state.place}
                                          update={this.updatePlace} />
            )}/>
            
          </div>


          {/* Initiate Types Instances */}
          {/* <Border place={this.state.place}
                  update={this._updatePlace}
                  setBorder={this._setPlaceBorder} /> */}

          {(this.state.place.blueprint.length !== 0) && <Blueprint  place={this.state.place}
                                                                    update={this.updatePlace}/>}
         
        </div>
    )
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
    setMapLocation: (position) => dispatch({
      type: Actions.setMapLocation,
      lat: position.latitude,
      lng: position.longitude,
      zoom: 18
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Place));