import { Actions } from './Actions';

const InitialState = {
  map: {
    mapAPI: null,
    drawAPI: null,
    lat: -14.235004,
    lng: -51.925279,
    zoom: 3,
  },
  place: {
    id: '',
    title: '',
    description: '',
    address: '',
    placeId: '',
    center: {},
    border: [],
    blueprint: [],
    tag: [],
    creationTime: null
  }

}

export const reducer = (state=InitialState, act) => {
  
  switch (act.type) {

    // Map
    case Actions.setMapAPI:
      return {
        ...state,
        map: { 
          ...state.map,
          mapAPI: act.mapAPI
        }
      }
    
    case Actions.setMapLocation:
      return {
        ...state,
        map: {
          ...state.map,
          lat: act.lat,
          lng: act.lng,
          zoom: act.zoom
        }
      }
      
    case Actions.setMapDrawAPI:
      return {
        ...state,
        map: {
          ...state.map,
          drawAPI: act.drawAPI
        }
      }

    // Place
    case Actions.setPlace:
      return {
        ...state,
        place: { 
          // Atenção Aqui, pode dar ruim
          ...state.place, 
          ...act.place 
        }
      }

    case Actions.setPlaceBorder:
      return {
        ...state,
        place: { 
          ...state.place,
          border: [...act.border] 
        }
      }


    default:
      return state;
  }
}
