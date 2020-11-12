import React, { Component } from 'react';

export default class AddCourse extends Component {
  state = { 
    clicked: false,
    input: "",
   
   }

   toggleForm = () => {
    this.setState({
      clicked: !this.state.clicked
    })
   }
  
  

   handleInput = (event) => {
     console.log(event.target.value)
      this.setState({
        input: event.target.value
      })
   }

  


  render() {
    return (
      

      <div>
        
        
      
        {this.state.clicked === false ? 
          
         ( <div>
            <h4><button onClick={this.toggleForm} className="add-course-button" >Create a Course</button></h4> 
           
        </div>)
        :
        (<div>
          <form>
            <label>Subject: </label>
            <input onChange={this.handleInput} type="text" name="subject" value={this.state.input} />
            <button onClick={() => this.props.addCourse(this.state.input)} >Add Course</button>
            </form>
            
            
        </div>)
        }
      </div>
    );
  }
}