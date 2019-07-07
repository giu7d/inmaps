import React from 'react'
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import LogOutMenu from './LogOutMenu';

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

  const { classes, action, user, singOut } = props;

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
          {user && (
            <LogOutMenu user={user} singOut={singOut} />
          )}
        </Toolbar>
    </AppBar>
  )
}

appBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(appBar);