import React from 'react'
import { Grid, Button, withStyles } from '@material-ui/core';



const styles = ({
  button: {
    background: 'inherit',
    borderRadius: 4,
    border: 0,
    color: '#666',
    width: `100%`,
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
    useNextVariant: true
  }
});


const cleanButton =(props) => {

  const { classes, action, title, gridSize } = props;

  return (
    <Grid item xs={gridSize}>
      <Button className={classes.button} onClick={action}>
        {title}
      </Button>
    </Grid>
  )
}

export default withStyles(styles)(cleanButton);