import React, { useReducer } from 'react';
import { Modal, Button, Icon, Input } from 'semantic-ui-react'
import { ContextMenu, MenuItem } from "react-contextmenu";
import "./contextmenu.css"

function editReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false, value: action.value }
    case 'open':
      return { open: true, value: action.value }
    case 'update':
      return { value: action.value }
    default:
      throw new Error('Unsupported action...')
  }
}

class Inpt extends React.Component {
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return (
      <Input
        ref={(input) => { this.input = input; }}
        fluid defaultValue={this.props.content}
        onChange={(event) => this.props.dispatch({ type: 'update', value: event.target.value })}
      />
    );
  }
}

function EditTask(props) {
  const [state, dispatch] = useReducer(editReducer, {
    open: false,
    value: "",
  })
  const { open, value } = state;
  return (
    <Modal
      basic
      open={open}
      onOpen={() => dispatch({ type: 'open', value: props.task.content })}
      onClose={() => dispatch({ type: 'close' })}
      size='large'
      dimmer='blurring'
      trigger={props.trigger}
    >
      <Modal.Content>
        <Inpt dispatch={dispatch} content={value} />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => dispatch({ type: 'close', value: value })}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={() => {
          props.task.author !== "tester" ?
            alert("Access denied!") :
            props.editTask(props.task.id, value); dispatch({ type: 'close', value: value })
        }}>
          <Icon name='checkmark' /> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default class ContextMenuAdd extends React.Component {

  render() {
    return (
      <ContextMenu id={this.props.task.id}>
        <EditTask trigger={
          <MenuItem><Icon name="edit" />Edit</MenuItem>
        }
          task={this.props.task}
          editTask={this.props.editTask}
        />
        <MenuItem onClick={() => { this.props.cloneTask(this.props.colId, this.props.task.content) }}>
          <Icon name="copy outline" color="black" />Clone
        </MenuItem>
        <MenuItem onClick={() => { this.props.deleteTask(this.props.colId, this.props.task.id) }}>
          <Icon name="trash" />Delete
        </MenuItem>
      </ContextMenu>
    );
  }
}