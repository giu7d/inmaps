import React, { Component } from 'react';
import { IconButton } from '../../presentational';
import { AttachFile } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

class BlueprintButton extends Component {  
  
  render() {

    const { match, history } = this.props;

    return (
      <IconButton icon={<AttachFile />} 
                  title="Adicionar Planta" 
                  action={ () => history.push(`/place/${match.params.id}/blueprint`)} />
    )
  }

}

export default withRouter(BlueprintButton)
