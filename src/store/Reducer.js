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
  place: null,
  overlays: [],
  contourPolygons: [],
  isContourLoaded: false,
  isOverlaysLoaded: false,
}

export const reducer = (state=InitialState, act) => {

  const { type } = act;
  const { setMapAPI, 
          setMapLocation, 
          setMapDrawAPI, 
          setOverlays,
          setContourPolygons,
          setPlace,
          setContourLoaded,
          setOverlaysLoaded,
          resetStore
        } = Actions;

  switch (type) {
    
    case resetStore:
      
    console.log('reset');
      // Except map
      return {
        ...InitialState,
        map: {...state.map}
      }

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
     * Place Reducer
     * 
     * Implements:
     * setPlace
     */
    case setPlace:
      
      return {
        ...state,
        place: {...act.place}
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
    
    case setOverlaysLoaded:
      return {
        ...state,
        isOverlaysLoaded: act.isOverlaysLoaded
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
      
    case setContourLoaded:
      return {
        ...state,
        isContourLoaded: act.isContourLoaded
      }

    default:
      return state;
  }
}
