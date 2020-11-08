import React, { Component } from 'react'

export default class Course extends Component {
  state = {  }
  render() {
    return (
      <div>
        <h2>My Course</h2>
        {console.log(this.props)}
        <h3>{this.props.course[0].subject}</h3> 
      </div>
    );
  }
}