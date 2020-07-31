import React, { Component } from 'react';
const path = require('path');
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/app.scss';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import AddItem from './AddItem.jsx';
import ItemDetails from './ItemDetails.jsx';
import { Route, Switch, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Navbar from './Navbar';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // store most state in App component, make available to child components as props
      isLoggedIn: false,
      allItems: [], // (each item is an object)
      /* State for Current User */
      email: '',
      points: '',
      firstName: '',
      lastName: '',
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
      user_id: '',
      redirect: null,
    };
    this.getAllItems = this.getAllItems.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.checkSession = this.checkSession.bind(this);
    /* Bind for Geolocation Feature */
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    // Logout
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
  }

  /*----------- ComponentDidMount calls initial GET for all items -----------------*/
  componentDidMount() {
    this.getAllItems();
    this.checkSession();
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
    console.log('handle filter change', e.target.value);
    const categoryName = e.target.value;
    const url = '/filter/category/';
    if (!categoryName) {
      this.getAllItems();
    }
    fetch(path.resolve(url, categoryName))
      .then((res) => res.json())
      .then((res) => {
        console.log('res items', res);
        this.setState({ allItems: res.items });
      })
      .catch((err) => {
        console.log('/filter/category GET error: ', err);
      });
  }

  /*---- POST request to add item to server---- */
  handleSubmit(e) {
    e.preventDefault();
    // check if user_id in state has been updated after signing up and logging in
    // if it is not updated, geocoding for each item will not work
    // console.log('this.state.user_id', this.state.user_id);
    const {
      allItems,
      title,
      description,
      category,
      image,
      status,
      user_id,
    } = this.state;

    const length = allItems.length + 1;
    
    const body = {
      _id: length,
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
        console.log('newItems', newItems);
        this.setState({ allItems: newItems });
        // add functionality to RELOAD page so the link is not undefined
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
      .then((res) => res.json())
      .then((data) => {
        if (data.log || data.error) {
          console.log('error: ', data.log, '\n', data.error);
          // show a message that describes error
        } else {
          console.log(data);
          const { isLoggedIn } = data;

          this.setState({
            isLoggedIn,
            password: '',
            email,
            // ID must be a string to not break <Profile />'s path.resolve
            user_id: data.user._id.toString(),
            firstName: data.user.firstName,
            lastName: data.user.lastName,
          });
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.log('/LOG-IN Post error: ', err);
        this.setState({ email: '', password: '' });
      });
  }

  /*--- POST request to /LOG-OUT---- */
  handleLogoutSubmit() {
    this.setState({
      isLoggedIn: false,
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
      city,
      state,
      zipCode,
    } = this.state;

    // Query Google Maps Geocode API for latitude & longitude
    // variable that stores url to fetch lat & long from user inputed address
    let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json`;

    let geocodeLatitude;
    let geocodeLongitude;

    // MUST use arrow function here, or else when we setState in nested async function
    // 'this' will be undefined
    const geocode = () => {
      // let location = '22 Main St Boston MA'
      let location = `${street} ${city} ${state}}`;
      axios
        .get(geocodeURL, {
          params: {
            address: location,
            key: process.env.GOOGLE_API_KEY,
          },
        })
        .then((res) => {
          console.log('response from Geocode API', res);
          geocodeLatitude = res.data.results[0].geometry.location.lat;
          geocodeLongitude = res.data.results[0].geometry.location.lng;
          console.log('lat & long', geocodeLatitude, geocodeLongitude);

          // Request body for POST request to sign up user
          const body = {
            email,
            password,
            firstName,
            lastName,
            zipCode,
            street,
            city,
            state,
            latitude: geocodeLatitude,
            longitude: geocodeLongitude,
          };

          // POST request to backend to add user info to db
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
              console.log('res.user_id', res.user_id);
              // set state with new values for user_id and toggle isLoggedIn to true
              console.log('this', this);
              this.setState({
                user_id: res.user_id.toString(),
                isLoggedIn: true,
              });
              console.log(
                'new user_id after setting state',
                this.state.user_id
              );
              // this.props.history.push('/');
              redirect();
            })
            .catch((err) => {
              console.log('AddItem Post error: ', err);
            });
        })
        .catch((err) => {
          console.log(
            'Error from Geocode function in HandleSignUpSubmit in App.jsx',
            err
          );
        });
    };

    // call geocode() to get lat & long of user who signed up
    geocode();

    // storing invocation of this.props.history.push('/') so that this.props is accessible
    // within the nested async POST to '/user/signup'
    let redirect = () => this.props.history.push('/');
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

  /*----------------Geocoding (getting lat & long coords from Google API-------------------*/

  // ------- Sessions Authentication - called in componentDidMount -------
  checkSession() {
    fetch('/user/checksession')
      .then((res) => res.json())
      .then((res) => {
        // on successful status, update state email and user_id, and set isLoggedIn to true
        let isLoggedIn =
          res.email === undefined || res.userId === undefined ? false : true;
        this.setState({
          email: res.email,
          user_id: res.userId,
          isLoggedIn,
          firstName: res.firstName,
          lastName: res.lastName,
        });
      })
      .catch((err) => {
        console.log('/user/checksession GET error:', err);
      });
  }

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
        <Navbar
          handleFilterChange={this.handleFilterChange}
          handleLogoutSubmit={this.handleLogoutSubmit}
          isLoggedIn={this.state.isLoggedIn}
        />

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
            render={(props) => (
              <Profile
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
            path="/itemDetails/:item_id"
            render={(props) => <ItemDetails {...props} info={this.state} />}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
