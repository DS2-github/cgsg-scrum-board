import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';
import DropDownMenu from './../menu/dropdownmenu';

const Container = styled.div`
  width: 300px;
  vertical-align: top;
  padding: 4px;
  margin: 5px;
  background-color: rgb(216, 216, 210);
  border-radius: 13.0px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-family: 'Charlie Display';
  padding: 4px;
  margin: 1px;
  display: inline-block;
`;

const TaskList = styled.div`
  height: fit-context;
  width: 290px;
  padding: 8px;
  transition: background-color 0.1s ease;
  background-color: ${props =>
        props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  height: 80vh;
  overflow-y: scroll;
  display: inline;
`;

class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }
    render() {
        let tasks = this.props.tasks.filter(tsk => tsk.status !== 'deleted');
        return tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} colId={this.props.colId}
                editTask={this.props.editTask} cloneTask={this.props.cloneTask}
                deleteTask={this.props.deleteTask}
            />
        ));
    }
}

export default class Column extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {provided => (
                    <Container {...provided.draggableProps} innerRef={provided.innerRef}>
                        <div>
                            <Title {...provided.dragHandleProps}>
                                {this.props.column.tittle}
                            </Title>
                            <DropDownMenu
                                column={this.props.column}
                                newTask={this.props.newTask} renameList={this.props.renameList} deleteList={this.props.deleteList}
                                newList={this.props.newList}
                            />
                        </div>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <TaskList
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks} colId={this.props.column.id}
                                        editTask={this.props.editTask} cloneTask={this.props.newTask}
                                        deleteTask={this.props.deleteTask}
                                    />
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