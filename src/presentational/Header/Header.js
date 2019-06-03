import React from 'react'
import { Grid, Typography, withStyles, Divider } from '@material-ui/core';

const styles = ({
  space: {
    marginTop: 24
  }
});

const header = (props) => {

  const { icon, title, children, classes } = props;

  return (
    <div>
      <Grid container 
            justify="center">
        <Grid item 
              xs={10}
              className={classes.space}>
          <Typography variant="h4" 
                      color="textPrimary" 
                      gutterBottom> 
            {icon} {title}
          </Typography>
        </Grid>
      </Grid>

      {children}

      <Grid container 
            justify="center">
        <Grid item xs={12}>      
          <Divider className={classes.space} variant="middle" />
        </Grid>
      </Grid>

    </div>
  )
}

export default withStyles(styles)(header);