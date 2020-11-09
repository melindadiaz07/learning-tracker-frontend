import React, { Component } from 'react';
import EditTask from './EditTask'

 class Task extends Component {

  

  state = { 
    checked: this.props.task[0]
   }

  render() {
    let description = this.props.task[1]
    let resources = this.props.task[2]
    
    return (
  <div>
    {
      this.state.checked === "false" ?
       (
       <div><h3>Task</h3>
         <input type="checkbox" value="task" />
        <label>{description}</label>
        </div>) :
        (<div><h3>Task</h3>
        <input type="checkbox" value="task" checked/>
       <label>{description}</label>
       </div>)
      }
       </div>


    );
  }
 }
 export default Task