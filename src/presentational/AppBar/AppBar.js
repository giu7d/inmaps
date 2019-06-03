import React from 'react'
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

const styles = {
  title: {
    cursor: 'pointer',
    flexGrow: 1,
    marginLeft: 24,
    marginRight: 24,
  },
  subTitle: {
    fontWeight: 'normal',
    color: '#666'
  },
  appBar: {
    width: `100%`
  }
}

const appBar = (props) => {

  const { classes, action } = props;

  const title = () => (
    <Typography className={classes.title}
                variant="h6"
                color="inherit"
                onClick={action}>
      InMaps <span className={classes.subTitle}>Creator</span>
    </Typography>
  );

  return (
    <AppBar className={classes.appBar} 
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