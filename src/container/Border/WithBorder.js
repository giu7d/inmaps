import React, { Component } from 'react';
import { Actions } from '../../store/Actions';
import { connect } from 'react-redux';
import BorderPolygon from './BorderPolygon';
import PlaceService from '../Place/PlaceService';



// Manipulate Border Polygon Aniwhere
export const withBorder = (InputComponent) => {

  class WithBorderComponent extends Component {

    create = () => {
      
      const { mapAPI, drawAPI } = this.props.map;
      const borderPolygon = new BorderPolygon(mapAPI, drawAPI, this.save);
      borderPolygon.createWithListener();
    }

    load = () => {
      
      console.log('LOAD BOARD')

      const { border } = this.props.place;
      const { mapAPI, drawAPI } = this.props.map;

      const borderPolygons = border.map(({ path, color }) => {

        const borderPolygon = new BorderPolygon(mapAPI, drawAPI, this.save);

        const polygon = borderPolygon.createPolygonFromPathString(path, color);

        borderPolygon.load(polygon);

        return borderPolygon
      });

      this.store(borderPolygons);

    }
    
    save = (polygon) => {
      
      const { contourPolygons } = this.props;
      
      const index = contourPolygons.indexOf(polygon);
              
      if (index === -1) {
        contourPolygons.push(polygon);
      } else {
        contourPolygons[index] = polygon;
      }
      
      this.store(contourPolygons);
    }

    delete = (index) => {

      const { contourPolygons } = this.props;
  
      contourPolygons[index]._polygon.setMap(null)

      contourPolygons.splice(index, 1);

      this.store(contourPolygons);
    }

    store = (contourPolygons) => {

      const { place, setPlace, setContourPolygons } = this.props;

      const border = contourPolygons.map((contour, index) => {
        return {
          title: `Contorno #${index+1}`,
          path: contour.getCoordinatesAsString(),
          color: contour._color
        }
      });
    
      const newPlace = {
        ...place,
        border: border
      }

      setContourPolygons(contourPolygons);
      setPlace(newPlace);
      
      try {
        console.log('STORE BORDER');
        console.log(newPlace, contourPolygons);
        PlaceService.update(newPlace.id, newPlace);
      } catch (e) {
        console.log(e);
      }
    }

    componentWillMount() {
      const { isContourLoaded, setContourLoaded, place } = this.props;
      
      if (!isContourLoaded && place.border.length !== 0) {
        this.load();
        setContourLoaded(true);
      } else if (place.border.length === 0) {
        setContourLoaded(true);
      }
    }
    
    render () { 
      return (
        <InputComponent {...this.props}
                        createBorder={this.create}
                        loadBorder={this.load}
                        deleteBorder={this.delete}
                        saveBorder={this.save}
                        storeBorder={this.store} />
      ) 
    }
  }

  // Redux
  const mapStateToProps = (state) => {
    return {...state};
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setContourPolygons: (POLYGON_ARRAY) => dispatch({
        type: Actions.setContourPolygons,
        contourPolygons: POLYGON_ARRAY
      }),
      setPlace: (place) => dispatch({
        type: Actions.setPlace,
        place: place
      }),
      setContourLoaded: (STATE) => dispatch({
        type: Actions.setContourLoaded,
        isContourLoaded: STATE
      }),
    }
  }


  return connect(
    mapStateToProps, 
    mapDispatchToProps
    )(WithBorderComponent);
}