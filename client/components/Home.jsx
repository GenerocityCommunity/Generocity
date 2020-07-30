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
    const { allItems } = this.props.info; // provides this.state.allItems as an array

    // use map method to transform allItems into cards
    const cards = allItems.map((item) => {
      return (
        <div className="card">
          <ItemCard item={item} />
        </div>
      );
    });
    // Add item moved to Profile
    return (
      <>
        <section className="itemsContainer">{cards}</section>
      </>
    );
  }
}

export default Home;
