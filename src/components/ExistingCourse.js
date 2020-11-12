import React, { Component } from 'react';


 class ExistingCourse extends Component {
  state = { 
    clicked: false
   }

   handleClick = () => {
     this.setState({
       clicked: !this.state.clicked
     })
   }

   updateButton = (event) => {
     event.target.innerHTML = "Added!"
     event.target.className = "selected-import-button"
   }
   
  render() {
    return (
      <div>
        {
           this.state.clicked === false ? 
           (<div className="template-container">
             <div className="template-block" >
              <button className="template-drop-button" 
                  onClick={this.handleClick} > v </button><h3 className="template-subject">{this.props.courseData.subject}</h3>
                  <button onClick={(event) => 
                  {this.props.importCourse(this.props.courseData)
                  this.updateButton(event)}} 
                          className="import-course-button" >Add to my Courses</button>
             </div></div>
            ) :
           ( <div className="template-container">
             <div className="template-block" >
            <button className="template-drop-button" 
            onClick={this.handleClick} > ^ </button>
            <h3 className="template-subject">{this.props.courseData.subject}</h3> 
            <button onClick={() => this.props.importCourse(this.props.courseData)} 
                      className="import-course-button">Add to my Courses</button>
            <ul className="template-tasks-ul">
              {this.props.courseData.template_task.tasks.map(task => {
                return <li>
                        <p className="template-description" > {task[1]}</p>
                        <p classname="template-resource" ><a href="{task[2]}" target="_blank">{task[2]}</a></p>
                        <br></br><br></br>
                      </li> 
              })}
            </ul>
            </div></div> )

        }
       
       

      </div>
    );
  }
 }
 export default ExistingCourse