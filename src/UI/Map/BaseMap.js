/* global google */
import { compose, withProps } from 'recompose';
import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";


const baseMap = (props) => {
  
  const { zoom, center } = props;

  return (
    <GoogleMap  zoom={zoom}
                center={center}>
      
        <DrawingManager
        // defaultDrawingMode={google.maps.drawing.OverlayType['POLYGON']}
        defaultOptions={{
          drawingControl: false,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON,
            ],
          },
          circleOptions: {
            fillColor: `#ffff00`,
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
          },
        }} />

    </GoogleMap>
  )
}

export default compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(baseMap);
