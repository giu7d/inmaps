import React, { Component } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { DangerButton, SecundaryButton } from '../../presentational';
import { Delete, Done, Timeline } from '@material-ui/icons';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { withBorder } from './WithBorder';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';


const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#24c6dc',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#24c6dc',
      },
    },
    width: `100%`
  }
})(TextField);

const styles = {
  container: {
    marginTop: 24,
    height:`100%`,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  header: {
    marginBottom: 24,    
  },
  icon: {
    marginRight: 16
  },
  deleteBtn: {
    marginTop: 24,   
    marginBottom: 24
  }
}

class BorderOptions extends Component {

  state = {
    contourIndex: null,
    color: '#000000',
  }

  _init = () => {
    const { border } = this.props.place;
    const { contourIndex } = this.props.match.params;
    
    const { color } = border[contourIndex];

    this.setState({ 
      contourIndex: contourIndex,
      color: color
    });
  }

  _isEditable = (STATE) => {
    const { contourPolygons } = this.props;
    const contour = contourPolygons[this.state.contourIndex];
    
    contour.isEditable(STATE);
  }

  _changeColor = (event) => {
    
    const color = event.target.value;
    
    if (color.length <= 7 && color[0] === '#'){
      const { contourPolygons } = this.props;
      const contour = contourPolygons[this.state.contourIndex];
    
      contour.setColor(color);
      this.setState({ color });
    }
  }

  _delete = () => {
    this._isEditable(false);
    this.props.deleteBorder(this.state.contourIndex);
    this.props.history.goBack();
  }

  _complete = () => {
    const { contourPolygons, saveBorder} = this.props;
    const { contourIndex } = this.state;
    const contour = contourPolygons[contourIndex];

    saveBorder(contour);
    this._isEditable(false);

    this.props.history.goBack();
  }
  
  componentWillMount() {
    this._init();
  }

  componentDidMount() {
    this._isEditable(true);
  }

  render() {
    
    const { classes } = this.props;

    return (
      <div>
        <Grid className={classes.container}
              container 
              justify="center"
              spacing={3}>
            
          {/* Header */}
          <Grid className={classes.header}
                item 
                xs={10}>
            <Typography variant="h5" gutterBottom>
              <Timeline className={classes.icon} />
              Ajustes da borda
            </Typography>
            {/* <Typography variant="caption" gutterBottom>
              lorem ipsum
            </Typography> */}
          </Grid>

          {/* Ajuste das Cores */}
          <Grid item
                xs={10}>
            <CustomTextField  label="Cor do poligono"
                              value={this.state.color}
                              onChange={this._changeColor}
                            variant="outlined"/>
          </Grid>

          {/* Delete Button */}
          <Grid item
                xs={9}
                className={classes.deleteBtn}>
            <DangerButton icon={<Delete />} 
                          title="Excluir" 
                          gridSize={12} 
                          action={this._delete} />
          </Grid>

          {/* Save */}
          <Grid item
                xs={9}>
            <SecundaryButton  icon={<Done />} 
                              title="Pronto" 
                              gridSize={12} 
                              action={this._complete} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

BorderOptions.propTypes = {
  place: PropTypes.object.isRequired,
  contourPolygons: PropTypes.array.isRequired,
};


// 
// REDUX
// 
const mapStateToProps = (state) => {
  return {...state};
}

export default connect(
  mapStateToProps
)(
  withBorder(withStyles(styles)(withRouter(BorderOptions)))
);
