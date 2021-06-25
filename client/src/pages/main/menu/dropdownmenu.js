import React, { useState, useReducer } from 'react'
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import { Modal, Button, Icon, Input, Dropdown } from 'semantic-ui-react'

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
            return { open: false, value: "" }
        case 'open':
            return { open: true, value: "" }
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
                fluid value={this.props.value}
                onChange={(event) => this.props.dispatch({ type: 'update', value: event.target.value })}
            />
        );
    }
}

function AddTask(props) {
    const [state, dispatch] = useReducer(addReducer, {
        open: false,
        value: "",
    })
    const { open, value } = state;
    return (
        <Modal
            basic
            open={open}
            onOpen={() => dispatch({ type: 'open' })}
            onClose={() => dispatch({ type: 'close' })}
            size='large'
            dimmer='blurring'
            trigger={props.trigger}
        >
            <Modal.Content>
                <Inpt dispatch={dispatch} value={value} />
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => dispatch({ type: 'close', value: "" })}>
                    <Icon name='remove' /> Cancel
                    </Button>
                <Button color='green' inverted onClick={() => { props.newTask(props.colId, value); dispatch({ type: 'close', value: "" }) }}>
                    <Icon name='checkmark' /> Confirm
                    </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default function DropDownMenu(props) {
    return (
        <Container>
            <Dropdown pointing='left' className='link item' icon="ellipsis vertical" closeOnChange={true}>
                <Dropdown.Menu>
                    <AddTask
                        newTask={props.newTask}
                        colId={props.colId}
                        trigger={<Dropdown.Item icon="plus" content="New task" />}
                    />
                    <Dropdown.Item icon="copy" content="Copy list" />
                    <Dropdown.Item icon="folder" content="Add list" />
                    <Dropdown.Item icon="edit" content="Rename list" />
                    <Dropdown.Item icon="trash" content="Delete list" />
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    );
}
