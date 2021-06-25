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
        const { column, taskMap, index, newTask, editTask, deleteTask } = this.props;
        const tasks = column.taskIds.map(taskId => taskMap.get(taskId));
        return <Column column={column} tasks={tasks} index={index} newTask={newTask} editTask={editTask} deleteTask={deleteTask} />;
    }
}

const Brd = styled.div`
  position:absolute;
  vertical-align: top;
  display: inline-block;
  padding: 0.5%;
  height: 95vh;
  overflow-x: scroll;
  box-shadow: -14px 0px 12px -11px rgba(34, 60, 80, 0.16);
`

export default class Board extends React.Component {
    state = {
        tasks: new Map(Object.entries({
            'task-0': { id: 'task-0', content: "", author: "tester", status: "deleted", },
            'task-1': { id: 'task-1', content: "gdhxfnxb", author: "Naklal Kalov", status: "", },
            'task-2': { id: 'task-2', content: "zfvzfv", author: "Kirill Submitov", status: "", },
            'task-3': { id: 'task-3', content: "tezvzdfvzdst3", author: "Daniil Smirnov", status: "", },
            'task-4': { id: 'task-4', content: "tzdveszdvzdfvzdt0", author: "Andrew Chugunov", status: "", },
            'task-5': { id: 'task-5', content: "zdvdtefvzfdvfzdst0", author: "Lana Sashovayz", status: "", },
            'task-6': { id: 'task-6', content: "tesvzdfvzdvt1", author: "Aleksey Romanov", status: "", },
            'task-7': { id: 'task-7', content: "ya kal-naklal", author: "tester", status: "", },
        })),
        columns: new Map(Object.entries({
            'column-0': {
                id: 'column-0',
                tittle: 'To do',
                taskIds: ['task-5', 'task-2'],
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

    editTask = (task, content) => {
        let newTasks = _.cloneDeep(this.state.tasks);

        newTasks.set(task.id, {
            id: `${task.id}`,
            content: content,
            author: task.author,
            status: 'edited',
        });
        this.setState({
            tasks: newTasks,
        });
    }

    findFirstFreeId(map) {
        const pref = map.has('task-0') ? 'task-' : 'column-';
        for (let el of map.entries())
            if (el[1].status === 'deleted') return el[0];
        return `${pref}${map.size}`;
    }

    deleteTask = (colId, taskId) => {
        let newTasks = _.cloneDeep(this.state.tasks);
        let newColumn = this.state.columns.get(colId);

        newTasks.set(taskId, { id: taskId, content: "task was deleted", author: "scrum board system", status: "deleted" });
        const newState = _.cloneDeep(this.state);
        newState.tasks = newTasks;
        newColumn.taskIds.splice(newColumn.taskIds.indexOf(taskId), 1);
        newState.columns.set(newColumn.id, newColumn);
        this.setState(newState);
    }

    newTask = (colId, content) => {
        let newTasks = _.cloneDeep(this.state.tasks);
        let newIndOfTask = this.findFirstFreeId(newTasks);
        let newColumn = this.state.columns.get(colId);

        newTasks.set(newIndOfTask, { id: newIndOfTask, content: content, author: "tester", status: "" });
        newColumn.taskIds.push(newIndOfTask);
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
                                            deleteTask={this.deleteTask}
                                            editTask={this.editTask}
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