/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class EditItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Edit Item
        {/* item details input */}
        <form>
          {/** ------- Item Title -------- */}
          <div className="form-group row loginAndSignUp">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">
              Item Title
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="Change Title"
                name="title"
                onChange={(e) => this.props.handleChange(e)}
              ></input>
            </div>
          </div>
          {/** ------- Item Description -------- */}
          <div className="form-group row">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="colFormLabel"
                placeholder="Revise Item Description"
                name="description"
                onChange={(e) => this.props.handleChange(e)}
              ></input>
            </div>
          </div>
          {/** ------- Category -------- */}

          <div className="form-group row">
            <label
              htmlFor="exampleFormControlSelect1"
              className="col-sm-2 col-form-label col-form-label-md"
            >
              Category
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="category"
                onChange={(e) => this.props.handleChange(e)}
              >
                <option>Furniture</option>
                <option>Sports</option>
                <option>Kitchen</option>
                <option>Clothing</option>
                <option>Appliances</option>
              </select>
            </div>
          </div>
          {/** ------- Pickup Address -------- */}
          <div className="form-group row">
            <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-md">
              Pickup address:{' '}
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control form-control-sm"
                id="colFormLabelSm"
                placeholder="Revise pickup address"
                name="itemAddress"
                onChange={(e) => this.props.handleChange(e)}
              ></input>
            </div>
          </div>

          {/* image input */}
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile02"
                name="image"
                onChange={(e) => this.props.handleFileChange(e)}
              ></input>
              <label
                className="custom-file-label"
                htmlFor="inputGroupFile02"
                aria-describedby="inputGroupFileAddon02"
              >
                Choose file
              </label>
            </div>
            <div className="input-group-append">
              <span className="input-group-text" id="inputGroupFileAddon02">
                Upload
              </span>
            </div>
          </div>
        </form>
        {/*end component div*/}
      </div>
    );
  }
}

export default EditItem;
