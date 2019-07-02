import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Done, Delete, Close, SettingsOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/lab/Slider';
import { SecundaryButton, DangerButton } from '../../presentational';
import { Actions } from '../../store/Actions';
import { withRouter } from 'react-router-dom';


const CustomSlider = withStyles({
  root: {
    color: '#24c6dc',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
    marginTop: -14,
    marginLeft: -14,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    backgroundColor: 'currentColor',
  }
})(Slider);

class BlueprintOptions extends Component {

  state = {
    overlayIndex: null,
    rotation: null,
    scale: null
  }


  _init = () => {

    const { blueprint } = this.props.place;
    const { overlayIndex } = this.props.match.params;
    
    const bl = blueprint[overlayIndex];

    this.setState({
      overlayIndex: overlayIndex,
      rotation: bl.rotation,
      scale: bl.scale
    });
  }

  _rotate = (e, angle) => {

    const { overlays } = this.props;
    const overlay = overlays[this.state.overlayIndex];

    overlay.updateTransform(angle, this.state.scale);

    this.setState({ 
      rotation: angle 
    });
  }

  _scale = (e, scale) => {

    const { overlays } = this.props;
    const overlay = overlays[this.state.overlayIndex];

    overlay.updateTransform(this.state.rotation, scale);

    this.setState({ 
      scale: scale
    });
  }

  _save = () => {
    const { overlays } = this.props;
    const overlay = overlays[this.state.overlayIndex];

    overlay.save();
  }

  _delete = () => {
    const { overlays } = this.props;
    const overlay = overlays[this.state.overlayIndex];
    
    // Delete from View
    overlay.setMap(null);

    // Delete from From and Redux State
    overlay.persistDeletion(this.state.overlayIndex);
    this.props.history.goBack();
  }

  _complete = () => {
    this._save();
    this.props.history.goBack();
  }

  _cancel = () => {
    const { overlays } = this.props;
    const overlay = overlays[this.state.overlayIndex]; 
    
    overlay.loadLeastSavedState();
    this._init();
    this.props.history.goBack();
  }

  _isMarkersVisible = (STATE) => {
    const { overlays } = this.props;
    const overlay = overlays[this.state.overlayIndex];

    overlay.updateMarkersVisibility(STATE);
  }

  componentWillMount() {
    this._init();
  }

  componentDidMount() {
    this._save();
    this._isMarkersVisible(true);
  }

  componentWillUnmount() {
    this._isMarkersVisible(false);
  }

  render() {

    return (
      <div>
      <Grid container 
            justify="center"
            spacing={3}
            style={{ marginTop: 25, height: `100%` }}>
        {/* Header */}
        <Grid item 
              xs={10}>
          <Typography variant="h5" gutterBottom>
            <SettingsOutlined style={{ marginRight: 14 }} />
            Ajustes da planta
          </Typography>

          <Typography variant="h5" gutterBottom>
            
          </Typography>
        </Grid>

        {/* Image Rotation Slider */}
        <Grid item 
              xs={10}
              style={{ marginTop:25 }}>
          <Typography gutterBottom>Rotação</Typography>
          <br/>
          <CustomSlider aria-label="rotation" 
                        value={this.state.rotation}
                        onChange={this._rotate}
                        min={-180}
                        max={180}
                        valueLabelDisplay="auto"/>
        </Grid>

        {/* Image Scale Slider */}
        <Grid item 
              xs={10}
              style={{ marginTop:25 }}>
          <Typography gutterBottom>Escala</Typography>
          <br/>
          <CustomSlider aria-label="scale" 
                        value={this.state.scale}
                        onChange={this._scale}
                        step={0.1}
                        min={0.1}
                        max={10}
                        valueLabelDisplay="auto"/>
        </Grid>

        {/* Delete Button */}
        <Grid item
              xs={9}
              style={{ marginTop: 25, marginBottom: 90 }}>
          <DangerButton  icon={<Delete />} 
                          title="Excluir" 
                          gridSize={12} 
                          action={this._delete} />
        </Grid>

      </Grid>
      {/* Buttons */}
      <Paper  elevation={0}
              style={{
                position: 'absolute',              
                bottom:0,
                width: 340  
              }}>
        <Grid container 
              justify="center"
              spacing={3}
              style={{margin:'auto', height: `100%` }}>
            
            {/* Cancel */}
            <Grid item
                  xs={5}>
              <SecundaryButton  icon={<Close />} 
                                title="Cancelar" 
                                gridSize={12} 
                                action={this._cancel} />
            </Grid>

            {/* Save */}
            <Grid item
                  xs={5}>
              <SecundaryButton  icon={<Done />} 
                                title="Pronto" 
                                gridSize={12} 
                                action={this._complete} />
          </Grid>
        </Grid>

      </Paper>
    </div>
    )
  }
}

// 
// REDUX
// 
const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOverlays: (OVERLAYS_ARRAY) => dispatch({
      type: Actions.setOverlays,
      overlays: OVERLAYS_ARRAY
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BlueprintOptions))
