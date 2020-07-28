import React, { Component } from 'react';
import '../scss/app.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loginWrapper container loginAndSignUp">
        <div class="row" style={{ height: '15vh' }}></div>
        <div class="col" style={{ maxWidth: '90%' }}>
          <h3 style={{ textAlign: 'center', margin: '30px', color: '$warmGray' }}>connect</h3>
          <form>
            <div class="form-group loginAndSignUp">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="hi@theneighborhood.com" name="userEmail" onChange={(e) => this.props.handleChange(e)}></input>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group loginAndSignUp">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={(e) => this.props.handleChange(e)}></input>
            </div>
            <button type="submit" class="btn btn-primary loginAndSignUpBtn" onClick={(e) => this.props.handleLoginSubmit(e)}>Get connected!</button>
          </form>
        </div>
        <div class="row" style={{ height: '20vh' }}></div>
      </div>
    )
  }
}
export default Login;

// import react, useState, useEffect
// import react router objects

// require App component

// create form function
// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
// const useInput = init => {
//   const [ value, setValue ] = useState(init);
//   const onChange = e => {
//     setValue(e.target.value);
//   }
//   // return the value with the onChange function instead of setValue function
//   return [ value, onChange ];
// }

// pass in props, create CreateItem component
// all the states and setStates utilizes the userInput('')

/* eslint-disable react/prefer-stateless-function */

// const LogIn = () => {
//   return <div />;
// };
// function to save item
// check for errors
// if all good, set state

// post req to Item
// catch errors

// return interface
// input fields

// create buttons with onClick for save and cancel;
