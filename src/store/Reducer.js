import { Actions } from './Actions';

// 
// Reducer
// 

const InitialState = { 
  map: {
    mapAPI: null,
    drawAPI: null,
    lat: -14.235004,
    lng: -51.925279,
    zoom: 3,
  },
  layerView: '',
  // Disponibilizing Resources
  // it should be changed to a middleware Redux
  // ~le gambiarra~
  border: {
    createFunc: null
  },
  overlay: {
    transformFunc: null,
    positionFunc: null,
    deleteFunc: null,
    saveFunc: null,
  }
}

export const reducer = (state=InitialState, act) => {

  const { type } = act;
  const { setMapAPI, 
          setMapLocation, 
          setMapDrawAPI, 
          setLayerView, 
          createBorderFunc, 
          setOverlayTransformFunc,
          setOverlayPositionFunc,
          setOverlayDeleteFunc,
          setOverlaySaveFunc
        } = Actions;

  switch (type) {

    // Map
    case setMapAPI:
      return {
        ...state,
        map: { 
          ...state.map,
          mapAPI: act.mapAPI
        }
      }
    case setMapLocation:
      return {
        ...state,
        map: {
          ...state.map,
          lat: act.lat,
          lng: act.lng,
          zoom: act.zoom
        }
      }
    case setMapDrawAPI:
      return {
        ...state,
        map: {
          ...state.map,
          drawAPI: act.drawAPI
        }
      }
    
    case setLayerView:
      return {
        ...state,
        layerView: act.layerView
      }

    // Border 
    case createBorderFunc:
      return {
        ...state,
        border: {
          ...state.border,
          createFunc: act.createFunc
        }
      }

    // Overlay

    case setOverlayTransformFunc:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          transformFunc: act.transformFunc
        }
      }

    case setOverlayPositionFunc:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          positionFunc: act.positionFunc
        }
      }


    case setOverlayDeleteFunc:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          deleteFunc: act.deleteFunc
        }
      }


    case setOverlaySaveFunc:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          saveFunc: act.saveFunc
        }
      }

    default:
      return state;
  }
}
