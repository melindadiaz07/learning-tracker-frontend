import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import '/App.css'

export default class Nav extends Component {

  state = { 

   }
   
  render() {
    return (
      <nav className="nav">
        
        <NavLink to='/mycourses' >My Courses</NavLink>
        <NavLink to='/existing' >View Existing Courses</NavLink>
        <NavLink to='/logout' >logout</NavLink>
         
      </nav>
    );
  }
}