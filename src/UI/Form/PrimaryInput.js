import React from 'react'
import { withStyles, Paper, IconButton, InputBase } from '@material-ui/core';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}

const primaryInput = (props) => {

  const { icon, title, value, change, classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder={title} value={value} onChange={change}/>
      <span className={classes.icon}>{icon}</span>  
    </Paper>
  )
}

export default withStyles(styles)(primaryInput);