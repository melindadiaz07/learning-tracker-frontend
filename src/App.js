import './App.css'
import Nav from './components/Nav'
import Login from './components/Login'
import UserCourseList from './components/UserCourseList'
import ExistingCourseList from './components/ExistingCourseList'
import TaskList from './components/TaskList'
import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import update from 'react-addons-update';



class App extends React.Component {

  state = {
    user: "",
    userCourses: [],
    existingCourses: [],
    taskList: [],
    selectedCourse: "",
    currentUser: null,
    loading: true,
    taskListId: "",
    userId: ''
  }



  getCurrentUser = (currentUser, courses) => {
    this.setState({
      currentUser: currentUser,
      userCourses: courses
    })
  }


  componentDidMount(){
    if(localStorage.getItem("token")){
      const headers = {headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}}
      fetch('http://localhost:3000/api/v1/mycourses', headers)
      .then(res => res.json())
      .then(userData => {
        this.setState({
          currentUser: userData,
          loading: false,
          userCourses: userData.courses
        })
       
      })
      } else {
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
      taskList: course.task_list.tasks,
      taskListId: course.task_list.id
    })
    
  }


  checkOff = (task) => {
   let updateIndex = this.state.taskList.findIndex((taskData) => taskData === task)
   task[0] = "true"
  this.state.taskList[updateIndex] = task

   let taskListId = this.state.selectedCourse.task_list.id
   let newList = [...this.state.taskList]
    fetch(`http://localhost:3000/task_lists/${taskListId}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({tasks: newList})
    })
  }

 

  addCourse = (subject) => {
    fetch("http://localhost:3000/courses", {
      method: "POST",
      headers:  {"Content-Type": "application/json"},
      body: JSON.stringify({subject: subject,
                            user_id: this.state.currentUser.id,
                            tasks: [['false', "Add your first task!", "A resource link can go here..."]]
                          })
    })
    .then(res => res.json())
    .then(courseData => {
      
      this.setState({
        userCourses: [...this.state.userCourses, courseData]
      })
    })
  }


  importCourse = (course) => {
   if (!this.state.userCourses.find(userCourse => userCourse === course)){
    fetch("http://localhost:3000/courses", {
      method: "POST",
      headers:  {"Content-Type": "application/json"},
      body: JSON.stringify({subject: course.subject,
                            user_id: this.state.currentUser.id,
                            tasks: course.template_task.tasks
                          })
    })
    .then(res => res.json())
    .then(courseData => {
      this.setState({
        userCourses: [...this.state.userCourses, courseData]
      })
    })
    }
  }


  handleLogout = () => {
    localStorage.clear()
    this.setState({
      currentUser: null
    })
  }

  
  render(){

    return (
      <Fragment>

        <Nav logged_in={ !!this.state.currentUser} getCurrentUser={this.getCurrentUser}  logOut={this.handleLogout}/>
        { !this.state.loading ? <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          
          <Route exact path="/mycourses" render={() => {
           return !this.state.currentUser ? <Redirect to="/login" /> : <UserCourseList courses={this.state.userCourses} 
           selectCourse={this.selectCourse} addCourse={this.addCourse} userId={this.state.userId}/>
         }} />
         
          <Route exact path="/login" render={()=> {
           return !this.state.currentUser ? <Login getCurrentUser={this.getCurrentUser} /> : <Redirect to='/mycourses'/>
         }} />

          <Route exact path="/taskList" render={() => {
          return !this.state.currentUser ? <Redirect to="/login" /> :
          <div>
              <TaskList selectedCourse={this.state.selectedCourse} tasks={this.state.taskList} checkOff={this.checkOff} taskEdit={this.taskEdit} taskListId={this.state.taskListId} />
          </div>  }} />  

          <Route exact path ="/availableCourses" render={() => {
            return !this.state.currentUser ? <Redirect to="/login" /> :
            <div>
               <ExistingCourseList courses={this.state.existingCourses} importCourse={this.importCourse}/>
              </div> 
            }} /> 
          
        </Switch> : null }
      </Fragment>
    )
  }
}


  

export default withRouter(App)
