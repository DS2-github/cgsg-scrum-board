import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
  width: 300px;
  display: inline-block;
  vertical-align: top;
  padding: 4px;
  margin: 1px;
  background-color: rgb(196, 196, 196);
  border-radius: 13.0px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-family: 'Charlie Display';
  vertical-align: top;
  padding: 4px;
  margin: 1px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.1s ease;
  background-color: ${props =>
        props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }
    render() {
        return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
        ));
    }
}

export default class Column extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {provided => (
                    <Container {...provided.draggableProps} innerRef={provided.innerRef}>
                        <Title {...provided.dragHandleProps}>
                            {this.props.column.title}
                        </Title>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <TaskList
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        );
    }
}