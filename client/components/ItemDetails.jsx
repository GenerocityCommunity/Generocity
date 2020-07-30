import React, { Component, Fragment } from 'react';

const ItemDetails = (props) => {

  const { latitude, longitude } = props;

  return (
    <section className="userProfile">
      <h4>Item Details</h4>
      {/* <img className="card-img-top" > */}
      <p>
        Name:
      <br />
      Category:
      <br />
      Status:
      <br />
      Description:
      <br />
      Location:
      <br />
        {latitude && longitude ? <img src={mapSrc} alt="" /> : null}
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h5>Your listed items:</h5>
    </section>

  )
}

export default ItemDetails;