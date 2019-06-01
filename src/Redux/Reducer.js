import { Actions } from './Actions';

const InitialState = {
  map: null,
  lat: -14.235004,
  lng: -51.925279,
  zoom: 3
}

export const reducer = (state=InitialState, act) => {
  
  switch (act.type) {

    case Actions.setMap:
      return {
        ...state,
        map: act.map
      }
    
    case Actions.setMapLocation:
      return {
        ...state,
        lat: act.lat,
        lng: act.lng,
        zoom: act.zoom
      }      

    default:
      return state;
  }
}
