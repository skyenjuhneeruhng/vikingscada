import React from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Modal from 'react-bootstrap/lib/Modal';

import Button from '../UIKit/Button';

/**
 * Confirmation popup
 */
class Confirmation extends React.Component {
  render() {
    const {
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      label,
      className,
      enableEscape = true
    } = this.props;
    return (
      <div className="static-modal">
        <Modal show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{confirmation}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button className={`${className}`} label={label} handleClick={proceed} />
            <Button className="secondary" label="Cancel" handleClick={cancel} />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Confirmation.propTypes = {
  /**
   * Modal's title
   */
  confirmation: PropTypes.string,

  /**
   * Indicates if the dialog is shown or not
   */
  show: PropTypes.bool,

  /**
   * Call to close the dialog with promise resolved
   */
  proceed: PropTypes.func,

  /**
   * Call to close the dialog with promise rejected
   */
  cancel: PropTypes.func,

  /**
   * label for button
   */
  label: PropTypes.string,

  /**
   * className for button
   */
  className: PropTypes.string,

  /**
   * Call to only close the dialog.
   */
  dismiss: PropTypes.func,

  /**
   * Indicates if the background is clickable or not
   */
  enableEscape: PropTypes.bool
};

Confirmation.defaultProps = {
  confirmation: '',
  label: 'Delete',
  className: ' btn-danger',
  show: false,
  proceed() {},
  cancel() {},
  dismiss() {},
  enableEscape: false
};

export default confirmable(Confirmation);
