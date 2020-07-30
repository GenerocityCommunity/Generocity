import React, { Component, Fragment } from 'react';

const ItemDetails = (props) => {

  const { allItems } = props.info;
  let itemDetails;

  // loop through allItems to find corresponding data for unique card
  allItems.forEach(object => {
    if (object._id === Number(props.match.params.item_id)) itemDetails = object;
  })

  console.log('itemDetails', itemDetails);

  // deconstruct data from itemDetails
  const { title, category, status, description, item_latitude, item_longitude, image } = itemDetails;

  // Dynamic URL  (string interpolation) for google maps (static) api link
  let mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${item_latitude}, ${item_longitude}&zoom=13&size=600x300&maptype=roadmap
&markers=color:red%7C${item_latitude}, ${item_longitude}
&key=${process.env.GOOGLE_API_KEY}`;

  return (
    <section className="userProfile">
      <h4>{title.toUpperCase()}</h4>
      <img className="card-img-top" style={{ width: '400px', height: 'auto' }} src={image} />
      <div>
        <br />
        <h6>Category: {category}</h6>
        <h6>Available: {status ? 'No' : 'Yes'}</h6>
        <h6>Description: {description}</h6>
        <br />
        <br />
        <h6>Location</h6>
        <br />
        {item_latitude && item_longitude ? <img src={mapSrc} alt="" /> : null}
      </div>
      <br />
    </section>

  )
}

export default ItemDetails;