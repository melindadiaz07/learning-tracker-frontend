import React, { Component } from 'react';
import EditTask from './EditTask'

 export default class Task extends Component {

  state = { 
    checked: this.props.task[0],
    resourceClicked: false,
    editClick: false,
    resource: this.props.task[2],
    description: this.props.task[1],
    toggleEditForm: false
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

   handleEditToggle = () => {
     this.setState({
         toggleEditForm: !this.state.toggleEditForm,
       })
   }

  handleChange = (e) => {
    console.log(e.target.value, e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {

    let description = this.props.task[1]
    let resources = this.props.task[2]

    return (
      <div>
        {this.state.checked === "false" ? (
          <div className="task-item">
          <input className="checkbox" type="checkbox" value="task" onClick={() => {
            this.props.checkOff(this.props.task)
            this.props.updateProgress() }} /> 

          <label><div className="task-description" >{description}</div><button className="resource-button" onClick={this.showResources}>v</button></label> 
                
          {this.state.resourceClicked === true ?
                <div>
                <p className="resources-tab"><a href={resources} target="_blank">{resources}</a></p>

                <label><button className="edit-button" onClick={this.handleEditToggle}> edit </button></label>
                    {this.state.toggleEditForm === true ?
                      (<form>
                        <label> description </label> 
                        <input onChange={this.handleChange} name="description" value={this.state.description} /> 
                        <label> resource </label> 
                        <input onChange={this.handleChange} name="resource" value={this.state.resource} /> 
                        <button onClick={(event) => {
                          this.props.handleEditSubmit(event, this.props.task, this.state.description, this.state.resource) 
                          this.handleEditToggle()
                        }} 
                        > Save Changes </button>
                      </form>)
                      : null
                    }
                </div> :  null} 

        </div>
        ) : ( 
          <div className="task-item">
              <input className="checkbox" type="checkbox" value="task" checked />
              <label>{description}<button className="resource-button" onClick={this.showResources}>v</button></label>
              { this.state.resourceClicked === true ?
               <p className="resources-tab"><a href={resources} target="_blank">{resources}</a></p> : null}
          </div>
        )}
      </div>

    ) 
  }
}
