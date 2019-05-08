import React from 'react'
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

const styles = {
  title: {
    flexGrow: 1,
    marginLeft: 24,
    marginRight: 24,
  },
  subTitle: {
    fontWeight: 'normal',
    color: '#666'
  },
  drawer: {
    width: 350
  }
}

const appBar = (props) => {

  const { classes } = props;

  const title = () => (
    <Typography className={classes.title}
                variant="h6"
                color="inherit">
      InMaps <span className={classes.subTitle}>Creator</span>
    </Typography>
  );

  return (
    <AppBar className={classes.drawer} 
            position="static" 
            color="default" 
            elevation={0}>
        <Toolbar>
          { title() }
        </Toolbar>
    </AppBar>
  )
}

appBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(appBar);