import React, { Component } from 'react';
import Task from './Task'

export default class TaskList extends Component {
  state = {  }

  findProgress(){
    let totalTasks = this.props.tasks.length
    let completed = 0
    this.props.tasks.forEach(task => {
      if (task[0] == "true"){
        completed+=1
      }
    })
       return parseInt(Number((completed/totalTasks)*100))+'%'
  }


  render() {
    return (
      <div>
        <h2>{this.props.selectedCourse.subject}</h2>
        <h3>{this.findProgress()} Complete</h3>

       {this.props.tasks.map(taskData => {
         return <Task task={taskData} checkOff={this.props.checkOff} />
       })}
      </div>
    );
  }
}