import React from 'react';

import { Modal, withStyles, Paper } from '@material-ui/core';

const styles = (theme) => ({
  modal: {
    position: 'absolute',
    width: '50%',
    outline: 'none',
    top: `25%`,
    left: `25%`,
    transform: `translate(25%-25%)`
  },
});

const modal = (props) => {

  const { open, action, classes, children } = props;

  return (
    <Modal  aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={action}>
      <Paper className={classes.modal}>
        {children}
      </Paper>
    </Modal>
  )
}

export default withStyles(styles)(modal);
