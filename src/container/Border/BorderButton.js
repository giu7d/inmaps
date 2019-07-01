import React, { Component } from 'react'
import { connect } from 'react-redux';
import { IconButton } from '../../presentational';
import { Timeline } from '@material-ui/icons';


class BorderButton extends Component {

  _createBorderHandle = () => {
    this.props.border.createFunc();
  }

  render() {
    return (
      <IconButton icon={<Timeline />} title="Criar Contorno" action={this._createBorderHandle} />
    )
  }
}

// 
// Redux
// 
const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(
  mapStateToProps
)(BorderButton)
