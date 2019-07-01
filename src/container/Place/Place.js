import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import { PlaceTwoTone } from '@material-ui/icons';
import { Header, HeaderSubtitle, HeaderControl } from '../../presentational';
import Skeleton from 'react-loading-skeleton';
import PlaceService from './PlaceService';
import Layer from '../Layer/Layer';
import Border from '../Border/Border';
import BlueprintButton from '../Blueprint/BlueprintButton';
import Blueprint from '../Blueprint/Blueprint';
import BorderButton from '../Border/BorderButton';

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


  // 
  // URL
  // 
  _getURLParams = () => {
    const params = this.props.match.params;
    this.setState({ urlId: params.id });
  }


  // 
  // Place
  // 
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

  _updatePlace = (place) => {
    
    this.setState({
      place: {...place}  
    })

    try {  
      PlaceService.update(this.state.place.id, place);
    } catch (e) {
      console.log(e);
    }
  }

  _setPlaceBorder = (border) => {

    const { place } = this.state;

    place.border = [...border];

    this.setState({
      place: {...place}
    });
  }

  _setPlaceBlueprint = (blueprint) => {

    const { place } = this.state;

    place.blueprint.push(blueprint);

    this.setState({
      place: {...place}
    });

    this.forceUpdate();
  }

  // 
  // React Components
  // 
  componentWillMount() {
    this._getURLParams();
  }

  componentDidMount() {
    this._getPlaceById();
  }


  render() {
    return (this.state.place.id !== '') && (
        <div>
          <Header icon={<PlaceTwoTone />} title={this.state.place.title || <Skeleton />}>
            <HeaderSubtitle>
            </HeaderSubtitle>
              <HeaderControl>
                {/* Buttons */}
                <BorderButton />
                <BlueprintButton />
                {/* <IconButton icon={<AddLocation />} title="Marcar Salas" />  */}
              </HeaderControl>
          </Header>
          <Layer  place={this.state.place}
                  overlays={this.state.overlay}
                  setBlueprint={this._setPlaceBlueprint} />

          {/* Start Map Integration Components */}
          {/* and load of the map objects for each type */}
          
          <Border place={this.state.place}
                  update={this._updatePlace}
                  setBorder={this._setPlaceBorder} />
          
          {(this.state.place.blueprint.length !== 0) && (
            <Blueprint  place={this.state.place}
                        update={this._updatePlace}/>
          )}
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
)(Place);