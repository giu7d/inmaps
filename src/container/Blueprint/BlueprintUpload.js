import React, { Component } from 'react'
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { SecundaryButton } from '../../presentational';
import { Actions } from '../../store/Actions';
import PlaceService from '../Place/PlaceService';

class BlueprintUpload extends Component {

  _fileUpload = (fieldName, file, metadata, load, error, progress, abort) => {

    PlaceService.upload(this.props.place, file, progress, load, error, () => {
      this.props.setLayerView(null);   
    });
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
              xs={7}>
            <SecundaryButton  icon={<Close />} 
                              title="Cancelar" 
                              gridSize={12} 
                              action={() => this.props.setLayerView(null)} />
        </Grid>
      </Grid>
    )
  }
}


// 
// REDUX
// 
const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLayerView: (TYPE) => dispatch({
      type: Actions.setLayerView,
      layerView: TYPE
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlueprintUpload)
