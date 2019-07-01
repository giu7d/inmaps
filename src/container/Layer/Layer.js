import React, { Component } from 'react'
import { connect } from 'react-redux';
import BlueprintUpload from '../Blueprint/BlueprintUpload';
import BlueprintOptions from '../Blueprint/BlueprintOptions';
import BorderOptions from '../Border/BorderOptions';

class Layer extends Component {
  
  
  render() {
    const layerView = () => {
      switch (this.props.layerView) {
        case 'BLUEPRINT_UPLOAD':
          return (
          <BlueprintUpload  place={ this.props.place } />
          );
        case 'BLUEPRINT_OPTIONS':
          return (
            <BlueprintOptions place={ this.props.place } />
          );
        
        case 'BORDER_OPTIONS':
          return (
            <BorderOptions />
          );

        default:
          return (
            <h1>Layer</h1>
          );
      }
    }


    return (
      <div>
        {layerView()}
      </div>
    )
  }
}

// 
// REDUX
// 
const mapStateToProps = (state) => {
  return {...state};
}

export default connect(
  mapStateToProps
)(Layer);