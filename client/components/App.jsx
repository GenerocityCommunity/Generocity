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
import Navbar from './Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // store most state in App component, make available to child components as props
      isloggedIn: false,
      allItems: [], // (each item is an object)
      /* State for Current User */
      email: 'dave@gmail.com',
      points: '',
      firstName: 'Dave',
      lastName: "O'Sullivan",
      password: '',
      street: '',
      street2: '', // add this to frontend, backend, and db
      city: '',
      state: '',
      zipCode: '',
      /* State for Geolocation Feature */
      latitude: null,
      longitude: null,
      /* State for Single Item */
      title: '',
      description: '',
      category: '',
      image: '',
      status: false,
      user_id: '2',
      redirect: null,
    };
    this.getAllItems = this.getAllItems.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    // this.checkSession = this.checkSession.bind(this);
    /* Bind for Geolocation Feature */
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  /*----------- ComponentDidMount calls initial GET for all items -----------------*/
  componentDidMount() {
    this.getAllItems();
    // this.checkSession(); ---- session auth incomplete
    this.getLocation();
  }

  /*----------- Tracks changes in input forms and sets state -----------------*/
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /*----------- handle file change (image input) (AddItem)-----------------*/

  handleFileChange(e) {
    this.setState({
      image:
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

    const { title, description, category, image, status, user_id } = this.state;

    const body = {
      title,
      description,
      image,
      category,
      status,
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

    const { email, password } = this.state;
    const body = { email, password };

    fetch('/user/login', {
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
        this.setState({ email: '', password: '' });
      });
  }

  /*----------------POST request To SIGNUP-------------------*/
  handleSignUpSubmit(e) {
    e.preventDefault();

    const {
      firstName,
      lastName,
      password,
      email,
      street,
      state,
      city,
      zipCode,
    } = this.state;

    const body = {
      email,
      password,
      firstName,
      lastName,
      zipCode,
      street,
      city,
      state,
    };

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
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  // handles errors for getting user location
  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.log('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        console.log('An unknown error occurred.');
        break;
      default:
        console.log('An unknown error occurred.');
    }
  }

  // ------- Sessions Authentication - called in componentDidMount -------
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

  /*--- GET Request for All items --- */
  getAllItems() {
    // called in componentDidMount
    fetch('/item/all')
      .then((res) => res.json())
      .then((res) => {
        this.setState({ allItems: res.items });
      })
      .catch((err) => {
        console.log('/item/all GET error: ', err);
      });
  }

  render() {
    return (
      <div className="backgroundColor" style={{ backgroundColor: '#FDFDFD' }}>
        <Navbar handleFilterChange={this.handleFilterChange} />

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                info={this.state}
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
            render={(props) => <AddItem {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
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
                {...props}
                handleChange={this.handleChange}
                handleSignUpSubmit={this.handleSignUpSubmit}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} info={this.state} />}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
