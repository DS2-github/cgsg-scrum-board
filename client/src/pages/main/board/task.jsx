import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ContextMenuAdd from '../menu/contextmenu.js'

const Container = styled.div`
  width: 260px; 
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  margin-right: 0;
  background-color: ${props => (props.isDragging ? 'lightskyblue' : '#f5f5f5')};
`;

const Content = styled.p`
  font-size: 21px;
  border: 0;
`;

const Author = styled.p`
  font-size: 14px;
`;

export default class Task extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index} >

                {(provided, snapshot) => (
                    <div>
                        <ContextMenuTrigger id={this.props.task.id}>
                            <Container
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                innerRef={provided.innerRef}
                                isDragging={snapshot.isDragging}
                                aria-roledescription="Press space bar to lift the task"
                            >
                                <Content>{this.props.task.content}</Content>
                                <Author>{this.props.task.author}</Author>
                            </Container>
                        </ContextMenuTrigger>

                        {/* V pole "properties" ya prosto peredayu vse dermo v contextmenu;
                            Nuzhni functions clone, delete, edit */}
                        <ContextMenuAdd properties={this.props} />
                    </div>
                )}
            </Draggable>
        );
    }
}