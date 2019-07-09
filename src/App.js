import React, { Component } from 'react';
import Map from './container/Layout/Map';
import Drawer from './container/Layout/Drawer';
import withFirebaseAuth from 'react-with-firebase-auth';
import { providers, fireAuth } from './connect/FirebaseConnect';
import Login from './container/Layout/Login';
import { PropTypes } from 'prop-types';

class App extends Component {
  
  render() {

    const { user, signOut, signInWithGoogle} = this.props;

    // Login
    if(!user) {
      return (
        <Login signInWithGoogle={signInWithGoogle}  />
      );
    }

    return (      
      <main>
        <Drawer user={user} singOut={signOut} />
        <Map />
      </main>
    );
  }
}

App.propTypes = {
  singOut: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
}


export default withFirebaseAuth({
  firebaseAppAuth: fireAuth,
  providers: providers,
})(App);
