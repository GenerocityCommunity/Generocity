import React, { Component } from 'react';
const path = require('path');
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/app.scss';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import AddItem from './AddItem.jsx';
import { Route, Switch, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // store most state in App component, make available to child components as props
      isloggedIn: false,
      allItems: [], // (each item is an object)
      userEmail: 'Dave',
      userPoints: '',
      userFirstName: 'Dave',
      userLastName: "O'Sullivan",
      password: '',
      userStreet: '',
      userStreet2: '', // add this to frontend, backend, and db
      userCity: '',
      userState: '',
      userZip: '',
      /* State for Geolocation Feature */
      latitude: null,
      longitude: null,
      /* State for a single item */
      itemTitle: '',
      itemDescription: '',
      itemCategory: '',
      itemImage: '',
      claimed: false,
      user_id: '2',
      redirect: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.getAllItems = this.getAllItems.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    // this.checkSession = this.checkSession.bind(this);
    /* Bind for Geolocation Feature */
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  componentDidMount() {
    this.getAllItems();
    // this.checkSession(); ---- session auth incomplete
    this.getLocation(); // remove this after testing
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /*----------- handle file change (image input) (AddItem)-----------------*/

  handleFileChange(e) {
    this.setState({
      itemImage:
        e.target
          .value /**URL.createObjectURL(e.target.files[0]) to display image before submit (for file uploads, not URLs) */,
    });
  }

  /*--- GET request to retrieve item filter by category---- */

  handleFilterChange(e) {
    e.preventDefault();
    const categoryName = e.target.value;
    const url = '/filter/category/';
    if (!categoryName) {
      this.getAllItems();
    }
    fetch(path.resolve(url, categoryName))
      .then((res) => res.json())
      .then((res) => {
        this.setState({ allItems: res.items });
      })
      .catch((err) => {
        console.log('/filter/category GET error: ', err);
      });
  }

  /*---- POST request to add item to server---- */
  handleSubmit(e) {
    e.preventDefault();

    const {
      itemTitle,
      itemDescription,
      itemCategory,
      itemImage,
      claimed,
      user_id,
    } = this.state;
    const body = {
      title: itemTitle,
      description: itemDescription,
      image: itemImage,
      category: itemCategory,
      status: claimed,
      user_id,
    };
    const url = '/item/add';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json();
        const newItems = this.state.allItems.slice();
        newItems.push(body);
        this.setState({ allItems: newItems });
      })
      .catch((err) => {
        console.log('AddItem Post error: ', err);
      });
  }

  /*--- POST request to /LOG-IN---- */
  handleLoginSubmit(e) {
    e.preventDefault();

    const { userEmail, password } = this.state;
    const body = { userEmail, password };

    fetch('/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log('res in /log-in', res);
        res.json();

        this.setState({ isLoggedIn: true, password: '' });
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log('/LOG-IN Post error: ', err);
        this.setState({ userEmail: '', password: '' });
      });
  }

  /*----------------POST request To SIGNUP-------------------*/
  handleSignUpSubmit(e) {
    e.preventDefault();

    const {
      userFirstName,
      userLastName,
      password,
      userEmail,
      userStreet,
      userState,
      userCity,
      userZip,
    } = this.state;
    const body = {
      email: userEmail,
      password,
      firstName: userFirstName,
      lastName: userLastName,
      zipCode: userZip,
      street: userStreet,
      city: userCity,
      state: userState,
    };

    console.log('submit signUp req body:', body);

    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      // TODO: setState with isLoggedIn, clear pw
      // return to home page
      .then((res) => {
        console.log('res', res);
        this.props.history.push('/');
        // this.setState({})
      })
      .catch((err) => {
        console.log('AddItem Post error: ', err);
        // todo - clear all fields with setState
        this.setState({});
      });
  }

  /*----------------Geolocation-------------------*/
  getLocation() {
    // navigator.geolocation is a built-in browser object
    if (navigator.geolocation) {
      // invoke built-in method to get current position, passing in coordinates and error handler
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getCoordinates(position) {
    console.log('position', position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }

  // handles errors for getting user location
  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
      default:
        console.log('An unknown error occurred.');
    }
  }

  // ---------------------check session - called in componentDidMount-------------------------
  // checkSession() {
  //   fetch('/api/checksession')
  //   .then(res => res.json())
  //   .then(res =>  {
  //     // if (res.status === 200) {
  //     console.log("res.email in checkSession", res.email)
  //     // on successful status, update state email and pw
  //     this.setState({email: [res.email], isLoggedIn: true})

  //   })
  //   .catch(err => {
  //     console.log('/api/checksession GET error:', err);
  //   })
  // }

  /*--- GET Request for All items--- */
  getAllItems() {
    // call in componentDidMount
    fetch('/item/all')
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
        // update state with array
        this.setState({ allItems: res.items });
      })
      // this.props.history.push('/'))
      .catch((err) => {
        console.log('/item/all GET error: ', err);
      });
  }

  render() {
    return (
      <div className="backgroundColor" style={{ backgroundColor: '#FDFDFD' }}>
        <nav
          className="navbar navbar-expand-md navbar-light"
          style={{ backgroundColor: '#e4f3fe' }}
        >
          <NavLink to="/" className="nav-brand">
            <a
              className="navbar-brand"
              href="#"
              style={{ letterSpacing: '2px' }}
            >
              genero
              <span style={{ color: 'gray', letterSpacing: '3px' }}>city</span>
            </a>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </li>

              <div id="filterBox">
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="itemCategory"
                  onChange={(e) => {
                    this.handleFilterChange(e);
                  }}
                >
                  <option>Category</option>
                  <option value="">All</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Plants">Plants</option>
                  <option value="Sports">Sports</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  style={{ marginRight: '10px' }}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                allItems={this.state.allItems}
                userItems={this.state.userItems}
                userEmail={this.state.userEmail}
                userAddress={this.state.userAddress}
                userId={this.state.user_id}
                handleSubmit={this.handleSubmit}
                handleFileChange={this.handleFileChange}
                handleChange={this.handleChange}
                handleFilterChange={this.handleFilterChange}
              />
            )}
          />
          <Route
            exact
            path="/additem"
            render={(props) => (
              <AddItem
                {...props} // add props here
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props} // add props here
                handleLoginSubmit={this.handleLoginSubmit}
                handleChange={this.handleChange}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <SignUp
                handleChange={this.handleChange}
                handleSignUpSubmit={this.handleSignUpSubmit}
                {...props} // add props here
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile
                {...props}
                allItems={this.state.allItems}
                userId={this.state.user_id}
                userEmail={this.state.userEmail}
                userFirstName={this.state.userFirstName}
                userLastName={this.state.userLastName}
                // Pass to Profile Props for GeoLocation
                latitude={this.state.latitude}
                longitude={this.state.longitude}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
