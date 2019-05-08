import React, { Component } from 'react';
import { Search, AddTwoTone } from '@material-ui/icons';
import { Header, HeaderControl, PrimaryInput } from '../UI/index';

class PlaceCreate extends Component {
  
  
  
  render() {
    return (
      <Header icon={<AddTwoTone />} title="Novo Local">
        <HeaderControl>
          <PrimaryInput icon={<Search />} title="Procure o Local" ></PrimaryInput>
        </HeaderControl>
      </Header>
    )
  }
}

export default PlaceCreate