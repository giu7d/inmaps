import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DangerButton, SecundaryButton } from '../../presentational';
import { Delete, Done } from '@material-ui/icons';
import { Actions } from '../../store/Actions';
import { connect } from 'react-redux';

class BorderOptions extends Component {

  
  render() {
    return (
      <Grid container 
              justify="center"
              style={{marginTop: 25, marginBottom: 25, height: `auto` }}
              spacing={3}>
          <Grid item 
              xs={10}>
          <Typography variant="h5" gutterBottom>
            Borda
          </Typography>
        </Grid>
          {/* Delete this Blueprint */}
          <Grid item
                xs={7}>
              <DangerButton  icon={<Delete />} 
                                title="Excluir" 
                                gridSize={12} 
                                action={() => this.props.setLayerView(null)} />
          </Grid>
          {/* Done! */}
          <Grid item
                xs={7}>
              <SecundaryButton  icon={<Done />} 
                                title="Pronto" 
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
)(BorderOptions)
