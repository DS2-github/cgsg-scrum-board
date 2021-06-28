import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './column';
import { render } from 'react-dom';

const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
    render() {
        const { column, taskMap, index, dispatch } = this.props;
        const tasks = column.taskIds.map(taskId => { return taskMap.get(taskId) });
        return (<Column
            column={column} tasks={tasks} index={index}
            dispatch={dispatch}
        />);
    }
}

const Brd = styled.div`
  display: grid;
  padding: 0.5%;
  height: 95vh;
  width: 100vw;
  overflow-x: scroll;
  box-shadow: -14px 0px 12px -11px rgba(34, 60, 80, 0.16);
`

export default class Board extends React.Component {
    onDragStart = (start, provided) => {
        provided.announce(
            `You have lifted the task in position ${start.source.index + 1}`,
        );
    };

    onDragUpdate = (update, provided) => {
        const message = update.destination
            ? `You have moved the task to position ${update.destination.index + 1}`
            : `You are currently not over a droppable area`;

        provided.announce(message);
    };

    onDragEnd = (result, provided) => {
        const message = result.destination
            ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
            : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

        provided.announce(message);

        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(this.props.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            this.props.dispatch({ type: 'setNewState', state: { ...this.props.state, columnOrder: newColumnOrder, } });
            return;
        }

        const home = this.props.state.columns.get(source.droppableId);
        const foreign = this.props.state.columns.get(destination.droppableId);
        if (home === foreign) {
            const newTaskIds = Array.from(home.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newHome = {
                ...home,
                taskIds: newTaskIds,
            };
            const newState = _.cloneDeep(this.props.state);
            newState.columns.set(newHome.id, newHome);

            this.props.dispatch({ type: 'setNewState', state: newState });
            return;
        }

        const homeTaskIds = Array.from(home.taskIds);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
            ...home,
            taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign.taskIds);
        foreignTaskIds.splice(destination.index, 0, draggableId);
        let newTask = _.cloneDeep(this.props.state.tasks.get(draggableId));
        const newForeign = {
            ...foreign,
            taskIds: foreignTaskIds,
        };
        newTask.colId = newForeign.id;
        const newState = _.cloneDeep(this.props.state);
        newState.tasks.set(draggableId, newTask);
        newState.columns.set(newHome.id, newHome);
        newState.columns.set(newForeign.id, newForeign);
        this.props.dispatch({ type: 'setNewState', state: newState });
    };

    render() {
        return (
            <Brd>
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="column"
                    >
                        {provided => (
                            <Container
                                {...provided.droppableProps}
                                innerRef={provided.innerRef}
                            >
                                {this.props.state.columnOrder.map((columnId, index) => {
                                    const column = this.props.state.columns.get(columnId);
                                    return (
                                        <InnerList
                                            key={column.id}
                                            column={column}
                                            taskMap={this.props.state.tasks}
                                            index={index}
                                            dispatch={this.props.dispatch}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </DragDropContext>
            </Brd>
        );
    }
}