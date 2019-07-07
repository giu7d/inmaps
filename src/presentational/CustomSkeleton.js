import React from 'react';
import { Grid } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

const customSkeleton = (props) => {

  return (

    <Grid container
          spacing={5}
          style={{ margin: 25 }}>
      
      <Grid item
            xs={5}>
        <Skeleton />
      </Grid>

      <Grid item
            xs={8}>
        <Skeleton count={3} />
      </Grid>
      
      <Grid item
            xs={8}>
        <Skeleton count={3} />
      </Grid>
      
      <Grid item
            xs={8}>
        <Skeleton count={3} />
      </Grid>
    
    </Grid>
  )
}

export default customSkeleton;