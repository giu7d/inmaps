import React, { Component } from 'react';

import { List, Typography, Grid } from '@material-ui/core';

import { Add, PlaceTwoTone } from '@material-ui/icons';
import { Header, HeaderControl, PrimaryButton, Modal } from '../../presentational';
import PlaceService from './PlaceService';
import PlaceCreate from './PlaceCreate';
import PlaceItem from './PlaceItem';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';


class PlaceList extends Component {
  
  state = {
    modal: false,
    places: [],
    load: false,
  }

  _setPlace = () => {

    PlaceService.getAll(res => {
      try {
        this.setState({ places: res, load: true });
      }
      catch (err) {
        console.log(err);
      }
    });
  }

  _deletePlace = (id, e) => {
    PlaceService.delete(id);
    this._setPlace();
  }

  _toggleModal = () => {
    this.setState({modal: !this.state.modal})
  }
  
  componentDidMount = () => {
    this._setPlace();
    this.props.setMapLocation({
      latitude: -14.235004,
      longitude: -51.925279,
      zoom: 3
    })
  }

  render() {

    const skeleton = () => {

      const size = Math.floor(Math.random() * 10);
      const array = [];

      
      for(let i=0; i<size; i++) {
        
        array.push(
          <div  key={i}
                style={{ margin: 24, width: 300 }}>
            <Skeleton count={2} />
          </div>
        );

      }

      return array;
    }

    return (
      <div>
        <Header icon={<PlaceTwoTone />} title="Lugares">
          <HeaderControl>
              <PrimaryButton icon={<Add />} title="Criar" gridSize={7} action={this._toggleModal} />
          </HeaderControl>
        </Header>

        {(this.state.load) ? (
        <List style={{ marginTop: 24}}>
          {(this.state.places.length !== 0) ? this.state.places.map((el) => (
              <PlaceItem  key={el.key}
                          id={el.key}
                          title={el.data.title}
                          date={el.data.creationTime}
                          onDelete={this._deletePlace} />
          )) : (
          
            <Grid container
                  justify="center"
                  spacing={3}
                  style={{marginTop: `25%`}}>
              <Grid item
                    xs={10}>
                <Typography variant="subtitle1" align="center">
                  Você não possui nenhum projeto criado.<br /> 
                  :P 
                </Typography>
              </Grid>
            </Grid>
          )}
        </List>
        ) : skeleton() }

        {/* MODAL */}
        <Modal open={this.state.modal} action={this._toggleModal}>
          <PlaceCreate />
        </Modal>
      </div>
    )
  }
}

// 
// Redux
// 
const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMapLocation: (position) => dispatch({
      type: Actions.setMapLocation,
      lat: position.latitude,
      lng: position.longitude,
      zoom: position.zoom
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceList);