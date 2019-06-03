import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Add, Done } from '@material-ui/icons';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Header, HeaderControl, AutoCompleteInput, SecundaryButton } from '../../presentational';
import PlaceService from './PlaceService';

class PlaceCreate extends Component {
  
  state = {
    title:'',
    description: '',
    placeId: '',
    address: '',
    center: {},
    creationTime: new Date()
  }

  _inputChangeHangle = (search) => {
    this.setState({ title: search });
  };

  _inputSelectHandle = (search) => {
    geocodeByAddress(search)
      .then(res => {

        this.setState({
          title: search,
          description: search,
          placeId: res[0].place_id,
          address: res[0].formatted_address,
        });

        return getLatLng(res[0]);
      })
      .then((coord) => this.setState({ center: {latitude: coord.lat, longitude: coord.lng} }))
      .then(() => console.log(this.state))
      .catch(error => console.error('Error', error));
  }

  // TO DO:
  _createHandler = () => {
    PlaceService.create(this.state, (res) => this._navigateToPlace(res));
  }

  _navigateToPlace = (id) => {
    this.props.history.push(`/place/${id}`);
  }

  _closeModalHandler = () => {
    console.log('close')
  }


  render() {
    return (
      <Header icon={<Add />} title="Novo Local">
        <PlacesAutocomplete value={this.state.title}
                            onChange={this._inputChangeHangle}
                            onSelect={this._inputSelectHandle}>
            {el => <AutoCompleteInput {...el}/>}
        </PlacesAutocomplete>
        <div style={{margin: '0 12px'}}>
          <HeaderControl  justify="flex-end"
                          spacing={8}>
          
            {/* <CleanButton  title="Cancelar" 
                          gridSize={4}
                          action={this._closeModalHandler}/> */}
            
            <SecundaryButton  icon={<Done />} 
                              title="Próximo" 
                              gridSize={4} 
                              action={this._createHandler} />

          </HeaderControl>        
        </div>
      </Header>
    )
  }

}


export default withRouter(PlaceCreate);