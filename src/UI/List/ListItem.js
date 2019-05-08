import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';


const listItem = (props) => {

  const { title, date } = props;

  return (
    <ListItem>
      <ListItemText primary={title}
                    secondary = {(date.seconds)}/>
    
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
            <MoreVert />
        </IconButton>
      </ListItemSecondaryAction>
    
    </ListItem>
  )
}

export default listItem;