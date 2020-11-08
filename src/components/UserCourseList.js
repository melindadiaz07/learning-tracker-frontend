import React, { Component } from 'react';
import Course from './Course'
import AddCourse from './AddCourse'

// get a prop of a user and render their specific courses 
// ? function to calculate progress? comes from sibling tasklist


export default class UserCourseList extends Component {
  state = {  }
  render() {
    return (
      <div>
        {this.props.courses.map(courseData => {
          return <Course course={courseData} />
        })}
        <AddCourse />
        
      </div>
    );
  }
}
