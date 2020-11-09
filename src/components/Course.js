import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Course extends Component {

  // state ={
  //   progress: ""
  // }
 
  findProgress(){
    let totalTasks = this.props.course.task_list.tasks.length
    let completed = 0
    this.props.course.task_list.tasks.forEach(task => {
      if (task[0] == "true"){
        completed+=1
      }
    })
       return parseInt(Number((completed/totalTasks)*100))+'%'
  }


  render() {
    return (
      <div>
        <h3>{this.findProgress()}</h3>
        <h3>{this.props.course.subject}</h3> 
        <NavLink to='/taskList' >
        <button onClick={() => this.props.selectCourse(this.props.course)} >View Course Details</button>
        </NavLink>
      </div>
    );
  }
}