import React, { useReducer, useEffect, useCallback, useContext } from 'react';
import Board from './board/board';
import TopMenu from './menu/top-menu';
import styled from 'styled-components';
import { Context } from '../../index';
import * as _ from 'lodash';

const Container = styled.div`
  display: inline-block;
  margin-top: 40px;
  overflow: auto;
`

function findFirstFreeId(map) {
  const pref = map.has('task-0') ? 'task-' : 'column-';
  for (let el of map.entries())
    if (el[1].status === 'deleted') return el[0];
  return `${pref}${map.size}`;
}

const initialState = {
  tasks: new Map(Object.entries({
    'task-0': { id: 'task-0', content: "", colId: "", author: "tester", status: "deleted", },
  })),
  columns: new Map(Object.entries({
    'column-0': {
      id: 'column-0',
      tittle: 'To do',
      taskIds: [],
      status: "",
    },
    'column-1': {
      id: 'column-1',
      tittle: 'In progress',
      taskIds: [],
      status: "",
    },
    'column-2': {
      id: 'column-2',
      tittle: 'Review',
      taskIds: [],
      status: "",
    },
    'column-3': {
      id: 'column-3',
      tittle: 'Done',
      taskIds: [],
      status: "",
    },
  })),
  columnOrder: ['column-0', 'column-1', 'column-2', 'column-3'],
}


function boardReducer(state, action) {
  switch (action.type) {
    case 'addTaskSocket': {
      let newTasks = _.cloneDeep(state.tasks);
      let newColumn = state.columns.get(action.task.colId);

      newTasks.set(action.task.id, { id: action.task.id, content: action.task.content, colId: action.task.colId, author: action.task.author, status: action.task.status });
      newColumn.taskIds.push(action.task.id);
      const newState = _.cloneDeep(state);
      newState.tasks = newTasks;
      newState.columns.set(newColumn.id, newColumn);
      return newState;
    }
    case 'editTaskSocket': {
      let newTasks = _.cloneDeep(state.tasks);
      let newTask = newTasks.get(action.taskId);
      newTask.content = _.clone(action.content);
      newTask.status = 'edited';
      newTasks.set(action.taskId, newTask);

      const newState = _.cloneDeep(state);
      newState.tasks = newTasks;

      return newState;
    }
    case 'deleteTaskSocket': {
      let newTasks = _.cloneDeep(state.tasks);
      let newColumn = state.columns.get(action.colId);

      newTasks.set(action.taskId, { id: action.taskId, content: "task was deleted", colId: "", author: "scrum board system", status: "deleted" });
      const newState = _.cloneDeep(state);
      newState.tasks = newTasks;
      newColumn.taskIds.splice(newColumn.taskIds.indexOf(action.taskId), 1);
      newState.columns.set(newColumn.id, newColumn);
      return newState;
    }
    case 'addListSocket': {
      let newColumns = _.cloneDeep(state.columns);
      let newIndOfColemn = findFirstFreeId(newColumns);
      let newColumnOrder = _.cloneDeep(state.columnOrder);

      newColumns.set(newIndOfColemn, { id: newIndOfColemn, tittle: action.tittle, taskIds: [], status: "" });
      newColumnOrder.push(newIndOfColemn);
      const newState = _.cloneDeep(state);
      newState.columns = newColumns;
      newState.columnOrder = _.clone(newColumnOrder);
      return newState;
    }
    case 'renameListSocket': {
      let newColumns = _.cloneDeep(state.columns);
      let newColumn = newColumns.get(action.colId);
      newColumn.tittle = _.clone(action.tittle);
      newColumns.set(action.colId, newColumn);
      const newState = _.cloneDeep(state);
      newState.columns = newColumns;

      return newState;
    }
    case 'deleteListSocket': {
      let newColumns = _.cloneDeep(state.columns);
      let newColumnOrder = _.cloneDeep(state.columnOrder);

      newColumns.set(action.colId, { id: action.colId, tittle: "list was deleted", taskIds: [], status: "deleted" });
      const newState = _.cloneDeep(state);
      newState.columns = newColumns;
      newColumnOrder.splice(newColumnOrder.indexOf(action.colId), 1);
      newState.columnOrder = newColumnOrder;
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case 'addTask': {
      action.socket.emit("addCard", { id: findFirstFreeId(state.tasks), content: action.content, colId: action.colId, author: "tester" });
      return state;
    }
    case 'editTask': {
      let newTasks = _.cloneDeep(state.tasks);
      let newTask = newTasks.get(action.taskId);
      newTask.content = _.clone(action.content);
      newTask.status = 'edited';
      newTasks.set(action.taskId, newTask);

      const newState = _.cloneDeep(state);
      newState.tasks = newTasks;

      return newState;
    }
    case 'deleteTask': {
      let newTasks = _.cloneDeep(state.tasks);
      let newColumn = state.columns.get(action.colId);

      newTasks.set(action.taskId, { id: action.taskId, content: "task was deleted", colId: "", author: "scrum board system", status: "deleted" });
      const newState = _.cloneDeep(state);
      newState.tasks = newTasks;
      newColumn.taskIds.splice(newColumn.taskIds.indexOf(action.taskId), 1);
      newState.columns.set(newColumn.id, newColumn);
      return newState;
    }
    case 'addList': {
      let newColumns = _.cloneDeep(state.columns);
      let newIndOfColemn = findFirstFreeId(newColumns);
      let newColumnOrder = _.cloneDeep(state.columnOrder);

      newColumns.set(newIndOfColemn, { id: newIndOfColemn, tittle: action.tittle, taskIds: [], status: "" });
      newColumnOrder.push(newIndOfColemn);
      const newState = _.cloneDeep(state);
      newState.columns = newColumns;
      newState.columnOrder = _.clone(newColumnOrder);
      return newState;
    }
    case 'renameList': {
      let newColumns = _.cloneDeep(state.columns);
      let newColumn = newColumns.get(action.colId);
      newColumn.tittle = _.clone(action.tittle);
      newColumns.set(action.colId, newColumn);
      const newState = _.cloneDeep(state);
      newState.columns = newColumns;

      return newState;
    }
    case 'deleteList': {
      let newColumns = _.cloneDeep(state.columns);
      let newColumnOrder = _.cloneDeep(state.columnOrder);

      newColumns.set(action.colId, { id: action.colId, tittle: "list was deleted", taskIds: [], status: "deleted" });
      const newState = _.cloneDeep(state);
      newState.columns = newColumns;
      newColumnOrder.splice(newColumnOrder.indexOf(action.colId), 1);
      newState.columnOrder = newColumnOrder;
      return newState;
    }
    case 'setState':
      return action.state;
    default:
      throw new Error('Unsupported action...');
  }
}

function Main(props) {
  const session = useContext(Context);

  const [state, dispatch] = useReducer(boardReducer, initialState);

  useEffect(() => {
    session.socket.on("addCard", task => {
      dispatch({ type: 'addTaskSocket', task });
    });
    session.socket.on("restoreCards", cards => {
      let newTasks = _.cloneDeep(state.tasks);
      let newColumns = _.cloneDeep(state.columns)
      cards.forEach(card => {
        newTasks.set(card.id, { id: card.id, content: card.content, colId: card.colId, author: card.author, status: card.status })
        let newColumn = state.columns.get(card.colId);
        newColumn.taskIds.push(card.id);
        newColumns.set(card.colId, newColumn);
      })
      const newState = _.cloneDeep(state);
      newState.tasks = _.cloneDeep(newTasks);
      newState.columns = _.cloneDeep(newColumns);
      dispatch({ type: 'setState', state: newState });
    });
  }, []);

  return (
    <div>
      <TopMenu />
      <Container>
        <Board state={state} dispatch={dispatch} />
      </Container>
    </div>
  );
}

export default Main;