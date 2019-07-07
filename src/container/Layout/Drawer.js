import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom';
import { Drawer as MaterialDrawer, withStyles } from '@material-ui/core';

import { AppBar } from '../../presentational';
import PlaceList from '../Place/PlaceList';
import Place from '../Place/Place';


const styles = {
  drawer: {
    width: `375px`,
    height: `100vh`,
    overflowX: 'hidden'
  }
}


class Drawer extends Component {
  
  // 
  // Router
  // 
  // => handles AppBar Logo/Button Action;
  _setURLToHome = () => {
    this.props.history.push('/');
  }

  render() {

    const { classes, user, singOut } = this.props;

    console.log(user);

    return (
      <MaterialDrawer anchor="left"
                      variant="permanent">

          <AppBar user={user} singOut={singOut} action={ this._setURLToHome }/>

          <div className={classes.drawer}>
            <Route  path="/" 
                    exact 
                    component={PlaceList} />
            <Route  path="/place/:id" 
                    component={Place} />
          </div>     
      </MaterialDrawer>
    )
  }
}


export default withStyles(styles)(withRouter(Drawer));