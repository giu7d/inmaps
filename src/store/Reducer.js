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
  }
}

export const reducer = (state=InitialState, act) => {

  const { type } = act;
  const { setMapAPI, setMapLocation, setMapDrawAPI } = Actions;

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
      
    default:
      return state;
  }
}
