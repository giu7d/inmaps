import React, { Component } from 'react';

import PlaceCreate from './PlaceCreate';

import { Header, HeaderControl, PrimaryButton, Modal, ListItem } from '../UI'
import { Add, PlaceTwoTone } from '@material-ui/icons';
import { List } from '@material-ui/core';

import PlacesService from './PlacesService';

class Project extends Component {
  
  state = {
    modal: false,
    places: []
  }

  componentWillMount = () => {

    PlacesService.getAll((res)=>{

      const placesArray = [...this.state.places];
      placesArray.push(...res);

      this.setState({ places: placesArray });
    });

  }



  toggleModal = () => {
    this.setState({modal: !this.state.modal})
  }

  render() {
    return (
      <div>
        <Header icon={<PlaceTwoTone />} title="Lugares">
          <HeaderControl>
              <PrimaryButton icon={<Add />} title="Criar" gridSize={7} action={this.toggleModal} />
          </HeaderControl>
        </Header>

        <Modal open={this.state.modal} action={this.toggleModal}>
          <PlaceCreate />
        </Modal>

        <List style={{marginTop: 24}}>
          {this.state.places.map((el) => (
            <ListItem
              key={el.key} 
              title={el.data['place_name']} 
              date={el.data['creation_time']} 
            /> 
          ))}
        </List>
      </div>
    )
  }
}

export default Project;