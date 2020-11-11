import React, { Component } from 'react';
import EditTask from './EditTask'

 class Task extends Component {

  

  state = { 
    checked: this.props.task[0],
    resourceClicked: false,
    editClick: false,
    resource: "",
    description: "",
    uneditedTask: []
   }

  
   showResources = (event) => {
     event.preventDefault()
    this.setState({
      resourceClicked: !this.state.resourceClicked,
      resource: this.props.task[2],
       description: this.props.task[1]
    })
    event.target.innerHTML === 'v' ?
    event.target.innerHTML = '^' :
    event.target.innerHTML = 'v'
   }


   handleEditTask = (e) => {
     e.preventDefault()
     this.setState({
       editClick: !this.state.editClick,
       uneditedTask: this.props.task
     })
   }
     
   
     handleChange = (e) => {
       //console.log(e.target.name)
       this.setState({ [e.target.name]: e.target.value });

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
                
                
          <input className="checkbox" type="checkbox"  value="task" onClick={() => {
                  this.props.checkOff(this.props.task)
            this.props.updateProgress()
                }} />
                
                <label>{description}<button className="resource-button" onClick={this.showResources}>v</button></label>
                
                {this.state.resourceClicked === true ?
                  <div>
                  <p className="resources-tab"><a href={resources} target="_blank">{resources}</a></p>

                    <label><button className="resource-button" onClick={this.handleEditTask}>edit</button></label>
                    {this.state.editClick === true ?
                      <form>
                        <label> description </label> 
                        <input onChange={this.handleChange} name="description" value={this.state.description} /> 
                        <label> resource </label> 
                        <input onChange={this.handleChange} name="resource" value={this.state.resource} /> 
                        <button onClick={(e) => {
                          this.props.taskEdit(e,this.state.uneditedTask, this.state.description,this.state.resource)
                           e.preventDefault()
                        }}> Save Changes </button>
                      </form>
                      : null
                    }
                    
                    

                  </div> :
                  
                  null}
              
                  
        </div>) :
            (<div className="task-item">
            
          <input className="checkbox" type="checkbox" value="task" checked />
          <label>{description}<button className="resource-button" onClick={this.showResources}>v</button></label>
            {this.state.resourceClicked === true ?
            <p className="resources-tab"><a href={resources} target="_blank">{resources}</a></p> :
                null}
            
                
            </div>)
          
        }
        
      
       </div>

      
    );
  }
  //<button onClick={this.handleEditTask} value="edit task" type="submit">Edit Task</button>
 }
 export default Task