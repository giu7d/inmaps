import React, { Component } from 'react'
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Grid } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { SecundaryButton } from '../../presentational';
import { withRouter } from 'react-router-dom';
import { withBlueprint } from './WithBlueprint';
import { PropTypes } from 'prop-types';

class BlueprintUpload extends Component {

  _fileUpload = (fieldName, file, metadata, load, error, progress, abort) => {    
    
    const { uploadBlueprint, history, match } = this.props;
    
    uploadBlueprint(file, { progress, load, error });
    history.push(`/place/${match.params.id}`);
  }

  render() {

    const { history, match } = this.props;

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
          <SecundaryButton  icon={<Done />} 
                            title="Pronto" 
                            gridSize={12}
                            action={() => history.push(`/place/${match.params.id}`)} />
        </Grid>
      </Grid>
    )
  }
}

BlueprintUpload.propTypes = {
  uploadBlueprint: PropTypes.func.isRequired,
}


export default withBlueprint(withRouter(BlueprintUpload));
