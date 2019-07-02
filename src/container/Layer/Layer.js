import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

class Layer extends Component {
  

  
  render() {
    
    const { match } = this.props;
    
    return (
      <Grid container
            justify="center"
            spacing={3}
            style={{marginTop: `25%`}}>
        <Grid item
              xs={10}>
          <Link to={`${match.params.id}/blueprint/0/options`}>
            <Typography variant = "subtitle1"
                        align = "center">
              Sem camadas de dados. <br />
              o.0
            </Typography>
          </Link>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Layer);