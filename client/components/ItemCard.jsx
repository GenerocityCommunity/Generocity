/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import '../scss/app.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  // eslint-disable-next-line lines-between-class-members
  render() {
    const {
      category,
      description,
      image,
      status,
      title,
      /* build query on backend to populate item location for each item card */
      // city,
      // state,
      user_id,
    } = this.props.item;

    return (
      <div>
        <div className="card-img-container">
          <img className="card-img-top" src={image} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {/* Location: {`${city}, ${state}`} <br /> */}
            <br />
            {description} <br />
            Category: {category}
            <br />
            Claimed: {status ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    );
  }
}

export default ItemCard;
