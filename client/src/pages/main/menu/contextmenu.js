import React, { useState } from 'react';
import { Modal, Button, Icon, Input } from 'semantic-ui-react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./contextmenu.css"

function Edit(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(props.content);

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={props.trigger}
    >
      <Modal.Content>
        <Input fluid value={value} onChange={event => setValue(event.target.value)} />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}


export default class ContextMenuAdd extends React.Component {

  render() {
    return (
      <ContextMenu id={this.props.task.id}>
        <Edit trigger={
          <MenuItem>
            <Icon name="edit" color="black" />Edit
          </MenuItem>
        }
          content={this.props.task.content}
        />
        <MenuItem onClick={() => { }}>
          <Icon name="copy outline" />Clone
        </MenuItem>
        <MenuItem onClick={() => { }}>
          <Icon name="trash" />Delete
        </MenuItem>
      </ContextMenu>
    );
  }
}