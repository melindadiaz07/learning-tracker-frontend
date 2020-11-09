import React, { Component } from 'react';
import Task from './Task'

export default class TaskList extends Component {
  state = {  }
  render() {
    return (
      <div>
       {this.props.tasks.map(taskData => {
         return <Task task={taskData} />
       })}
      </div>
    );
  }
}