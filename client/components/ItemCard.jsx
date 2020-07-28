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
    const { _id, category, description, image, status, title, user_id } = this.props.item;
    const { sendMessageButton } = this.props;

    let claimed = status ? 'Yes' : 'No';
    let messageButton;
    if (this.props.inProfile) {
      messageButton = null;
    } else {
      messageButton = <button type="button"
        class="btn btn-primary appButton"
        style={{ width: '100%' }}
        value={title}
        onClick={(e) => sendMessageButton(e)}
      >Message Lister</button>

    }
    /* TO DO: 
      backend: add location
      frontend: add description & image
      questions: value on message listener button?
    */
    return (
      <div>
        <img class="card-img-top" src={image} />
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">
            {/* Location: Enter Location Here <br /> */}
            <br />
            {description} <br />
            Category: {category}
            <br />
            Claimed: {claimed}
          </p>
          {messageButton}
        </div>
      </div>
    );
  }
}

export default ItemCard;
