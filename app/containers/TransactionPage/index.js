import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { confirm } from '../../components/Modal/util/confirm';

import TransactionItem from './components/TransactionItem';
import TransactionHead from './components/TransactionHead';

import ExtraAwesomeList from './../ExtraAwesomeList';
import Breadcrumbs from '../../components/Breadcrumbs';

import { unSubscribed } from '../PurchasePage/actions';
import { getTransactionsList } from './actions';

const TopPanel = (props) => {
  const { showModal, role } = props;
  return role && (
    <div className="col-md-4 order-1 order-md-2 m--align-right">
      <a
        role="button"
        onClick={() => showModal()}
        className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill"
      >
        <span>
          <span>
            Unsubscribe
          </span>
        </span>
      </a>
      <div className="m-separator m-separator--dashed d-md-none" />
    </div>
  );
};

export class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'payment/transactions';
  }

  componentDidMount() {
    this.props.getTransactionsList(
      this.url,
      {}
    );
  }

  unSubscribe = () => {
    confirm('Are you sure, that you want to unsubscribe?').then(() => {
      this.props.unSubscribed();
    }, () => {
    });
  }

  render() {
    const { transactions } = this.props;
    const id = transactions.some((e) => e.status === 'subscribed');

    let topPanelAction = {};
    if (this.props.profile) {
      topPanelAction = {
        showAddForm: this.unSubscribe,
        role: id
      };
    }

    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Transactions
              </h3>
              <Breadcrumbs current="Transactions" />
            </div>
          </div>
        </div>

        <div className="m-content">
          <div className="row">
            <div className="col-md-12">
              <div className="m-portlet m-portlet--full-height m-portlet--tabs m-portlet-pb sensors-body">
                <ExtraAwesomeList
                  className="transaction-list"
                  item={TransactionItem}
                  head={TransactionHead}
                  actions={this.actions}
                  url={this.url}
                  defaultQuery={{ _sort: 'name:asc' }}
                  TopPanel={TopPanel}
                  topPanelAction={topPanelAction}
                  filter={[{ value: '', name: 'Choose type' }, { value: 'subscribe', name: 'Subscription' }, { value: 'custom', name: 'Custom plan' }]}
                  filterBy="type"
                  tab
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TransactionPage.propTypes = {
  getTransactionsList: PropTypes.func,
  unSubscribed: PropTypes.func,
  transactions: PropTypes.instanceOf(Array),
  profile: PropTypes.instanceOf(Object)
};

TransactionPage.defaultProps = {
  getTransactionsList: () => {},
  unSubscribed: () => {},
  transactions: [],
  profile: {}
};

function mapStateToProps(state) {
  return {
    transactions: state.transaction && state.transaction.list
  };
}

export default connect(mapStateToProps, {
  getTransactionsList, unSubscribed
})(TransactionPage);

