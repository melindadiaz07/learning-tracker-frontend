import React, { Component } from 'react';
import Task from './Task'
import { CircularProgressbar } from 'react-circular-progressbar';


export default class TaskList extends Component {
  state = { 
    progress: "",
    taskList: this.props.tasks,
    toggleAddTask: false,
    resource: "",
    description: "",
   }

 
  
  updateProgress = () => {
    this.setState({progress: this.findProgress()})
  }
  

  findProgress(){
    let totalTasks = this.props.tasks.length
    let completed = 0
    this.props.tasks.forEach(task => {
      if (task[0] == "true"){
        completed+=1
      }
    })
       return parseInt(Number((completed/totalTasks)*100))
  }

  toggleAddTask = () => {
    this.setState({
      toggleAddTask: !this.state.toggleAddTask
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addTask = (event) => {
    event.preventDefault()
    let description = this.state.description
    let resource = this.state.resource
    let newTask = ['false', description, resource]
    let newList = [...this.state.taskList, newTask]
    this.setState({
      taskList: [...this.props.tasks, newTask],
      toggleAddTask: false
    })
    fetch(`http://localhost:3000/task_lists/${this.props.taskListId}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({tasks: newList})
    })
    .then(res => res.json())
    .then(console.log)
  }


  editTask = (event, oldTask, description, resource) => {
    event.preventDefault()
    console.log(description, resource)

    let newTask = ["false", description, resource]
    let updateIndex = this.state.taskList.findIndex((taskData) => taskData === oldTask)
    oldTask[1] = description
    oldTask[2] = resource
    this.state.taskList[updateIndex] = newTask
  
    this.setState({ 
      taskList: [...this.state.taskList, newTask]
    })

    let taskListId = this.props.selectedCourse.task_list.id
    let newList = [...this.state.taskList]
    fetch(`http://localhost:3000/task_lists/${taskListId}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: newList })
    })
  }


  render() {
    return (
      <div className="task-list-container">
        <div className="progress-container">
        <h3 className="tasklist-progress"><CircularProgressbar value={this.findProgress()} text={`${this.findProgress()}%`} /></h3>
        </div>
        <h2 className="tasks-subject-header">{this.props.selectedCourse.subject}</h2>
        <div className="task-container">
       {this.state.taskList.map(taskData => {
         return <Task task={taskData} checkOff={this.props.checkOff} updateProgress={this.updateProgress} handleEditSubmit={this.editTask} />
       })}
       </div>
       <button onClick={this.toggleAddTask} className="add-task-button">Add a Task</button>
       
       {
         this.state.toggleAddTask === true ?
         (<form  >
           <label>Description: </label>
           <input name="description" onChange={this.handleChange} value={this.state.description}/>
           <br></br><br></br>

           <label>Resource: </label>
           <input name="resource" onChange={this.handleChange} value={this.state.resource} />
           <br></br><br></br>

           <button onClick={this.addTask} >Add task!</button>
         </form>) : null
          }
      </div>
    );
  }
}