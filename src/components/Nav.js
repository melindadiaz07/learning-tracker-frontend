import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class Nav extends Component {

  state = { 

   }
   
  render() {
    return (
      <nav className="nav">
        
        <NavLink to='/logout' ><button className="nav-button">logout</button></NavLink>
        <NavLink to='/existing' ><button className="nav-button">View Existing Courses</button></NavLink>
        <NavLink to='/mycourses' ><button className="nav-button">My Courses</button></NavLink>
         
      </nav>
    );
  }
}