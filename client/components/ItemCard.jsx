/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../scss/app.scss';

// eslint-disable-next-line react/prefer-stateless-function
const ItemCard = (props)=>{
  
    const {
      _id,
      category,
      description,
      image,
      status,
      title,
    } = props.item;

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
            {description}
            <br />
            Category: {category}
            <br />
            Available: {status ? 'No' : 'Yes'}
            <br />
            <br />
            <Link to={`/itemDetails/${_id}`} className="btn btn-primary appButton" style={{ width: '100%' }}>
              Details
            </Link>

          </p>
        </div>
      </div>
    );
  }


export default ItemCard;
