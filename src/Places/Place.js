import React, { Component } from 'react'
import { Header, HeaderControl, HeaderSubtitle, IconButton } from '../UI';
import { PlaceTwoTone, Timeline, AttachFile, AddLocation, MoreVert } from '@material-ui/icons';


class Place extends Component {
  render() {
    return (
      <div>

        <Header icon={<PlaceTwoTone />} title="UTFPR">
          <HeaderSubtitle>
            Sem descrição.
          </HeaderSubtitle>
          <HeaderControl>
            <IconButton icon={<Timeline />} title="Criar Contorno" />
            <IconButton icon={<AttachFile />} title="Criar Contorno" />
            <IconButton icon={<AddLocation />} title="Criar Contorno" />
            <IconButton icon={<MoreVert />} title="Criar Contorno" />
          </HeaderControl>
        </Header>


      </div>
    )
  }
}

export default Place;