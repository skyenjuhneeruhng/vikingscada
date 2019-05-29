import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/UIKit/Button';

const PaymentSuccess = () => (
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
                            <h1>Payment successful</h1>
                            <span className="m-pricing-table-2__subtitle m-pricing-table-2__subtitle--custom">Thank you for using Viking Scada!</span>
                            <div className="m-pricing-table-2__btn">
                              {/* <span className="m-pricing-table-2__subtitle m-pricing-table-2__subtitle--custom">Get invoice</span> */}
                              <Link to="../transaction" className="m-nav__link check">
                                <Button label="My transactions" className="signin" />
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

export default PaymentSuccess;
