import React, { Component } from 'react'
import { connect } from 'react-redux';
import BlueprintUpload from '../Blueprint/BlueprintUpload';
import BlueprintOptions from '../Blueprint/BlueprintOptions';
import BorderOptions from '../Border/BorderOptions';
import { Grid, Typography } from '@material-ui/core';

class Layer extends Component {
  
  
  render() {
    const layerView = () => {
      switch (this.props.layerView) {
        case 'BLUEPRINT_UPLOAD':
          return (
          <BlueprintUpload  place={ this.props.place }
                            setBlueprint={this.props.setBlueprint} />
          );
        case 'BLUEPRINT_OPTIONS':
          return (
            <BlueprintOptions place={ this.props.place }/>
          );
        
        case 'BORDER_OPTIONS':
          return (
            <BorderOptions />
          );

        default:
          return (
            <Grid container
                  justify="center"
                  spacing={3}
                  style={{marginTop: `25%`}}>
              <Grid item
                    xs={10}>
                <Typography variant = "subtitle1"
                            align = "center">
                  Sem camadas de dados. <br />
                  o.0
                </Typography>
              </Grid>
            </Grid>
          );
      }
    }


    return (
      <div>
        {layerView()}
      </div>
    )
  }
}

// 
// REDUX
// 
const mapStateToProps = (state) => {
  return {...state};
}

export default connect(
  mapStateToProps
)(Layer);