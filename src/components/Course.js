import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';


export default class Course extends Component {

  // state ={
  //   progress: ""
  // }
 
  findProgress(){
    let totalTasks = this.props.course.task_list.tasks.length
    let completed = 0
    this.props.course.task_list.tasks.forEach(task => {
      if (task[0] == "true"){
        completed += 1
      
      }
      console.log(completed)
    })
       return parseInt(Number((completed/totalTasks)*100))
  }


  render() {
    return (
      <div className='course-block'>
        <div className="course-list-progress">
        <h3 className="progress-header"><CircularProgressbar value={this.findProgress()} text={`${this.findProgress()}%`} /></h3>
        </div>
        <h3 className="subject-header">{this.props.course.subject}</h3> 
        <NavLink to='/taskList' >
        <button className="course-list-button" onClick={() => this.props.selectCourse(this.props.course)} >See Tasks</button>
        </NavLink>
      </div>
    );
  }
}