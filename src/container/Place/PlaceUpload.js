import React, { Component } from 'react'
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Grid } from '@material-ui/core';
import { SecundaryButton } from '../../presentational';

import PlaceService from './PlaceService';
import { Close } from '@material-ui/icons';

class PlaceUpload extends Component {

  _fileUpload = (fieldName, file, metadata, load, error, progress, abort) => {

    PlaceService.upload(this.props.place, file, progress, load, error, this.props.toogleUpload);
  }


  render() {
    return (
      <Grid container 
            justify="center"
            style={{marginTop: `25%`, marginBottom: `25%`, height: `50%` }}>
        <Grid item 
              xs={10}>
          <FilePond server={{
            allowMultiple: false,
            allowRevert: false,
            process: this._fileUpload
          }}/>
        </Grid>
        <Grid item
              xs={6}>
            <SecundaryButton  icon={<Close />} 
                              title="Cancelar" 
                              gridSize={12} 
                              action={this.props.toogleUpload} />
        </Grid>
      </Grid>
    )
  }
}

export default PlaceUpload