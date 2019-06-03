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