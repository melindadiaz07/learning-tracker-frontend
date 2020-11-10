// import React, { Component } from 'react';

// class Login extends Component {
//   state = {  }
//   render() {
//     return (
//       <div>
//         <h1>Login page</h1> 
//       </div>
//     );
//   }
// }
// export default Login;

import React from 'react';
import api from '../components/api';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    // debugger;
    api.auth.login(this.state.fields.username, this.state.fields.password)
    .then(json => {
      if ( json.error ) {
        this.setState({ error: true })
      } else {
        this.props.handleLogin(json);
        this.props.history.push('/');
      };
    });
  };

 render() {
    const { fields } = this.state;
    return (
      <div>
        {this.state.error ? <h3>Not a valid username/password</h3> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;