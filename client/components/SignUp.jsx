import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container loginAndSignUp">
        <div className="row" style={{ height: '15vh' }}></div>
        <div className="col">
          <h3 style={{ textAlign: 'center', margin: '30px' }}>
            join the community
          </h3>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail4">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  onChange={(e) => this.props.handleChange(e)}
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(e) => this.props.handleChange(e)}
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => this.props.handleChange(e)}
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => this.props.handleChange(e)}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                name="street"
                onChange={(e) => this.props.handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label for="inputAddress2">Address 2</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                name="street2"
                onChange={(e) => this.props.handleChange(e)}
              ></input>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  name="city"
                  onChange={(e) => this.props.handleChange(e)}
                ></input>
              </div>
              <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.props.handleChange(e)}
                >
                  <option defaultValue=""></option>
                  <option value="CA">CA</option>
                  <option value="NY">NY</option>
                  <option value="MA">MA</option>
                  <option value="NJ">NJ</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  name="zipCode"
                  onChange={(e) => this.props.handleChange(e)}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                ></input>
                <label className="form-check-label" for="gridCheck">
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark loginAndSignUpBtn"
              onClick={(e) => this.props.handleSignUpSubmit(e)}
            >
              Sign Up
            </button>
            <div
              id="bad-signup-message"
              style={{ textAlign: 'center', marginTop: '30px', color: 'red' }}
            ></div>
          </form>
        </div>
        <div className="row" style={{ height: '20vh' }}></div>
      </div>
    );
  }
}

export default SignUp;
