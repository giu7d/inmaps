import React, { Component } from 'react'
import { Drawer as MaterialDrawer, withStyles } from '@material-ui/core';
import { Route, withRouter } from 'react-router-dom';

import AppBar from '../UI/AppBar';
import PlaceList from '../Places/PlacesList';
import Place from '../Places/Place';


const styles = {
  drawer: {
    width: `375px`,
    height: `100vh`,
    overflow: 'hidden'
  }
}


class Drawer extends Component {
  
  _navHomeHandler = () => {
    this.props.history.push('/');
  }

  render() {

    const { classes } = this.props;

    return (
      <MaterialDrawer anchor="left"
                      variant="permanent">

          <div className={classes.drawer}>
            <AppBar action={ this._navHomeHandler }/>
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