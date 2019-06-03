import React from 'react'
import { withStyles, Paper, InputBase } from '@material-ui/core';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: `100%`,
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

  const { icon, title, classes, emmiter } = props;

  console.log();

  return (
    <Paper className={classes.root} elevation={1}>
      
      <InputBase  {...emmiter({
                    placeholder: title,
                    className: classes.input
                  })}/>

      <span className={classes.icon}>{icon}</span>  
    </Paper>
  )
}

export default withStyles(styles)(primaryInput);