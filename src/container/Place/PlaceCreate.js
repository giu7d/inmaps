import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Add, Done } from '@material-ui/icons';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Header, HeaderControl, AutoCompleteInput, SecundaryButton } from '../../presentational';
import PlaceService from './PlaceService';

class PlaceCreate extends Component {
  
  state = {
    search: '',
    id: '',
    title: '',
    description: '',
    address: '',
    placeId: '',
    center: {},
    border: [],
    blueprint: [],
    tag: [],
    creationTime: new Date(),
  }

  
  _inputChangeHandler = (search) => {
    this.setState({ search: search });
  };

  _inputSelectHandler = (search) => {
    
    geocodeByAddress(search)
      .then(res => {
        this.setState({
          title: search.match(/^(.[^\s]+)\s(.[^\s]+)/g)[0],
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
        <PlacesAutocomplete value={this.state.search}
                            onChange={this._inputChangeHandler}
                            onSelect={this._inputSelectHandler}>
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