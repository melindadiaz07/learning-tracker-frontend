import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css'
import Nav from './components/Nav'
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
    taskList: [],
    selectedCourse: "",
    currentUser: {}
  }


  handleLogin = userJson => {
    const currentUser = userJson;
    localStorage.setItem('token', currentUser.jwt);
    this.setState({ currentUser: currentUser });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ currentUser: {} })
  };

  
  componentDidMount() {
  fetch("http://localhost:3000/users/16")
    .then(resp => resp.json())
    .then(userData => {
      this.setState({
        userCourses: userData.courses
      })
    })
  fetch("http://localhost:3000/templates")
  .then(res => res.json())
  .then(templateData => {
    this.setState({
      existingCourses: templateData
    })
  })

  }

  selectCourse = (course) => {
    this.setState({
      selectedCourse: course,
      taskList: course.task_list.tasks
    })
    
  }

  checkOff = (task) => {
  task[0] = "true"
   let updateIndex = this.state.taskList.findIndex((taskData) => taskData === task)
  this.state.taskList[updateIndex] = task
   let taskListId = this.state.selectedCourse.task_list.id
   let newList = [...this.state.taskList]
  fetch(`http://localhost:3000/task_lists/${taskListId}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({tasks: newList})
    })
  }


  render() {
    return (

      <Router>
        <Nav />
        <div>
          <Switch>
          
            <Route exact path="/login"
      
            render={routerProps => {
              return (
                <Login {...routerProps} handleLogin={this.handleLogin} />
              );
            }}
      
            />
      <Route  exact path="/mycourses" render={() => {
            return <div>
               <UserCourseList courses={this.state.userCourses} 
                                selectCourse={this.selectCourse} />
              </div> 
            }}
          />
        <Route exact path="/taskList" render={() => {
          return <div>
            <TaskList selectedCourse={this.state.selectedCourse} tasks={this.state.taskList} checkOff={this.checkOff}/>
          </div>
        }} />
        <Route exact path ="/availableCourses" render={() => {
            return <div>
               <ExistingCourseList courses={this.state.existingCourses} />
              </div> 
            }} /> 

            </Switch>
            
        </div>
          
        
        </Router>
    
    );
  }
}

export default App;
