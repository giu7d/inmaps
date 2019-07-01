import React, { Component } from 'react'

import { Grid, Typography } from '@material-ui/core';
import { Done, Delete, Edit } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/lab/Slider';

import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';

import { SecundaryButton, DangerButton } from '../../presentational';

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
    rotation: 0,
    scale: 1
  }

  _coordSelectorHandler = (e) => {
    const { positionFunc } = this.props.overlay;
    positionFunc(window.selectOverlay);
  }

  _rotateHandler = (e, value) => {

    const { transformFunc } = this.props.overlay;
    transformFunc(window.selectOverlay, value, this.state.scale);

    this.setState({ rotation: value });
  };

  _scaleHandler = (e, value) => {
    const { transformFunc } = this.props.overlay;
    transformFunc(window.selectOverlay, this.state.rotation, value);

    this.setState({ scale: value });
  };

  _deleteHandler = () => {

    const { deleteFunc } = this.props.overlay;
    deleteFunc(window.selectOverlay);

    this.props.setLayerView(null);    
  }

  _completeHandler = () => {
    this.props.overlay.saveFunc(window.selectOverlay);
    this.props.setLayerView(null);
  }


  componentDidMount() {
    console.log(window.selectOverlay);
  }


  render() {

    return (
      <Grid container 
            justify="center"
            spacing={3}
            style={{marginTop: 25, height: `100%` }}>
        {/*  Title */}
        <Grid item 
              xs={10}>
          <Typography variant="h5" gutterBottom>
            Planta
          </Typography>

          <Typography variant="caption" gutterBottom>
            {/* [url: {this.props.selectOverlay._image}] */}
          </Typography>
        </Grid>

        {/* Cordenate Selection */}
        <Grid item
              xs={10}>
          <Typography gutterBottom>Posição</Typography>
          <SecundaryButton  icon={<Edit />} 
                            title="Selecionar coordenada" 
                            gridSize={12} 
                            action={this._coordSelectorHandler} />
        </Grid>

        {/* Image Rotation Slider */}
        <Grid item 
              xs={10}
              style={{ marginTop:25 }}>
          <Typography gutterBottom>Rotação</Typography>
          <br/>
          <CustomSlider aria-label="rotation" 
                        value={this.state.rotation}
                        onChange={this._rotateHandler}
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
                        onChange={this._scaleHandler}
                        step={0.1}
                        min={0.1}
                        max={10}
                        valueLabelDisplay="auto"/>
        </Grid>

        {/* Buttons */}
        <Grid item
              xs={7}>
          <DangerButton  icon={<Delete />} 
                          title="Excluir" 
                          gridSize={12} 
                          action={this._deleteHandler} />
        </Grid>
        <Grid item
              xs={7}>
          <SecundaryButton  icon={<Done />} 
                            title="Pronto" 
                            gridSize={12} 
                            action={this._completeHandler} />
        </Grid>
      </Grid>
      
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
    setLayerView: (TYPE) => dispatch({
      type: Actions.setLayerView,
      layerView: TYPE
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlueprintOptions)
