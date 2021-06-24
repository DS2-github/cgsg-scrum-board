import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './column';

const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
    render() {
        const { column, taskMap, index, newTask } = this.props;
        const tasks = column.taskIds.map(taskId => taskMap.get(taskId));
        return <Column column={column} tasks={tasks} index={index} newTask={newTask} />;
    }
}

const Brd = styled.div`
    width: 80vw;   
    height: 100vh
    float:right; 
    padding-left: 3%;
    box-shadow: -14px 0px 12px -11px rgba(34, 60, 80, 0.16);
`;


export default class Board extends React.Component {
    state = {
        tasks: new Map(Object.entries({
            'task-0': { id: 'task-0', content: "", author: "Vasya Pupkin", publicAccess: 'everyone', localAccess: false, },
            'task-1': { id: 'task-1', content: "gdhxfnxb", author: "Naklal Kalov", publicAccess: 'everyone', localAccess: false, },
            'task-2': { id: 'task-2', content: "zfvzfv", author: "Kirill Submitov", publicAccess: 'everyone', localAccess: false, },
            'task-3': { id: 'task-3', content: "tezvzdfvzdst3", author: "Daniil Smirnov", publicAccess: 'everyone', localAccess: true, },
            'task-4': { id: 'task-4', content: "tzdveszdvzdfvzdt0", author: "Andrew Chugunov", publicAccess: 'everyone', localAccess: false, },
            'task-5': { id: 'task-5', content: "zdvdtefvzfdvfzdst0", author: "Lana Sashovayz", publicAccess: 'everyone', localAccess: false, },
            'task-6': { id: 'task-6', content: "tesvzdfvzdvt1", author: "Aleksey Romanov", publicAccess: 'everyone', localAccess: false, },
            'task-7': { id: 'task-7', content: "ya kal-naklal", author: "Kirik Commitov", publicAccess: 'everyone', localAccess: false, },
        })),
        columns: new Map(Object.entries({
            'column-0': {
                id: 'column-0',
                tittle: 'To do',
                taskIds: ['task-0', 'task-5', 'task-2'],
                publicAccess: 'everyone',
                localAccess: true,
            },
            'column-1': {
                id: 'column-1',
                tittle: 'In progress',
                taskIds: ['task-1', 'task-7'],
                publicAccess: 'everyone',
                localAccess: true,
            },
            'column-2': {
                id: 'column-2',
                tittle: 'Review',
                taskIds: ['task-4', 'task-6'],
                publicAccess: 'everyone',
                localAccess: true,
            },
            'column-3': {
                id: 'column-3',
                tittle: 'Done',
                taskIds: ['task-3'],
                publicAccess: 'everyone',
                localAccess: true,
            },
        })),
        columnOrder: ['column-0', 'column-1', 'column-2', 'column-3'],
    };

    newTask = (colId) => {
        let newTasks = _.cloneDeep(this.state.tasks);
        let newNumOfTasks = newTasks.size;
        let newColumn = this.state.columns.get(colId);

        newTasks.set(`task-${newNumOfTasks}`, { id: `task-${newNumOfTasks}`, content: "!!!!!!!!!!!!!!", author: "tester" });
        newColumn.taskIds.push(`task-${newNumOfTasks}`);
        const newState = _.cloneDeep(this.state);
        newState.tasks = newTasks;
        newState.columns.set(newColumn.id, newColumn);
        this.setState(newState);
    }

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
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder,
            };
            this.setState(newState);
            return;
        }

        const home = this.state.columns.get(source.droppableId);
        const foreign = this.state.columns.get(destination.droppableId);
        if (home === foreign) {
            const newTaskIds = Array.from(home.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newHome = {
                ...home,
                taskIds: newTaskIds,
            };
            const newState = _.cloneDeep(this.state);
            newState.columns.set(newHome.id, newHome);

            this.setState(newState);
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
        const newForeign = {
            ...foreign,
            taskIds: foreignTaskIds,
        };
        const newState = _.cloneDeep(this.state);
        newState.columns.set(newHome.id, newHome);
        newState.columns.set(newForeign.id, newForeign);
        this.setState(newState);
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
                                {this.state.columnOrder.map((columnId, index) => {
                                    const column = this.state.columns.get(columnId);
                                    return (
                                        <InnerList
                                            key={column.id}
                                            column={column}
                                            taskMap={this.state.tasks}
                                            index={index}
                                            newTask={this.newTask}
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