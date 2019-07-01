import React from 'react'
import { Grid, Typography } from '@material-ui/core';

const headerSubtitle = (props) => {

  const { children } = props;

  return (
    <Grid container 
          justify="center">
      <Grid item 
            xs={10}>
        <Typography variant="subtitle2"
                    gutterBottom>
          { children }
        </Typography>
      </Grid>
    </Grid>
  )
}

export default headerSubtitle;