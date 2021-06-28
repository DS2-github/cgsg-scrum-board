import React, { useReducer, useContext } from 'react';
import { Modal, Button, Icon, Input } from 'semantic-ui-react'
import { ContextMenu, MenuItem } from "react-contextmenu";
import "./contextmenu.css"
import { Context } from '../../../index';

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
        onChange={(event) => this.props.disp({ type: 'update', value: event.target.value })}
      />
    );
  }
}

function EditTask(props) {
  const [state, disp] = useReducer(editReducer, {
    open: false,
    value: "",
  })
  const { open, value } = state;
  return (
    <Modal
      basic
      open={open}
      onOpen={() => disp({ type: 'open', value: props.task.content })}
      onClose={() => disp({ type: 'close' })}
      size='large'
      dimmer='blurring'
      trigger={props.trigger}
    >
      <Modal.Content>
        <Inpt disp={disp} content={value} />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => disp({ type: 'close', value: value })}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={() => {
          props.task.author !== "tester" ?
            alert("Access denied!") :
            props.dispatch({ type: 'editTask', taskId: props.task.id, content: value, socket: props.socket }); disp({ type: 'close', value: value })
        }}>
          <Icon name='checkmark' /> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default function ContextMenuAdd(props) {
  const session = useContext(Context);

  return (
    <ContextMenu id={props.task.id}>
      <EditTask trigger={
        <MenuItem><Icon name="edit" />Edit</MenuItem>
      }
        task={props.task}
        socket={session.socket}
        dispatch={props.dispatch}
      />
      <MenuItem onClick={() => { props.dispatch({ type: 'addTask', colId: props.task.colId, content: props.task.content, socket: session.socket }) }}>
        <Icon name="copy outline" color="black" />Clone
        </MenuItem>
      <MenuItem onClick={() => { props.dispatch({ type: 'deleteTask', colId: props.task.colId, taskId: props.task.id, socket: session.socket }) }}>
        <Icon name="trash" />Delete
        </MenuItem>
    </ContextMenu>
  );
}