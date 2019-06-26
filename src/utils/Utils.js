/* global google */

export default class Utils {

  // Misc
  static getRandomHexColor = () => {
  
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static mapPolygonToString = (polygon) => {
    // => Map polygon path to a array of 'path size'
    const polygonPathSize = polygon.getPath().getLength();
    const polygonPath = [...new Array(polygonPathSize)]
        .map((el, i) => polygon.getPath()
            .getAt(i)
            .toUrlValue(6)
            .match(/(-?\d+(\.\d+)?)/g));

    // => Convert nested array to string for saving in Firebase. 
    return JSON.stringify(polygonPath);
  }


  // Maps
  static setDrawingMode = (drawAPI, overlayType) => {
      drawAPI.setOptions({
        drawingMode: google.maps.drawing.OverlayType[overlayType],
        polygonOptions: {
          strokeColor: Utils.getRandomHexColor(),
          strokeOpacity: 0.5,
          strokeWeight: 3,
          fillColor: Utils.getRandomHexColor(),
          fillOpacity: 0.3,
          editable: true,
          draggable: false,
        },
      });
  }

  static addListener = (drawAPI, action, callback) => {
    google.maps.event.addListener(drawAPI, action, callback);
  }

  static addPolygonEvents = (polygon, callback) => {
    const path = polygon.getPath();
    google.maps.event.addListener(path, 'insert_at', () => callback(polygon));
    google.maps.event.addListener(path, 'set_at', () => callback(polygon));
  }

  static removePolygonEvents = (polygon) => {
    google.maps.event.clearListeners(polygon, 'polygoncomplete');
    google.maps.event.clearListeners(polygon, 'insert_at');
    google.maps.event.clearListeners(polygon, 'set_at');
    polygon.setMap(null);
  }

  static removeAllPolygonsEvents = (polygons) => {
    polygons.map(polygon => this.removePolygonEvents(polygon));
  }

}