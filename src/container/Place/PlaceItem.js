import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export default function PlaceItem(props) {
  const [anchor, setAnchor] = React.useState(null);
  
  const _openMenuHandler = (e) => {
    setAnchor(e.currentTarget);
  }

  const _closeMenuHandler = () => {
    setAnchor(null);
  }

  const { id, title, date, onDelete } = props;


  return (
          <div>
            <ListItem>
              <Link to={`/place/${id}`}
                    style={{ color:'inherit', textDecoration: 'none' }}>
                <ListItemText primary={title}
                              secondary = {date.seconds}/>
              </Link>

              <ListItemSecondaryAction>
                <IconButton aria-label="Delete"
                            aria-owns={anchor ? 'menu' : undefined}
                            aria-haspopup="true"
                            onClick={_openMenuHandler}>
                    <MoreVert />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <Menu id="menu" 
                  anchorEl={anchor} 
                  open={Boolean(anchor)} 
                  onClose={_closeMenuHandler}>
              <MenuItem onClick={onDelete.bind(null, id)}>Excluir</MenuItem>
            </Menu>
          </div>
  )
}