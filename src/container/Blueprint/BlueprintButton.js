import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/Actions';
import { IconButton } from '../../presentational';
import { AttachFile } from '@material-ui/icons';

class BlueprintButton extends Component {  
  render() {
    return (
      <IconButton icon={<AttachFile />} 
                  title="Adicionar Planta" 
                  action={ () => this.props.setLayerView('BLUEPRINT_UPLOAD') } 
                  disabled={(this.props.layerView === 'BLUEPRINT_UPLOAD')} />
    )
  }

}

// 
// Redux
// 
const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLayerView: (TYPE) => dispatch({
      type: Actions.setLayerView,
      layerView: TYPE
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlueprintButton)
