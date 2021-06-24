import React, { useState } from 'react'
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

function AddTask(props) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState("");

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
                <Button basic color='red' inverted onClick={() => { setOpen(false); setValue("") }}>
                    <Icon name='remove' /> Cancel
          </Button>
                <Button color='green' inverted onClick={() => { setOpen(false); props.newTask(props.colId, value); }}>
                    <Icon name='checkmark' /> Confirm
          </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default class DropDownMenu extends React.Component {
    render() {
        return (
            <Container>
                <Dropdown pointing='left' className='link item' icon="ellipsis vertical">
                    <Dropdown.Menu>
                        <AddTask trigger={<Dropdown.Item icon="plus" content="New task" />}
                            newTask={this.props.newTask}
                            colId={this.props.colId}
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
}
