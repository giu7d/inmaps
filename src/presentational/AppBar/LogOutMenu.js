import React from 'react'
import { IconButton, Menu, MenuItem, Typography, Grid } from '@material-ui/core';

export default function LogOutMenu(props) {
  
  const [anchor, setAnchor] = React.useState(null);

  const _openMenuHandler = (e) => {
    setAnchor(e.currentTarget);
  }

  const _closeMenuHandler = () => {
    setAnchor(null);
  }

  const { user, singOut } = props;

  return (
    <div>
        <IconButton aria-label="Delete"
                    aria-owns={anchor ? 'menuLogOut' : undefined}
                    aria-haspopup="true"
                    onClick={_openMenuHandler}>
          <img  alt={`Meno do usuario ${user.displayName}`} 
              src={user.photoURL} 
              width={24} 
              height={24}
              style={{borderRadius: `100%`}} />
        </IconButton>

        <Menu id="menuLogOut" 
              anchorEl={anchor} 
              open={Boolean(anchor)} 
              onClose={_closeMenuHandler}>
          
          <Grid container
                spacing={3}
                justify="center"
                style={{margin: 14, width: 250}}>
            <Grid item
                  xs={2}>
              <img  alt={`foto de perfil ${user.displayName}`} 
                  src={user.photoURL} 
                  width={24} 
                  height={24}
                  style={{borderRadius: `100%`}} />
            </Grid>
            <Grid item
                  xs={8}>
              <Typography variant="subtitle1"
                          color="inherit">
                {user.displayName}
              </Typography>
            </Grid>
          </Grid>

          <MenuItem onClick={singOut}>
            Sair
          </MenuItem>
        </Menu>
    </div>
  )
}
