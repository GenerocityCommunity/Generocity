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
      _id,
      category,
      description,
      image,
      status,
      title,
      user_id,
    } = this.props.item;
    let claimed = status ? 'Yes' : 'No';

    return (
      <div>
        <img className="card-img-top" src={image} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {/* Location: Enter Location Here <br /> */}
            <br />
            {description} <br />
            Category: {category}
            <br />
            Claimed: {claimed}
          </p>
        </div>
      </div>
    );
  }
}

export default ItemCard;
