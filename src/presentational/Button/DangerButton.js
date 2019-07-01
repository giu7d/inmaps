import React from 'react'
import { Grid, Button, withStyles } from '@material-ui/core';



const styles = ({
  button: {
    background: `linear-gradient(to right, #F45C43, #EB3349)`,
    borderRadius: 4,
    border: 0,
    color: 'white',
    width: `100%`,
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
    useNextVariant: true
  },
  icon: {
    marginRight: 6
  }
});


const dangerButton =(props) => {

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

export default withStyles(styles)(dangerButton);