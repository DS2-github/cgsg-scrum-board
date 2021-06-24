import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

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

function DynamicTask(props) {
    return (
        <Container>
            <input type="text" value={props.task.content} />
            <Author>{props.task.author}</Author>
        </Container>
    );
}

function StaticTask(props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index} >
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    aria-roledescription="Press space bar to lift the task"
                >
                    <Content>{props.task.content}</Content>
                    <Author>{props.task.author}</Author>
                </Container>
            )}
        </Draggable>
    );
}

export default class Task extends React.Component {
    render() {
        const localOutput =
            /*this.props.task.localAccess ?
                <DynamicTask task={this.props.task} /> :*/
            <StaticTask task={this.props.task} index={this.props.index} />
        return (
            <div>{localOutput}</div>
        );
    }
}