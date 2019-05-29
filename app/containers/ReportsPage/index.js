import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loadable from 'react-loading-overlay';

import TransactionItem from './components/TransactionItem';
import TransactionHead from './components/TransactionHead';

import ExtraAwesomeList from './../ExtraAwesomeList';
import Breadcrumbs from '../../components/Breadcrumbs';

import { getReportsList, downloadReportsList } from './actions';

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
            Download
          </span>
        </span>
      </a>
      <div className="m-separator m-separator--dashed d-md-none" />
    </div>
  );
};

export class ReportsPage extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'account/report';
  }

  componentDidMount() {
    this.props.getReportsList(
      this.url,
      {}
    );
  }

  downloadReports = () => {
    const { from, to } = this.props;
    this.props.downloadReportsList(
      this.url,
      {
        from,
        to,
        download: true
      }
    );
  }

  render() {
    let topPanelAction = {};
    if (this.props.profile) {
      topPanelAction = {
        showAddForm: this.downloadReports,
        role: true
      };
    }

    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company report-page">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Reports
              </h3>
              <Breadcrumbs current="Reports" />
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
                  fromTo
                  tab
                />
              </div>
            </div>
          </div>
        </div>
        {
          this.props.loading ?
            <Loadable
              active={this.props.loading}
              spinner
            /> : null
          }
      </div>
    );
  }
}

ReportsPage.propTypes = {
  getReportsList: PropTypes.func,
  downloadReportsList: PropTypes.func,
  profile: PropTypes.instanceOf(Object),
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

ReportsPage.defaultProps = {
  getReportsList: () => {},
  downloadReportsList: () => {},
  profile: {}
};

function mapStateToProps(state) {
  return {
    reports: state.reports && state.reports.list,
    from: state.list_data && state.list_data.from,
    to: state.list_data && state.list_data.to,
    loading: state.reports && state.reports.loading
  };
}

export default connect(mapStateToProps, {
  getReportsList, downloadReportsList
})(ReportsPage);

