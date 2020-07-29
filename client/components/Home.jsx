/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router';
import ItemCard from './ItemCard.jsx';
import AddItem from './AddItem';
import '../scss/app.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    // tracks AddItem values
  }

  render() {
<<<<<<< HEAD
    const { allItems } = this.props.info; // provides this.state.allItems as an array

=======
    // console.log('home props', this.props.allItems);
    const { allItems } = this.props; // provides this.state.allItems as an array
>>>>>>> ca0ed93bcf474676ca0e709eeb99bbc2be7b879d
    // use map method to transform allItems into cards
    const cards = allItems.map((item) => {
      return (
        <div className="card">
          <ItemCard item={item} />
        </div>
      );
    });

    return (
      <>
        <section className="innerNav">
          <section className="leftNav"></section>
          <section className="rightNav">
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-dark addItemBtn"
              data-toggle="modal"
              data-target="#addItemModal"
            >
              Add Item
            </button>
          </section>
        </section>
        {/* <!!-- Modal Button - Display Content is in AddItem.jsx --!!> */}
        <div
          className="modal fade"
          id="addItemModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalScrollableTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalScrollableTitle">
                  Add an Item
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddItem
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit}
                  handleFileChange={this.props.handleFileChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={(e) => this.props.handleSubmit(e)}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="itemsContainer">{cards}</section>
      </>
    );
  }
}

export default Home;
