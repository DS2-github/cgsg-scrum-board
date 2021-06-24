import React from 'react';
import { Icon } from 'semantic-ui-react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./contextmenu.css"

export default class ContextMenuAdd extends React.Component {

  render() {
    return (
      <ContextMenu id={this.props.properties.task.id}>
        <MenuItem onClick={() => this.props.properties.clone()}>
          <Icon name="copy outline" color="black" />Clone
        </MenuItem>
        <MenuItem onClick={() => this.props.properties.edit()}>
          <Icon name="edit" />Edit
        </MenuItem>
        <MenuItem onClick={() => this.props.properties.delete()}>
          <Icon name="trash" />Delete
        </MenuItem>
      </ContextMenu>
    );
  }
}