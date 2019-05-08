import React, { Component } from 'react';

import { Header, HeaderControl, PrimaryButton, Modal, PrimaryInput } from '../UI'

import { List, Grid } from '@material-ui/core';
import { Add, PlaceTwoTone } from '@material-ui/icons';

class Project extends Component {
  
  state = {
    modal: false
  }

  toggleModal = () => {
    this.setState({modal: !this.state.modal})
  }

  render() {
    return (
      <div>
        <Header icon={<PlaceTwoTone />} title="Lugares">
          <HeaderControl>
              <PrimaryButton icon={<Add />} title="Criar" gridSize={7} action={this.toggleModal} />
          </HeaderControl>
        </Header>




        {/* Modal */}
        <Modal open={this.state.modal} action={this.toggleModal}>
          {/* CreatePlace */}
          <Header icon={<Add />} title="Novo Local">
            <HeaderControl>
              <PrimaryInput icon={<PlaceTwoTone />} title="Procure o Local" ></PrimaryInput>
            </HeaderControl>
          </Header>
        </Modal>

        {/* <ProjectHeader toggle={this.props.toggle}></ProjectHeader> */}
        {/* <List style={{marginTop: 24}}>
          <ProjectItem  key={1}
                        title={"UTFPR"}
                        date={"04/05/2019"}  />
        </List> */}
      </div>
    )
  }
}

export default Project;