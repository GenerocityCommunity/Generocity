import React, { Component, Fragment } from 'react';
import EditItem from './EditItem';
// const { render } = require("sass")


const EditItemModal = (props) => {

  const { handleChange, handleSubmit, handleFileChange } = props;

  return (
    <div
      className="modal fade"
      id="editItemModal"
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
              Edit Item
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
            <EditItem
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleFileChange={handleFileChange}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary loginAndSignUpBtn"
              data-dismiss="modal"
            >
              Close
          </button>
            <button
              type="submit"
              className="btn btn-primary loginAndSignUpBtn"
              onClick={(e) => this.handleSubmit(e)}
            >
              Edit Item
          </button>
          </div>
        </div >
      </div >
    </div >
  )
}

export default EditItemModal;