import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Attachment, Timeline } from '@material-ui/icons';

class Layer extends Component {
  
  
  _openLayer = (event, url, index) => {

    const { history, match } = this.props;

    history.push(`/place/${match.params.id}/${url}/${index}/options`);
  }

  render() {
    
    const { blueprint, border } = this.props.place;
    
    if (blueprint.length === 0 && border.length === 0) {
      return (
        <Grid container
              justify="center"
              style={{marginTop: `25%`}}>
          <Grid item
                xs={10}>
            <Typography variant = "subtitle1"
                        align = "center">
              Sem camadas de dados. <br />
              o.0
            </Typography>
          </Grid>
        </Grid>
      );
    }



    const itemLayer = (arrayOfTypes, url, icon) => {
      return arrayOfTypes.map((type, index) => (
          <ListItem button
                    key={(type.title+index)}
                    onClick={e => this._openLayer(e, url, index)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={`${type.title}`} />
          </ListItem>
      ));
    }
    
    return (
      <Grid container
            justify="center"
            spacing={3}
            style={{marginTop: 25}}>
    
        <Grid item
              xs={10}>
        {/* Layers List */}
        <List component="nav" aria-label="Main mailbox folders">
          {itemLayer(blueprint, 'blueprint', <Attachment />)}
          {itemLayer(border, 'border', <Timeline />)}
        </List>
        </Grid>
      </Grid>
    );
  }
}

Layer.propTypes = {
  place: PropTypes.object.isRequired,
  contourPolygons: PropTypes.array.isRequired,
};

// 
// Redux
// 
const mapStateToProps = (state) => {
  return {...state};
}

export default connect(
  mapStateToProps 
)(withRouter(Layer));