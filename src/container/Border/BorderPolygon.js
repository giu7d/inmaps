/* global google */
import Utils from '../../utils/Utils';

// 
// O Border polygon fornece todas as ferramentas para criação de um poligono!!
// 
export default class BorderPolygon {


  constructor(mapAPI, drawAPI, callback) {
    this._mapAPI = mapAPI
    this._drawAPI = drawAPI;
    this._callback = callback;

    this._polygon = null;
    this._color = Utils.getRandomHexColor();
  }


  createWithListener = () => {

    this._drawingMode('POLYGON');
    
    google.maps.event.addListener(this._drawAPI, 'polygoncomplete', (polygon) => {

      this._drawingMode(null);
      this.load(polygon);
    
      google.maps.event.clearListeners(this._drawAPI, 'polygoncomplete');

      this._callback(this);
    });
  }

  load = (polygon) => {

    
    const path = polygon.getPath();
    
    this.setPolygon(polygon);
    
    polygon.setMap(this._mapAPI);
    
    google.maps.event.addListener(path, 'insert_at', () => this._callback(this));
    google.maps.event.addListener(path, 'set_at', () => this._callback(this));
    
  }

  isEditable = (STATE) => {
    this._polygon.setEditable(STATE);
  }

  setColor = (color) => {
    this._polygon.setOptions({ 
      strokeColor: color,
      fillColor: color       
    }); 

    this._color = color;
  }
  
  _drawingMode = (overlayType) => {
    
    this._drawAPI.setOptions({
      drawingMode: google.maps.drawing.OverlayType[overlayType],
      polygonOptions: {
        strokeColor: this._color,
        strokeOpacity: 0.5,
        strokeWeight: 3,
        fillColor: this._color,
        fillOpacity: 0.3,
      },
    });
  }

  createPolygonFromPathString = (pathString, color = this._color) => {

    this._color = color;

    const paths = JSON.parse(pathString);

    return new google.maps.Polygon({
      paths: paths.map(coord => new google.maps.LatLng(coord[0], coord[1])),
      strokeColor: color,
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.3
    });

  }

  getCoordinatesAsString = () => {
    // => Map polygon path to a array of 'path size'
    const polygonPathSize = this._polygon.getPath().getLength();
    const polygonPath = [...new Array(polygonPathSize)]
        .map((el, i) => this._polygon.getPath()
            .getAt(i)
            .toUrlValue(6)
            .match(/(-?\d+(\.\d+)?)/g));

    // => Convert nested array to string for saving in Firebase. 
    return JSON.stringify(polygonPath);
  }

  setPolygon(polygon) {
    this._polygon = polygon;
  }

}