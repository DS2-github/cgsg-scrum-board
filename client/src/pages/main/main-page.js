import React, { useReducer, useEffect, useCallback, useContext } from 'react';
import Board from './board/board';
import TopMenu from './menu/top-menu';
import styled from 'styled-components';
import { Context } from '../../index';
import * as _ from 'lodash';

const Container = styled.div `
  display: inline-block;
  margin-top: 40px;
  overflow: auto;
`

function findFirstFreeId(map, pref) {
    let i = 0;
    while (map.has(`${pref}${i}`))
        i++;
    return `${pref}${i}`;
}

const initialState = {
    tasks: new Map(),
    columns: new Map(),
    columnOrder: [],
}

function boardReducer(state, action) {
    switch (action.type) {
        case 'addTaskSocket':
            {
                let newTasks = new Map(state.tasks);
                let newColumn = state.columns.get(action.task.colId);
                let newTaskIds = new Set(newColumn.taskIds);

                newTasks.set(action.task.id, { id: action.task.id, content: action.task.content, colId: action.task.colId, author: action.task.author, status: action.task.status });
                newTaskIds.add(action.task.id);
                newColumn.taskIds = Array.from(newTaskIds);
                const newState = _.cloneDeep(state);
                newState.tasks = new Map(newTasks);
                newState.columns.set(newColumn.id, newColumn);
                return newState;
            }
        case 'editTaskSocket':
            {
                let newTask = state.tasks.get(action.task.id);
                newTask.content = _.clone(action.task.content);
                newTask.status = _.clone(action.task.status);
                const newState = _.cloneDeep(state);
                console.log(newState);
                console.log(_.cloneDeep(state));

                newState.tasks.set(action.task.id, newTask);
                return newState;
            }
        case 'deleteTaskSocket':
            {
                let newTasks = new Map(state.tasks);
                let newColumn = state.columns.get(action.task.colId);

                newTasks.set(action.task.id, { id: action.task.id, content: action.task.content, colId: action.task.colId, author: action.task.author, status: action.task.status });
                const newState = _.cloneDeep(state);
                newState.tasks = new Map(newTasks);
                const ind = newColumn.taskIds.indexOf(action.taskId);
                if (ind > -1)
                    newColumn.taskIds.splice(ind, 1);
                newState.columns.set(newColumn.id, newColumn);
                return newState;
            }
        case 'addListSocket':
            {
                let newColumns = new Map(state.columns);
                let newColumnOrder = _.cloneDeep(state.columnOrder);

                newColumns.set(action.list.id, { id: action.list.id, title: action.list.title, taskIds: [], status: "" });
                newColumnOrder.push(action.list.id);
                const newState = _.cloneDeep(state);
                newState.columns = new Map(newColumns);
                newState.columnOrder = Array.from(newColumnOrder);
                return newState;
            }
        case 'renameListSocket':
            {
                let newColumns = new Map(state.columns);
                let newColumn = newColumns.get(action.list.id);
                newColumn.title = _.clone(action.list.title);
                newColumns.set(action.list.id, newColumn);
                const newState = _.cloneDeep(state);
                newState.columns = new Map(newColumns);

                return newState;
            }
        case 'deleteListSocket':
            {
                let newColumns = new Map(state.columns);
                let newColumnOrder = Array.from(state.columnOrder);

                newColumns.set(action.colId, { id: action.colId, title: "list was deleted", taskIds: [], status: "deleted" });
                const newState = _.cloneDeep(state);
                newState.columns = new Map(newColumns);
                newColumnOrder.splice(newColumnOrder.indexOf(action.colId), 1);
                newState.columnOrder = Array.from(newColumnOrder);
                return newState;
            }
        case 'setState':
            return _.cloneDeep(action.state);
        default:
            throw new Error('Unsupported action...');
    }
}

function Main(props) {
    const session = useContext(Context);

    const [state, dispatch] = useReducer(boardReducer, initialState);

    const boardController = (action) => {
        switch (action.type) {
            case 'addTask':
                action.socket.emit("addCard", { id: findFirstFreeId(state.tasks, 'task-'), content: action.content, colId: action.colId, author: "tester" });
                return;
            case 'editTask':
                action.socket.emit("editCard", { id: action.id, content: action.content });
                return;
            case 'deleteTask':
                action.socket.emit("delCard", { id: action.id, content: action.content, colId: action.colId });
                return;
            case 'addList':
                action.socket.emit("addList", { id: findFirstFreeId(state.columns, 'column-'), title: action.title, cards: [], status: '' });
                return;
            case 'renameList':
                action.socket.emit("renameList", { id: action.colId, title: action.title });
                return;
            case 'deleteList':
                /*delete list socket*/
                return;
            case 'setNewState':
                dispatch({ type: 'setState', state: action.state })
                return;
            default:
                throw new Error('Unsupported action...');
        }
    }

    useEffect(() => {
        session.socket.on("addCard", tsk => {
            dispatch({ type: 'addTaskSocket', task: tsk });
        });
        session.socket.on("editCard", tsk => {
            dispatch({ type: 'editTaskSocket', task: tsk });
        });
        session.socket.on("delCard", tsk => {
            dispatch({ type: 'deleteTaskSocket', task: tsk });
        });
        session.socket.on("restoreData", data => {
            const newState = _.cloneDeep(state);

            data[0].forEach(list => {
                newState.columns.set(list.id, {
                    id: list.id,
                    title: list.title,
                    taskIds: Array.from(list.taskIds),
                    status: list.status
                });
                if (list.status !== 'deleted') {
                    newState.columnOrder.push(list.id);
                }
            })
            data[1].forEach(card => {
                newState.tasks.set(card.id, {
                    id: card.id,
                    content: card.content,
                    colId: card.colId,
                    author: card.author,
                    status: card.status
                });
            })
            dispatch({ type: 'setState', state: newState })
        });

        session.socket.on("addList", lst => {
            dispatch({ type: 'addListSocket', list: lst });
        });
        session.socket.on("renameList", lst => {
            dispatch({ type: 'renameListSocket', list: lst });
        });
    }, []);

    return ( 
        <div >
        <TopMenu / >
        <Container>
          <Board 
            state = { state }
            dispatch = { boardController }
          />  
        </Container>
        </div>
    );
}


export default Main;