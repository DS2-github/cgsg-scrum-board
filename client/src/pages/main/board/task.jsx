import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ContextMenuTrigger } from 'react-contextmenu';
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
  overflow-wrap: break-word;
  height: fit-context;
  font-size: 21px;
  border: 0;
`;

const Status = styled.i`
  display:inline-block;
  font-size: 10px;
  color:red;
`

const Author = styled.p`
  display:inline-block;
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
                                <Status>{this.props.task.status !== "" ? `(${this.props.task.status})` : ""}</Status>
                            </Container>
                        </ContextMenuTrigger>
                        <ContextMenuAdd task={this.props.task} colId={this.props.colId}
                            editTask={this.props.editTask} cloneTask={this.props.cloneTask}
                            deleteTask={this.props.deleteTask} />
                    </div>
                )}
            </Draggable>
        );
    }
}