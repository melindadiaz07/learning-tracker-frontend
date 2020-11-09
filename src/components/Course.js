import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Course extends Component {
 

  render() {
    return (
      <div>
        <h3>{this.props.course.subject}</h3> 
        <NavLink to='/taskList' >
        <button onClick={() => this.props.selectCourse(this.props.course)} >View Course Details</button>
        </NavLink>
      </div>
    );
  }
}