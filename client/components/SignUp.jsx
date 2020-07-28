import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="container loginAndSignUp">
        <div class="row" style={{ height: '15vh' }}></div>
        <div class="col">
          <h3 style={{ textAlign: 'center', margin: '30px' }}>join the community</h3>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">First Name</label>
                <input type="text" class="form-control" id="firstName" placeholder="First Name" name="userFirstName" onChange={(e) => this.props.handleChange(e)}></input>
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4">Last Name</label>
                <input type="text" class="form-control" id="lastName" placeholder="Last Name" name="userLastName" onChange={(e) => this.props.handleChange(e)}></input>
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" name="userEmail" onChange={(e) => this.props.handleChange(e)}></input>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password" name="password" onChange={(e) => this.props.handleChange(e)}></input>
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" name="userStreet" onChange={(e) => this.props.handleChange(e)}></input>
            </div>
            <div class="form-group">
              <label for="inputAddress2">Address 2</label>
              <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="userStreet2" onChange={(e) => this.props.handleChange(e)}></input>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" name="userCity" onChange={(e) => this.props.handleChange(e)}></input>
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control" onChange={(e) => this.props.handleChange(e)}>
                  <option defaultValue="">Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip" name="userZip" onChange={(e) => this.props.handleChange(e)}></input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" ></input>
                <label class="form-check-label" for="gridCheck">
                  Check me out
          </label>
              </div>
            </div>
            <button type="submit" class="btn btn-dark loginAndSignUpBtn" onClick={(e) => this.props.handleSignUpSubmit(e)}>Sign Up</button>
          </form>
        </div>
        <div class="row" style={{ height: '20vh' }}></div>
      </div>
    );
  }
}

export default SignUp;