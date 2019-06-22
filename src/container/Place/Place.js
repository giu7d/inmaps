import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import { PlaceTwoTone } from '@material-ui/icons';
import { Header, HeaderSubtitle } from '../../presentational';
import Skeleton from 'react-loading-skeleton';
import PlaceService from './PlaceService';
import PlaceControls from './PlaceControls';


class Place extends Component {

  state = {
    id: '',
    oldPlace: {}
  }


  // 
  // URL
  // 
  _getURLParams = () => {

    const params = this.props.match.params;

    this.setState({
      id: params.id
    });
  }


  // 
  // Place
  // 
  _getPlaceById = () => {
    
    PlaceService.getById(this.state.id, res => {

      try {
        
        const { data } = res;
        
        this.props.setMapLocation(data.center);
        this.props.setPlace({
          id: this.state.id,
          ...data,
        });

      } catch (e) {
        console.log(e);
      }  
    });
  }

  _updatePlace = () => {
    
    const { oldPlace } = this.state;
    const { place } = this.props;
    
    try {
      if(oldPlace !== place) {
        if (!(place.id === "" || place.id === '' || place.id === null || place.id === undefined)) {
          console.log('Update');
          PlaceService.update(place.id, place);
          this.setState({oldPlace: place})
        }
      }
    } catch (e) {
      console.log(e);
    }
  }


  // 
  // React Components
  // 
  // => Get URL Id before component mount
  componentWillMount() {
    this._getURLParams();
  }

  // => Get Place from Firebase after component mount
  componentDidMount() {
    this._getPlaceById();
  }
  
  // => Update Place from Firebase when component update
  componentDidUpdate() {
    this._updatePlace();
  }

  
  render() {

    const { place } = this.props

    return (
      <div>
        <Header icon={<PlaceTwoTone />} title={place.title || <Skeleton />}>
          <HeaderSubtitle>
            { place.description || <Skeleton count={4} /> }
          </HeaderSubtitle>
          <PlaceControls />
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
    }),
    setPlace: (place) => dispatch({
      type: Actions.setPlace,
      place: place
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Place);