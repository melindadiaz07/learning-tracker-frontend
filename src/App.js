import logo from './logo.svg';
import './App.css';
import Login from './Login'
import UserCourseList from './UserCourseList'
import ExistingCourseList from './ExistingCourseList'
import TaskList from './TaskList'

// render either login, UserCourseList, or 
// ExistingCourseList depending on some state

 

export default class App extends Component {

  state = {  
    user: "",
    userCourses: [],
    existingCourses: [],
    taskList: []
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default App;
