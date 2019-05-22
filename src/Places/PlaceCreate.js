import React, { Component } from 'react';
import { AddTwoTone } from '@material-ui/icons';
import { Header, HeaderControl, MapAutoComplete } from '../UI';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class PlaceCreate extends Component {
  
  state = {
    description: '',
    placeId: '',
    address: '',
    latLng: {}
  }
  
  handleChange = (desc) => {
    this.setState({ description: desc });
  };

  handleSelect = (desc) => {
    geocodeByAddress(desc)
      .then(res => {  
        const { place_id, formatted_address } = res[0];

        console.log(place_id);
        console.log(formatted_address);

        this.setState({
          placeId: place_id, 
          address: formatted_address
        });

        return getLatLng(res[0]);
      })
      .then(latLng => this.setState({ latLng: latLng }))
      .catch(error => console.error('Error', error));
  };

   render() {
    return (
      <Header icon={<AddTwoTone />} title="Novo Local">
        <HeaderControl>
          <MapAutoComplete  value={this.state.description}
                            select={this.handleSelect}
                            change={this.handleChange} />
        </HeaderControl>
      </Header>
    )
  }

}

export default PlaceCreate