import React, { Component } from 'react';
import EditTask from './EditTask'

 class Task extends Component {

  

  state = { 
    checked: this.props.task[0],
    resourceClicked: false
   }

   showResources = (event) => {
     event.preventDefault()
    this.setState({
      resourceClicked: !this.state.resourceClicked
    })
    event.target.innerHTML === 'v' ?
    event.target.innerHTML = '^' :
    event.target.innerHTML = 'v'
   }

  render() {
    let description = this.props.task[1]
    let resources = this.props.task[2]
    
    return (
  <div>
    {
      this.state.checked === "false" ?
       (
       <div className="task-item">
          <input className="checkbox" type="checkbox" value="task" onClick={() => {
            this.props.checkOff(this.props.task)
            this.props.updateProgress()
          }} />
          <label>{description}<button className="resource-button" onClick={this.showResources}>v</button></label>
            {this.state.resourceClicked === true ?
            <p className="resources-tab"><a href={resources} target="_blank">{resources}</a></p> :
            null }
        </div>) :
        (<div className="task-item">
          <input className="checkbox" type="checkbox" value="task" checked />
          <label>{description}<button className="resource-button" onClick={this.showResources}>v</button></label>
            {this.state.resourceClicked === true ?
            <p className="resources-tab"><a href={resources} target="_blank">{resources}</a></p> :
            null }
       </div>)
      }
       </div>


    );
  }
 }
 export default Task