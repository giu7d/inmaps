import React from 'react'
import GoogleButton from 'react-google-button';
import { Grid, Typography } from '@material-ui/core';
import { AppBar } from '../../presentational';

const login = (props) => {

  const { signInWithGoogle } = props;

  return (
    <Grid container
          justify="center">
      
      {/* AppBar */}
      <Grid item
            xs={12}>
        <AppBar action={null} user={null} singOut={null} />
      </Grid>
      
      <Grid item  
            xs={4}>
        <Grid container
              style={{marginTop: 24, background: '#FFFFFF'}}
              spacing={5}
              justify="center">
          
          <Grid item
                xs={12}>          
            <Typography variant="h5" 
                        gutterBottom>
              LOGIN
            </Typography>
            <Typography variant="caption" 
                        gutterBottom>
              Selecione o método de login desejado para acessar a aplicação
            </Typography>
          </Grid>

          {/* LogIn Options */}
          <Grid item>
            <GoogleButton onClick={signInWithGoogle} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default login;