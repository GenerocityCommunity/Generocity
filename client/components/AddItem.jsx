import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class AddItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hi from AddItem!
        {/* item details input */}
        <form>
          {/** ------- Item Title -------- */}
          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">
              Item Name
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="Enter Item Name"
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
                placeholder="Enter Item Description"
                name="description"
                x
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
                <option>Select a Category</option>
                <option>Appliances</option>
                <option>Plants</option>
                <option>Sports</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Miscellaneous</option>
              </select>
            </div>
          </div>
          {/** ------- Pickup Address -------- */}
          {/* <div className="form-group row">
            <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-md">
              Pickup address:{' '}
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control form-control-sm"
                id="colFormLabelSm"
                placeholder="Where can others find this item?"
                name="itemAddress"
                onChange={(e) => this.props.handleChange(e)}
              ></input>
            </div>
          </div> */}

          {/* image input */}
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="text"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="Image Here"
                name="image"
                onChange={(e) => this.props.handleFileChange(e)}
              ></input>
              {/* <input
                type="text"
                className="custom-file-input"
                id="inputGroupFile02"
                name="image"
                onChange={(e) => this.props.handleFileChange(e)}
              ></input> */}
              {/* <label
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
              </span> */}
            </div>
          </div>
        </form>
        {/*end component div*/}
      </div>
    );
  }
}

export default AddItem;
