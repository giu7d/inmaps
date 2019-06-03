import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import { PlaceTwoTone, Timeline, AttachFile, AddLocation, MoreVert } from '@material-ui/icons';
import { Header, HeaderControl, HeaderSubtitle, IconButton } from '../../presentational';

import PlaceService from './PlaceService';

class Place extends Component {

  state = {
    id: '',
    title: '',
    description: '',
    address: '',
    placeId: '',
    // coordenates
    center: {},
    borders: [],
    blueprints: [],
    tags: []
  }

  // TO DO
  _getPlaceGeometry = () => {
    
  }

  _save = () => {
    // 1- update state, 
    // 2- update to firebase 
  }

  _setParams = () => {
    const params = this.props.match.params;
    this.setState({
      id: params.id
    })
  }

  componentWillMount() {
    this._setParams();
  }

  componentDidMount() {

    PlaceService.getById(this.state.id, res => {
      
      const { data } = res;

      this.props.setup(data.center);
      this.setState({...data});
    });
  }

  componentDidUpdate() {
  
  }

  _console = () => {
    console.log(this.state);
  }
  
  render() {
    return (
      <div>
        <Header icon={<PlaceTwoTone />} title={this.state.title}>
          <HeaderSubtitle>
            { this.state.description || 'Sem descrição.' }
          </HeaderSubtitle>
          <HeaderControl>
            <IconButton icon={<Timeline />} title="Criar Contorno" />
            <IconButton icon={<AttachFile />} title="Criar Contorno" />
            <IconButton icon={<AddLocation />} title="Criar Contorno" />
            <IconButton icon={<MoreVert />} title="Criar Contorno" action={ this._console } />
          </HeaderControl>
        </Header>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setup: (position) => dispatch({
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