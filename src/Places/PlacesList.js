import React, { Component } from 'react';

import PlaceCreate from './PlaceCreate';

import { Header, HeaderControl, PrimaryButton, Modal, ListItem } from '../UI'
import { Add, PlaceTwoTone } from '@material-ui/icons';
import { List } from '@material-ui/core';

import PlacesService from './PlacesService';

import { Link } from 'react-router-dom';

class Project extends Component {
  
  state = {
    modal: false,
    places: []
  }

  componentDidMount = () => {

    PlacesService.getAll(res => {
      const placesArray = [...this.state.places];
      placesArray.push(...res);
      this.setState({ places: placesArray });
    });

    // PlacesService.getById('jbD1gYc7Z4iNYY1UqOMU', (data) => {
    //   console.log(data);
    // });

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

        <List style={{ marginTop: 24}}>
          {this.state.places.map((el) => (
              <ListItem
                key={el.key}
                title={
                  <Link to={`/place/${el.key}`} 
                        style={{ color:'inherit', textDecoration: 'none' }}>
                    {el.data.title}
                  </Link>
                } 
                date={el.data.creationTime} 
              /> 
          ))}
        </List>

        {/* MODAL */}
        <Modal open={this.state.modal} action={this.toggleModal}>
          <PlaceCreate />
        </Modal>
      </div>
    )
  }
}

export default Project;