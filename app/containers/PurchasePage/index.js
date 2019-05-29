import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Loadable from 'react-loading-overlay';

import { confirm } from '../../components/Modal/util/confirm';

import { getPlansList } from '../PlansList/actions';
import { getPaymentsList, getPublicKey, Subscribed, unSubscribed } from './actions';
import { getTransactionsList } from '../TransactionPage/actions';

import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/UIKit/Button';

export class PurchasePage extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'plan';
  }

  componentDidMount() {
    this.props.getPaymentsList();
    this.props.getPublicKey();
    this.props.getPlansList(
      this.url,
      {}
    );
    this.props.getTransactionsList(
      'payment/transactions',
      {
        status: 'subscribed',
        type: 'subscribe'
      }
    );
  }

  onToken = (id) => (token) => {
    const { profile } = this.props;
    const newToken = {
      stripeTokenType: 'card',
      stripeToken: token.id,
      stripeEmail: token.email
    };
    this.props.Subscribed(`payment/subscribe/${id}`, newToken, token.email === profile.email);
  }

  onTokenCustom = (id) => (token) => {
    const { profile } = this.props;
    const newToken = {
      stripeTokenType: 'card',
      stripeToken: token.id,
      stripeEmail: token.email
    };
    this.props.Subscribed(`payment/buy-custom/${id}`, newToken, token.email === profile.email);
  }

  unSubscribe = () => {
    confirm('Are you sure, that you want to unsubscribe?').then(() => {
      this.props.unSubscribed();
    }, () => {
    });
  }

  renderPurchaseItem(item) {
    let icon = 'confetti';
    switch (item.title) {
      case 'Bronze': icon = 'confetti'; break;
      case 'Silver': icon = 'rocket'; break;
      case 'Gold': icon = 'gift'; break;
      default:
        icon = 'confetti'; break;
    }

    const { transactions } = this.props;
    const id = transactions[0] && transactions[0].subscribe && transactions[0].subscribe.id;
    return (
      <div className="m-pricing-table-2__item col-lg-4">
        <div className="m-pricing-table-2__visual">
          <div className={`m-pricing-table-2__hexagon ${item.title.toLowerCase()}`} />
          <span className="m-pricing-table-2__icon m--font-info"><i className={`fa flaticon-${icon}`} /></span>
        </div>
        <h2 className="m-pricing-table-2__subtitle">{item.title}</h2>
        <div className="m-pricing-table-2__features">
          <span>{item.desc && item.desc[1]}</span>
          <span>{item.desc && item.desc[2]}</span>
          <span>{item.desc && item.desc[3]}</span>
          <span>{item.desc && item.desc[4]}</span>
        </div>
        <span className="m-pricing-table-2__label">$</span>
        <span className="m-pricing-table-2__price">{item.amount / 100}</span>
        <div className="m-pricing-table-2__btn">
          {
            id !== item.id ?
              <StripeCheckout
                token={this.onToken(item.id)}
                stripeKey={this.props.payments && this.props.payments.key}
                name="Viking Scada"
                description={item.title}
                amount={item.amount}
              >
                <button type="button" className="btn m-btn--pill btn-warning m-btn--wide m-btn--uppercase m-btn--bolder m-btn--lg">Purchase</button>
              </StripeCheckout> :

              <Button
                label="Unsubscribe"
                id="unsubscribe"
                className="secondary m-btn--wide m-btn--uppercase m-btn--bolder m-btn--lg unsubscribe"
                type="button"
                handleClick={this.unSubscribe}
              />
          }
        </div>
      </div>
    );
  }

  renderPurchaseCustom(item) {
    return (
      <div className="m-pricing-table-2__item col-lg-4">
        <div className="m-pricing-table-2__visual">
          <div className="m-pricing-table-2__hexagon" />
          <span className="m-pricing-table-2__icon m--font-info"><i className="fa flaticon-share" /></span>
        </div>
        <h2 className="m-pricing-table-2__subtitle">{item.name}</h2>
        <div className="m-pricing-table-2__features">
          <span>{`${item.mb} MB`}</span>
          <span>{item.desc}</span>
          <span className="m--font-success">{item.discount ? item.discount : ''}</span>
        </div>
        <span className="m-pricing-table-2__label">$</span>
        <span className="m-pricing-table-2__price">{item.price / 100}</span>
        <div className="m-pricing-table-2__btn">
          <StripeCheckout
            token={this.onTokenCustom(item.id)}
            stripeKey={this.props.payments && this.props.payments.key}
            name="Viking Scada"
            description={item.name}
            amount={item.price}
          >
            <button type="button" className="btn m-btn--pill btn-warning m-btn--wide m-btn--uppercase m-btn--bolder m-btn--lg">Pay</button>
          </StripeCheckout>
        </div>
      </div>
    );
  }

  render() {
    const { plans, payments } = this.props;
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies purchare">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Purchase
              </h3>
              <Breadcrumbs current="Purchase" />
            </div>
          </div>
        </div>

        <div className="m-content">
          <div className="row">
            <div className="col-md-12">
              <div className="m-portlet">
                <div className="m-portlet__body m-portlet__body--no-padding">
                  <div className="m-pricing-table-2">
                    <Tabs>
                      <div className="m-pricing-table-2__head">
                        <div className="m-pricing-table-2__title m--font-light">
                          <h1>Transparent &amp; Simple Pricing</h1>
                        </div>
                        <div className="btn-group nav m-btn-group m-btn-group--pill m-btn-group--air" role="group">
                          <TabList className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--primary">
                            <Fragment>
                              <Tab className="nav-item m-tabs__item btn m-btn--pill m-btn--wide m-btn--uppercase m-btn--bolder">
                                Monthly Subscription
                              </Tab>
                              <Tab className="nav-item m-tabs__item btn m-btn--pill m-btn--wide m-btn--uppercase m-btn--bolder">
                                Custom Plans
                              </Tab>
                            </Fragment>
                          </TabList>
                        </div>
                      </div>
                      <TabPanel>
                        <div className="m-pricing-table-2__content">
                          <div className="m-pricing-table-2__container">
                            <div className="m-pricing-table-2__items row">
                              {payments && payments.list ? payments.list.map((item) => this.renderPurchaseItem(item)) : null}
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="m-pricing-table-2__content">
                          <div className="m-pricing-table-2__container">
                            <div className="m-pricing-table-2__items row">
                              {plans ? plans.map((item) => this.renderPurchaseCustom(item)) : null}
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {payments.tryingToSubscribe && (
          <Loadable
            active={payments.tryingToSubscribe}
            spinner
            color="#000"
            text="Trying to purchase..."
          />
        )}
      </div>
    );
  }
}

PurchasePage.propTypes = {
  plans: PropTypes.instanceOf(Array),
  transactions: PropTypes.instanceOf(Array),
  payments: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object),
  getPlansList: PropTypes.func,
  getPaymentsList: PropTypes.func,
  Subscribed: PropTypes.func,
  getPublicKey: PropTypes.func,
  getTransactionsList: PropTypes.func,
  unSubscribed: PropTypes.func
};

PurchasePage.defaultProps = {
  plans: [],
  payments: {},
  profile: {},
  transactions: [],
  getPlansList: () => {},
  getPaymentsList: () => {},
  Subscribed: () => {},
  getPublicKey: () => {},
  getTransactionsList: () => {},
  unSubscribed: () => {}
};

function mapStateToProps(state) {
  return {
    plans: state.plans && state.plans.list,
    payments: state.payments,
    transactions: state.transaction && state.transaction.list,
    profile: state.profile
  };
}

export default connect(mapStateToProps, {
  getPlansList, getPaymentsList, getPublicKey, Subscribed, getTransactionsList, unSubscribed
})(PurchasePage);
