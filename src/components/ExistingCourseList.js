import React, { Component } from 'react';
//import Course from './Course'
import ExistingCourse from './ExistingCourse'

// will get prop of courses and map it to course component

 class ExistingCourseList extends Component {
  state = {  }
  render() {
    return (
      <div className="course-list-container">
        <h1> Courses </h1>
        {
          this.props.courses.map(course => {
            return <ExistingCourse courseData={course} importCourse={this.props.importCourse}/>
          })
        }

      </div>
    );
  }
 }
 export default ExistingCourseList