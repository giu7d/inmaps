/* global google */ 

let that = {};

export default function BlueprintOverlay(map, blueprint, markerA, markerB, saveFunc, deleteFunc) {
  
  const {image, url, border, rotation, scale} = blueprint;

  this._bounds = border;
  this._image = image;
  this._src = url;
  this._map = map;
  this._div = null;
  this._rotation = rotation;
  this._scale = scale;

  this._saveFunc = saveFunc;
  this._deleteFunc = deleteFunc;
  
  this.markerA = markerA;
  this.markerB = markerB;
  this.setMap(map);
}

BlueprintOverlay.prototype = new google.maps.OverlayView();

BlueprintOverlay.prototype.onAdd = function () {

  const img = document.createElement('img');
  img.src = this._src;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';

  const div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';
  div.style.transform = `rotate(${this._rotation}deg) scale(${this._scale}, ${this._scale})`;


  div.appendChild(img);

  this._div = div;
  
  const panes = this.getPanes();
  panes.overlayMouseTarget.appendChild(div);
};

BlueprintOverlay.prototype.draw = function () {

  const overlayProjection = this.getProjection();
  const sw = overlayProjection.fromLatLngToDivPixel(this._bounds.getSouthWest());
  const ne = overlayProjection.fromLatLngToDivPixel(this._bounds.getNorthEast());
  const div = this._div;

  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};


BlueprintOverlay.prototype.updateBounds = function (bounds) {
  this._bounds = bounds;
  this.draw();
};

BlueprintOverlay.prototype.updateTransform = function (rotation, scale) {
  this._rotation = rotation;
  this._scale = scale;
  this.onRemove();
  this.onAdd();
  this.draw();
};

BlueprintOverlay.prototype.updateMarkersVisibility = function (STATE) {
  this.markerA.setVisible(STATE);
  this.markerB.setVisible(STATE); 
}

BlueprintOverlay.prototype.onRemove = function () {
  this._div.parentNode.removeChild(this._div);
  this._div = null;
};


BlueprintOverlay.prototype.getAsBlueprint = function () {
  return {
    image: this._image,
    url: this._src,
    border: {
      sw: {
        latitude: this._bounds.getSouthWest().lat(),
        longitude: this._bounds.getSouthWest().lng(),
      },
      ne: {
        latitude: this._bounds.getNorthEast().lat(),
        longitude: this._bounds.getNorthEast().lng(),
      }
    },
    scale: this._scale,
    rotation: this._rotation
  }
}


BlueprintOverlay.prototype.loadLeastSavedState = function () {
  this.updateBounds(that._bounds);
  this.updateTransform(that._rotation, that._scale);
  this.markerA = that.markerA;
  this.markerB = that.markerB;
}

BlueprintOverlay.prototype.save = function () {
  that = {...this};
  this._saveFunc(this);
}

BlueprintOverlay.prototype.persistDeletion = function (index) {
  this._deleteFunc(index);
}
