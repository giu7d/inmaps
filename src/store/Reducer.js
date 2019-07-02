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
  overlays: [],
  contourPolygons: []
}

export const reducer = (state=InitialState, act) => {

  const { type } = act;
  const { setMapAPI, 
          setMapLocation, 
          setMapDrawAPI, 
          setOverlays,
          setContourPolygons
        } = Actions;

  switch (type) {
    
    /**
     * Map Reducer
     * 
     * Implements:
     * setMapAPI, setMapLocation, setDrawAPI
     */
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


    /**
     * Overlays (instances of Blueprints) Reducer
     * 
     * Implements:
     * setOverlays
     */
    case setOverlays:
      return {
        ...state,
        overlays: [...act.overlays]
      }


    /**
     * Contour Polygons (instances of Border) Reducer
     * 
     * Implements:
     * setOverlays
     */
    case setContourPolygons:
      return {
        ...state,
        contourPolygons: [...act.contourPolygons]
      }      

    default:
      return state;
  }
}
