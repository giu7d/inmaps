import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import { PlaceTwoTone, AddLocation } from '@material-ui/icons';
import { Header, HeaderSubtitle, HeaderControl, IconButton } from '../../presentational';
import Skeleton from 'react-loading-skeleton';
import PlaceService from './PlaceService';
import PlaceBorder from './PlaceBorder';
import PlaceOverlay from './PlaceOverlay';


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
    return (
      <div>
        <Header icon={<PlaceTwoTone />} title={this.state.place.title || <Skeleton />}>
          <HeaderSubtitle>
            { this.state.place.description || <Skeleton count={4} /> }
          </HeaderSubtitle>
          {(this.state.place.id !== '') && (
            <HeaderControl>
              <PlaceBorder  place={this.state.place} 
                            update={this._updatePlace}
                            setBorder = {this._setPlaceBorder}/>
              <PlaceOverlay place={this.state.place} />

              <IconButton icon={<AddLocation />} title="Marcar Salas" />
            </HeaderControl>)}
        </Header>
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