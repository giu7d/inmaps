import React from 'react'
import { Grid, Button, withStyles } from '@material-ui/core';



const styles = ({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 4,
    border: 0,
    color: 'white',
    width: `100%`,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    useNextVariant: true
  },
  icon: {
    marginRight: 6
  }
});


const primaryButton =(props) => {

  const { classes, action, icon, title, gridSize } = props;

  return (
    <Grid item xs={gridSize}>
      <Button className={classes.button} onClick={action}>
        {icon}
        <span className={classes.icon}></span>
        {title}
      </Button>
    </Grid>
  )
}

export default withStyles(styles)(primaryButton);