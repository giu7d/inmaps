import React, { Component } from 'react';
import { IconButton } from '../../presentational';
import { Attachment } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withBlueprint } from './WithBlueprint';

class BlueprintButton extends Component {  
  
  render() {

    const { match, history } = this.props;

    return (
      <IconButton icon={<Attachment />} 
                  title="Adicionar Planta" 
                  action={ () => history.push(`/place/${match.params.id}/blueprint`)} />
    )
  }

}

export default withBlueprint(withRouter(BlueprintButton));
