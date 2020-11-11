import React, { Component } from 'react';
import Task from './Task'
import { CircularProgressbar } from 'react-circular-progressbar';


export default class TaskList extends Component {
  state = { 
    progress: ""
   }

  updateProgress = () => {
    this.setState({progress: this.findProgress()})
  }

  findProgress(){
    let totalTasks = this.props.tasks.length
    let completed = 0
    this.props.tasks.forEach(task => {
      if (task[0] === "true"){
        completed+=1
      }
    })
       return parseInt(Number((completed/totalTasks)*100))
  }


  render() {
    
    return (
      <div className="task-list-container">
        <div className="progress-container">
        <h3 className="tasklist-progress"><CircularProgressbar value={this.findProgress()} text={`${this.findProgress()}%`} /></h3>
        </div>
        <h2 className="tasks-subject-header">{this.props.selectedCourse.subject}</h2>
        <div className="task-container">
          {this.props.tasks.map(taskData => {
         //console.log(this.props)
         return <Task task={taskData} checkOff={this.props.checkOff} updateProgress={this.updateProgress} taskEdit={this.props.taskEdit}/>
            //return <Task task={taskData} checkOff={this.props.checkOff} updateProgress={this.updateProgress}    />
            
       })}
       </div>
      </div>
    );
  }
}