import React, { Component } from 'react'
import { IconButton } from '../../presentational';
import { Timeline } from '@material-ui/icons';
import { withBorder } from './WithBorder';
import { PropTypes } from 'prop-types';


class BorderButton extends Component {

  render() {

    return (
      <IconButton icon={<Timeline />} 
                  title="Criar Contorno" 
                  action={this.props.createBorder} />
    )
  }
}

BorderButton.propTypes = {
  createBorder: PropTypes.func.isRequired,
}


export default withBorder(BorderButton);
