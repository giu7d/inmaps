import React from 'react'
import { withStyles, Grid } from '@material-ui/core';

const styles = ({
  space: {
    marginTop: 24
  }
});

const headerControl = (props) => {

  const { children, justify, classes } = props;

  return (
    <Grid container 
          justify={justify || "center"}
          className={classes.space}>
      { children }
    </Grid>
  )
}

export default withStyles(styles)(headerControl)