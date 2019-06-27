import React from 'react'
import { withStyles, Grid, Tooltip, IconButton } from '@material-ui/core';

const styles = ({
  space: {
    marginTop: 24,
  }
});

const iconButton = (props) => {

  const {icon, title, action, classes, disabled} = props;
  
  return (
    <Grid item 
          xs={2}
          className={classes.space}>
      
    <Tooltip title={title} aria-label={title}>
      <IconButton onClick={action} disabled={disabled}> {icon} </IconButton>
    </Tooltip>

    </Grid>
  )
}

export default withStyles(styles)(iconButton);
