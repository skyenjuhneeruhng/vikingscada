import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/UIKit/Button';

const PaymentCanscelPage = () => (
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
                        {/* <h1>Something went wrong</h1> */}
                      </div>
                    </div>
                    <div className="m-pricing-table-2__content">
                      <div className="m-pricing-table-2__container">
                        <div className="m-pricing-table-2__items row">
                          <div className="col-md-12 text-center m-pricing-table-2__item">
                            <div className="m-pricing-table-2__visual">
                              <div className="m-pricing-table-2__hexagon red" />
                              <span className="m-pricing-table-2__icon m--font-danger">
                                <i className="fa flaticon-information" />
                              </span>
                            </div>
                            <h1>An error occurred while processing your payment</h1>
                            <span className="m-pricing-table-2__subtitle m-pricing-table-2__subtitle--custom">Please check your credentials and try again.</span>
                            <div className="m-pricing-table-2__btn">
                              <Link to="../purchase" className="m-nav__link">
                                <Button label="Try again" className="signin" />
                              </Link>
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
      </div>
    </div>
  </Fragment>
);

export default PaymentCanscelPage;
