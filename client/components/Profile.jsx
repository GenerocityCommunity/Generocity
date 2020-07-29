import React, { Component, Fragment } from 'react';

import ItemCard from './ItemCard.jsx';
import EditItem from './EditItem';
import '../scss/app.scss'; // would each page have different css?

const path = require('path');

// create local state for get request of user profile
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userItems: [],
    };
    // handleChange on edit of items
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleFileChange = this.handleFileChange.bind(this);
    this.getUserItems = this.getUserItems.bind(this);
    //
  }

  componentDidMount() {
    this.getUserItems();
  }

  //handle event click
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleFileChange(e) {
    console.log('input Image:', e.target.value);
    this.setState({
      itemImage: e.target.value,
    });
  }
  //

  /*--- GET request to get all items from server---- */

  getUserItems() {
    const url = '/user/';
    const id = this.props.userId;
    fetch(path.resolve(url, id))
      .then((res) => res.json())
      .then((res) => {
        this.setState({ userItems: res.allItems });
      })
      .catch((err) => {
        console.log('/item/user GET error: ', err);
      });
  }

  /*--- POST request to edit item to server---- */
  // handleSubmit(e) {
  //   e.preventDefault();
  //   const { itemTitle, itemDescription, itemCategory, itemImage, claimed, _id } = this.state;
  //   const body = {
  //     title: itemTitle,
  //     description: itemDescription,
  //     image: itemImage,
  //     category: itemCategory,
  //     status: claimed,
  //     id: _id,
  //   };

  // console.log('submit EditItem req body:', body);
  // const itemId = this.state.itemId;
  // fetch(path.resolve('/items/', itemId), {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'Application/JSON',
  //   },
  //   body: JSON.stringify(body),
  // })
  //   .then((res) => {
  //     res.json();
  //     // refresh state values
  //     // this.setState({ itemTitle: '', itemDescription: '', itemCategory: '', itemImage: '', itemAddress: '' })
  //     // return to home page
  //     // this.props.history.push('/')
  //     console.log('res in AddItem', res);
  //   })
  //   .catch((err) => {
  //     console.log('AddItem Post error: ', err);
  //     // this.setState({ itemTitle: '', itemDescription: '', itemCategory: '', itemImage: '', itemAddress: '' })
  //     this.props.history.push('/');
  //   });
  //}
  render() {
    const { userItems } = this.state;
    const cards = userItems.map((item) => {
      return (
        <>
          <section className="card">
            <ItemCard
              item={item}
              name={item.itemTitle}
              userid={item.itemUserId}
              location={item.itemAddress}
              status={item.itemStatus}
            />
            {/* <section className="cardItem">
              <button
                type="button"
                class="btn btn-dark editItemBtn"
                data-toggle="modal"
                data-target="#editItemModal"
              >
                Edit Item
              </button>
            </section> */}
          </section>
        </>
      );
    });

    return (
      <>
        <div
          class="modal fade"
          id="editItemModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalScrollableTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalScrollableTitle">
                  Edit Item
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditItem
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleFileChange={this.handleFileChange}
                />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary loginAndSignUpBtn" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary loginAndSignUpBtn" onClick={(e) => this.handleSubmit(e)}>
                  Edit Item
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="userProfile">
          <h4>Welcome to Your Profile, {this.props.userFirstName}!</h4>
          <p>Name: {this.props.userFirstName} {this.props.userLastName}< br />
          User Email: {this.props.userEmail}</p>
          <h5>Your listed items:</h5>
        </section>
        <section className="itemsContainer">{cards}</section>
      </>
    );
  }
}

export default Profile;
