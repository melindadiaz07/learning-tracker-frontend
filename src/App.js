import './App.css'
import Nav from './components/Nav'
import Login from './components/Login'
import UserCourseList from './components/UserCourseList'
import ExistingCourseList from './components/ExistingCourseList'
import TaskList from './components/TaskList'
import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'



class App extends React.Component {

  state = {
    user: "",
    userCourses: [],
    existingCourses: [],
    taskList: [],
    selectedCourse: "",
    currentUser: null,
    loading: true
  }



  getCurrentUser = currentUser => this.setState({currentUser})

  async componentDidMount(){
    if(localStorage.getItem("token")){
      const headers = {headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}}
      const res = await fetch('http://localhost:3000/api/v1/mycourses', headers)
      const currentUser = await res.json()
      this.setState({
        currentUser, 
        loading: false,
        userCourses:currentUser.courses
      })
      
      console.log(currentUser.courses)
    }else {
      console.log("no tokey");
      this.setState({loading: false})
    }

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


  render(){
    return (
      <Fragment>

        <Nav logged_in={ !!this.state.currentUser} getCurrentUser={this.getCurrentUser} />
        { !this.state.loading ? <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          
          <Route exact path="/mycourses" render={() => {
           return !this.state.currentUser ? <Redirect to="/login" /> : <UserCourseList courses={this.state.userCourses} 
           selectCourse={this.selectCourse}/>
         }} />
         
          <Route exact path="/login" render={()=> {
           return !this.state.currentUser ? <Login getCurrentUser={this.getCurrentUser} /> : <Redirect to='/mycourses'/>
         }} />

          <Route exact path="/taskList" render={() => {
          return !this.state.currentUser ? <Redirect to="/login" /> :
          <div>
            <TaskList selectedCourse={this.state.selectedCourse} tasks={this.state.taskList} checkOff={this.checkOff}/>
          </div>  }} />  

          <Route exact path ="/availableCourses" render={() => {
            return !this.state.currentUser ? <Redirect to="/login" /> :
            <div>
               <ExistingCourseList courses={this.state.existingCourses} />
              </div> 
            }} /> 
          
        </Switch> : null }
      </Fragment>
    )
  }
}


  

export default withRouter(App)
