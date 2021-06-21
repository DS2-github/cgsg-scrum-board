import './board.css';
import React from 'react';

function Task(props) {
  return (
    <div className="taskCell">
      <p className="task">{props.task.content}</p>
      <p className="author">{props.task.author}</p>
      <button>{/* BUTTONS */}</button>
    </div>
  );
}

class Column extends React.Component {
  render() {
    const tasks = this.props.tasks.map(tsk => {
      return (
        <span key={tsk.id.toString()}>
          <Task task={tsk} />
        </span>
      );
    })

    return (
      <div>
        {tasks}
      </div>
    );
  };
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [{ content: "test0", author: "au0", id: 0 }, { content: "test0", author: "au0", id: 4 }, { content: "test0", author: "au0", id: 5 }],
      inProgress: [{ content: "test1", author: "au1", id: 1 }],
      review: [{ content: "test2", author: "au2", id: 2 }],
      done: [{ content: "test3", author: "au3", id: 3 }, { content: "test1", author: "au1", id: 6 }],
    }
  }

  render() {
    return (
      <div className="board">
        <div className="ToDo list">
          <p className="header">TO DO</p>
          <Column
            tasks={this.state.todo}
          />
        </div>
        <div className="inProgress list">
          <p className="header">IN PROGRESS</p>
          <Column
            tasks={this.state.inProgress}
          />
        </div>
        <div className="review list">
          <p className="header">REVIEW</p>
          <Column
            tasks={this.state.review}
          />
        </div>
        <div className="done list">
          <p className="header">DONE</p>
          <Column
            tasks={this.state.done}
          />
        </div>
      </div>
    );
  }
}

export default Board;