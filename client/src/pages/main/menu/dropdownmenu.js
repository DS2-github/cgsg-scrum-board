import React from 'react'
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react'

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

export default class DropDownMenu extends React.Component {
    render() {
        return (
            <Container>
                <Dropdown pointing='left' className='link item' icon="ellipsis vertical">
                    <Dropdown.Menu>
                        <Dropdown.Item icon="plus" content="New task" onClick={() => { this.props.newTask(this.props.colId) }} />
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
