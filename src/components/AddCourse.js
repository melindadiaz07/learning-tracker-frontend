import React, { Component } from 'react';

export default class AddCourse extends Component {
  state = { 
    clicked: false,
    input: ""
   }

   toggleForm = () => {
    this.setState({
      clicked: !this.state.clicked
    })
   }

   handleInput = (event) => {
      this.setState({
        input: event.target.value
      })
   }

  render() {
    return (

      <div  className="add-course-container">
        {this.state.clicked === false ? 
         ( <div >
         <h4><button onClick={this.toggleForm} className="add-course-button" >Create a Course</button></h4> 
        </div>)
        :
        (<div >
          <div >
         <h4><button onClick={this.toggleForm} className="add-course-button" >Cancel</button></h4> 
        </div>
          <form className="add-course-form" >
            <label>Subject: </label>
            <input onChange={this.handleInput} type="text" name="subject" value={this.state.input} />
            <br></br><br></br>
            <button className="add-submit-button"onClick={() => this.props.addCourse(this.state.input)} >Add Course</button>
          </form>
        </div>)
        }
      </div>
    );
  }
}