import React, { Component } from 'react'

export default class Course extends Component {
  state = {  }
  render() {
    return (
      <div>
        <h2>My Course</h2>
        <h3>{this.props.course.subject} </h3> 
      </div>
    );
  }
}