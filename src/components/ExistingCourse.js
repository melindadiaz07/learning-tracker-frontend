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

  //  updateButton = () => {
     
  //  }
  
   
  render() {
    return (
      <div>
        {
           this.state.clicked === false ? 
           (<div className="template-container">
             <h3 className="template-subject"> <button className="template-drop-button" 
                  onClick={this.handleClick} > v </button>{this.props.courseData.subject}
                  <button onClick={() => this.props.importCourse(this.props.courseData)} 
                          className="import-course-button" >Add to my Course list</button></h3>
             </div>
            ) :
           ( <div className="template-container">
            <h3 className="template-subject"><button className="template-drop-button" 
            onClick={this.handleClick} > ^ </button>{this.props.courseData.subject} 
            <button onClick={() => this.props.importCourse(this.props.courseData)} 
                      className="import-course-button">Add to my Course list</button></h3>
            <ul className="template-tasks-ul">
              {this.props.courseData.template_task.tasks.map(task => {
                return <li>
                        <p>{task[1]}</p>
                        <p><a href="{task[2]}" target="_blank">{task[2]}</a></p>
                      </li> 
              })}
            </ul>
            </div> )

        }
       
       

      </div>
    );
  }
 }
 export default ExistingCourse