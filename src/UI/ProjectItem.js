import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';




const projectItem = (props) => {

  const { key, title, date } = props;
  
  return (
    <ListItem>
      <ListItemText primary={title} secondary={date} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
            <MoreVert />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default projectItem;