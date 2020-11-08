import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css'
//import Nav from './components/Nav'
import Login from './components/Login'
import UserCourseList from './components/UserCourseList'
import ExistingCourseList from './components/ExistingCourseList'
import TaskList from './components/TaskList'
//import Task from './components/Task'
//import Course from './components/Course';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// render either login, UserCourseList, or 
// ExistingCourseList depending on some state

 

class App extends Component {

  state = {  
    user: "",
    userCourses: [],
    existingCourses: [],
    taskList: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/users/2")
      .then(resp => resp.json())
      .then(userData => {
       // console.log(userData.courses)
        
        this.setState({
          userCourses: userData.courses
        })
      })

  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
          
      <Route path="/login" component={Login} />
        <Route path="/mycourses" component={UserCourseList} courses={this.state.userCourses} />
        <Route path="/taskList" component={TaskList} />
        <Route path ="/existing" component={ExistingCourseList} />


            <h1>Application Page</h1>
            </Switch>
            
        </div>
          
        
        </Router>
    );
  }
}

export default App;
