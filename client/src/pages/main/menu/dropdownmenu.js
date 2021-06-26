import React, { useState, useReducer, useContext } from 'react'
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import { Modal, Button, Icon, Input, Dropdown } from 'semantic-ui-react'
import { Context } from '../../../index';

const Container = styled.button`
  border: 0;
  vertical-align: top;
  padding: 4px;
  padding-right: 8px;
  background-color: rgb(216, 216, 210);
  width: fit-content;
  display: inline-block;
  vertical-align: top;
  float:right;
`;

function addReducer(state, action) {
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

function RenameList(props) {
    const [state, disp2] = useReducer(addReducer, {
        open: false,
        value: "",
    })
    const { open, value } = state;
    return (
        <Modal
            basic
            open={open}
            onOpen={() => disp2({ type: 'open', value: props.column.tittle })}
            onClose={() => disp2({ type: 'close' })}
            size='large'
            dimmer='blurring'
            trigger={props.trigger}
        >
            <Modal.Content>
                <Inpt disp={disp2} content={value} />
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => disp2({ type: 'close', value: value })}>
                    <Icon name='remove' /> Cancel
          </Button>
                <Button color='green' inverted
                    onClick={() => {
                        props.dispatch({
                            type: 'renameList', colId: props.column.id, tittle: value, socket: props.socket
                        });
                        disp2({ type: 'close', value: value })
                    }}>
                    <Icon name='checkmark' /> Confirm
          </Button>
            </Modal.Actions>
        </Modal>
    );
}

function AddTask(props) {
    const [state, disp] = useReducer(addReducer, {
        open: false,
        value: "",
    })
    const { open, value } = state;
    return (
        <Modal
            basic
            open={open}
            onOpen={() => disp({ type: 'open' })}
            onClose={() => disp({ type: 'close' })}
            size='large'
            dimmer='blurring'
            trigger={props.trigger}
        >
            <Modal.Content>
                <Inpt disp={disp} value={value} />
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => disp({ type: 'close', value: "" })}>
                    <Icon name='remove' /> Cancel
                    </Button>
                <Button color='green' inverted
                    onClick={() => {
                        props.dispatch({
                            type: 'addTask', colId: props.colId, content: value, socket: props.socket
                        });
                        disp({ type: 'close', value: "" })
                    }}>
                    <Icon name='checkmark' /> Confirm
                    </Button>
            </Modal.Actions>
        </Modal>
    );
}

function AddList(props) {
    const [state, disp3] = useReducer(addReducer, {
        open: false,
        value: "",
    })
    const { open, value } = state;
    return (
        <Modal
            basic
            open={open}
            onOpen={() => disp3({ type: 'open' })}
            onClose={() => disp3({ type: 'close' })}
            size='large'
            dimmer='blurring'
            trigger={props.trigger}
        >
            <Modal.Content>
                <Inpt disp={disp3} value={value} />
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => disp3({ type: 'close', value: "" })}>
                    <Icon name='remove' /> Cancel
                    </Button>
                <Button color='green' inverted onClick={() => { props.dispatch({ type: 'addList', tittle: value, socket: props.socket }); disp3({ type: 'close', value: "" }) }}>
                    <Icon name='checkmark' /> Confirm
                    </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default function DropDownMenu(props) {
    const session = useContext(Context);
    return (
        <Container>
            <Dropdown pointing='left' className='link item' icon="ellipsis vertical" closeOnChange={true}>
                <Dropdown.Menu>
                    <AddTask
                        dispatch={props.dispatch}
                        socket={session.socket}
                        colId={props.column.id}
                        trigger={<Dropdown.Item icon="plus" content="New task" />}
                    />
                    {/*<Dropdown.Item icon="delete" content="Clear list" />*/}
                    <AddList
                        dispatch={props.dispatch}
                        socket={session.socket}
                        trigger={<Dropdown.Item icon="folder" content="Add list" />}
                    />
                    <RenameList
                        dispatch={props.dispatch}
                        socket={session.socket}
                        column={props.column}
                        trigger={<Dropdown.Item icon="edit" content="Rename list" />}
                    />
                    <Dropdown.Item icon="trash" content="Delete list" onClick={() => props.dispatch({ type: 'deleteList', colId: props.column.id, socket: session.socket })} />
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    );
}
