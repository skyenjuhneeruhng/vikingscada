import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs';

import { getInvoiceById } from './actions';

export class InvoicePage extends React.Component {
  componentDidMount() {
    this.props.getInvoiceById(
      this.props.match && this.props.match.params && this.props.match.params.id
    );
  }

  getValidDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const month = dateObj.toLocaleString('en-us', { month: 'long' });
    return `${month} ${day}, ${year}`;
  }

  printPage = () => {
    window.print();
  }

  renderInvoiceList() {
    const {
      invoice
    } = this.props;

    const { type } = invoice;

    const name = (type === 'custom') ? invoice && invoice.custom_plan && invoice.custom_plan.name : invoice.subscribe && invoice.subscribe.nickname;
    const desc = (type === 'custom') ? invoice && invoice.custom_plan && invoice.custom_plan.desc : invoice.subscribe && invoice.subscribe.metadata && invoice.subscribe.metadata[1];
    const price = (type === 'custom') ? invoice && invoice.custom_plan && (invoice.custom_plan.price / 100) : invoice.subscribe && (invoice.subscribe.amount / 100);

    return (
      <tr>
        <td>{name}</td>
        <td>{desc}</td>
        <td>{type}</td>
        <td className="m--font-success"> ${price} </td>
      </tr>
    );
  }

  render() {
    const { updatedAt, id, user } = this.props.invoice;

    const {
      invoice
    } = this.props;

    const { type } = invoice;

    const price = (type === 'custom') ? invoice && invoice.custom_plan && (invoice.custom_plan.price / 100) : invoice.subscribe && (invoice.subscribe.amount / 100);

    return (
      <Fragment>
        <div className="m-grid__item m-grid__item--fluid m-wrapper companies invoice">
          <div className="m-subheader">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="m-subheader__title ">
                  Invoice
                </h3>
                <Breadcrumbs current="Invoice" />
              </div>
              <div className="mr-auto print-block">
                <i role="button" onClick={this.printPage} className="flaticon-technology-2" />
              </div>
            </div>
          </div>

          <div className="m-content">
            <div className="row">
              <div className="col-md-12">
                <div className="m-portlet">
                  <div className="m-portlet__body m-portlet__body--no-padding">
                    <div className="m-invoice-1">
                      <div className="m-invoice__wrapper">
                        <div className="m-invoice__head">
                          <img src="../img/signin_img1.png" className="ivoice-img" alt="" />
                          <div className="m-invoice__container m-invoice__container--centered">
                            <div className="m-invoice__logo">
                              <a href="/">
                                <h1>
                                  INVOICE
                                </h1>
                              </a>
                              <a href="/">
                                <img alt="" src="../img/logo.png" />
                              </a>
                            </div>
                            <span className="m-invoice__desc">
                              <span>
                                Viking SCADA LLC {new Date().getFullYear()}
                              </span>
                              <span>
                                All rights reserved
                              </span>
                            </span>
                            <div className="m-invoice__items">
                              <div className="m-invoice__item">
                                <span className="m-invoice__subtitle">
                                  DATA
                                </span>
                                <span className="m-invoice__text">
                                  {this.getValidDate(updatedAt)}
                                </span>
                              </div>
                              <div className="m-invoice__item">
                                <span className="m-invoice__subtitle">
                                  INVOICE NO.
                                </span>
                                <span className="m-invoice__text">
                                  {id}
                                </span>
                              </div>
                              <div className="m-invoice__item">
                                <span className="m-invoice__subtitle">
                                  INVOICE TO.
                                </span>
                                <span className="m-invoice__text">
                                  {`${user && user.first_name} ${user && user.last_name}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="m-invoice__body m-invoice__body--centered">
                          <div className="table-responsive">
                            <table className="table invoice-custom">
                              <thead>
                                <tr>
                                  <th> NAME </th>
                                  <th> DESCRIPTION </th>
                                  <th> TYPE </th>
                                  <th> AMOUNT </th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.renderInvoiceList()}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="m-invoice__footer">
                          <div className="m-invoice__container m-invoice__container--centered">
                            <div className="m-invoice__content">
                              <span>
                                {/* BANK TRANSFER */}
                              </span>
                              <span>
                                <span>
                                  {/* Account Name: */}
                                </span>
                                <span>
                                  {/* Barclays UK */}
                                </span>
                              </span>
                              <span>
                                <span>
                                  {/* Account Number: */}
                                </span>
                                <span>
                                  {/* 1234567890934 */}
                                </span>
                              </span>
                              <span>
                                <span>
                                  {/* Code: */}
                                </span>
                                <span>
                                  {/* BARC0032UK */}
                                </span>
                              </span>
                            </div>
                            <div className="m-invoice__content">
                              <span>
                                TOTAL AMOUNT
                              </span>
                              <span className="m-invoice__price m--font-success">
                                ${price}
                              </span>
                              <span>
                                Taxes Included
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

InvoicePage.propTypes = {
  getInvoiceById: PropTypes.func,
  match: PropTypes.instanceOf(Object),
  invoice: PropTypes.instanceOf(Object)

};

InvoicePage.defaultProps = {
  getInvoiceById() {},
  match: {},
  invoice: {}
};

function mapStateToProps(state) {
  return {
    invoice: state.invoice
  };
}

export default connect(mapStateToProps, {
  getInvoiceById
})(InvoicePage);
