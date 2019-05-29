import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loading-overlay';

import { connect } from 'react-redux';

import { confirmMessages } from './actions';


class ConfirmMessagesPage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      const url = `alert/${this.props.match && this.props.match.params && this.props.match.params.type}/confirm`;
      const code = this.props.match && this.props.match.params && this.props.match.params.id;
      this.props.confirmMessages(
        url,
        { code }
      );
    }, 2000);
  }

  renderText(confirm) {
    let text = 'Thank you for acknowledging the alert!';
    if (!confirm.ok) {
      text = `${this.props.confirm.first_name} ${this.props.confirm.last_name} ${this.props.confirm.email} has already acknowledged this alert!`;
    }
    return text;
  }

  render() {
    return (
      <Fragment>
        <div className="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body terms payment">
          <div className="m-grid__item m-grid__item--fluid m-wrapper">
            <div className="m-subheader ">
              <div className="d-flex align-items-center">
                <div className="mr-auto" />
              </div>
            </div>
            <div className="m-content success-page">
              <div className="row">
                <div className="col-md-12">
                  <div className="m-portlet">
                    <div className="m-portlet__body m-portlet__body--no-padding">
                      <div className="m-pricing-table-2">
                        <div className="m-pricing-table-2__head">
                          <div className="m-pricing-table-2__title m--font-light">
                            {/* <h1>Payment successful</h1> */}
                          </div>
                        </div>
                        <div className="m-pricing-table-2__content">
                          <div className="m-pricing-table-2__container">
                            <div className="m-pricing-table-2__items row">
                              <div className="col-md-12 text-center m-pricing-table-2__item">
                                <div className="m-pricing-table-2__visual">
                                  <div className="m-pricing-table-2__hexagon green" />
                                  <span className="m-pricing-table-2__icon m--font-success">
                                    <i className="fa flaticon-rocket" />
                                  </span>
                                </div>
                                <span className="m-pricing-table-2__subtitle m-pricing-table-2__subtitle--custom">
                                  { this.props.loading ? this.renderText(this.props.confirm) : null }
                                </span>
                                <div className="m-pricing-table-2__btn" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                !this.props.loading ?
                  <Loadable
                    active={!this.props.loading}
                    spinner
                  /> : null
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ConfirmMessagesPage.propTypes = {
  confirmMessages: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  confirm: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    confirm: state.confirmMessages,
    loading: state.confirmMessages && state.confirmMessages.loading
  };
}

export default connect(mapStateToProps, {
  confirmMessages
})(ConfirmMessagesPage);

