import React, { Component } from 'react';
import Task from './Task'

export default class TaskList extends Component {
  state = {  }
  render() {
    return (
      <div>
       <h1> Welcome to my Task list</h1>
        <Task />
      </div>
    );
  }
}