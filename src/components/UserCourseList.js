import React, { Component } from 'react';
import Course from './Course'
import AddCourse from './AddCourse'



export default class UserCourseList extends Component {

  state = { 
    courses: [],
    clickedDeleteButton: false,
   }

  
  
  
  componentDidMount(){
    console.log('courses mounted')
    fetch(`http://localhost:3000/users/${this.props.userId}`)
    .then(res => res.json())
    .then(userData => {
      this.setState({
        courses: userData.courses
      })
    })
  }

  render() {
    return (
       <div className="course-list-container">
       {this.props.courses.map(courseData => {
            return <Course course={courseData} key={courseData.id} selectCourse={this.props.selectCourse} deleteCourse={this.handleDelete}/>
          })}
          <AddCourse addCourse={this.props.addCourse} />
        
       </div>
    );
  } 
}
