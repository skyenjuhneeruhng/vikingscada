import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import { DOMAINAPI } from './../../../config';

/**
 * Renders file selector for redux form
 * @memberof module:ReduxFormFields
 */

class FileSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { imagePreviewUrl: false };
  }
  _handleImageChange = (e, input) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
      input.onChange(file);
      // this.FileName.innerHTML = file.name;
    };
    reader.readAsDataURL(file);
  }

  emulateClick(e) {
    this.FileSelector.click(e);
  }

  render() {
    const {
      input,
      url,
      disabled,
      meta: { touched, error }
    } = this.props;

    const correctUrl = `${DOMAINAPI}/uploads/${url}`;
    return (
      <Fragment>
        <input
          className="FileSelector"
          type="file"
          onChange={(e) => this._handleImageChange(e, input)}
          accept="image/jpeg,image/png,image/gif,image/bmp,image/x-windows-bmp,image/tiff,image/x-tiff"
          ref={(r) => { this.FileSelector = r; }}
          hidden
        />
        <button
          className={`btnAddIcon FileSelector ${(touched && error ? 'reqFile' : '')}`}
          onClick={this.emulateClick.bind(this)}
          type="button"
          disabled={disabled}
          style={this.state.imagePreviewUrl || url ? { backgroundImage: `url(${this.state.imagePreviewUrl || correctUrl})` } : {}}
        >
          {!this.state.imagePreviewUrl && <i className="flaticon-add" /> }
        </button>
      </Fragment>
    );
  }
}

FileSelector.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  url: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  disabled: PropTypes.bool.isRequired
};

export default FileSelector;
