import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import { confirm } from '../../../../components/Modal/util/confirm';

import MemberItem from './../../../Members/MemberItem';
import MemberHead from './../../../Members/MemberHead';

import ExtraAwesomeList from './../../../ExtraAwesomeList';

import { deleteEntityById, updateEntityById } from './../../../NewBasePage/actions';
import { getEntities } from '../../../../components/FormRenderers/InputAutoComplete/actions';

import filterSites from '../../filterSites';

const TopPanel = (companyId) => () => (
  <div className="col-md-4 order-1 order-md-2 m--align-right">
    <Link className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill" to={`/new-viewer/${companyId ? companyId : ''}`}>
      <span>
        <i className="la la-plus" />
        <span>
          Viewer
        </span>
      </span>
    </Link>
    <div className="m-separator m-separator--dashed d-md-none" />
  </div>
);

class ViewersPage extends Component {
  constructor(props) {
    super(props);

    this.actions = {
      edit: this.editViewer,
      deleteItem: this.deleteViewer,
      changeStatus: this.changeStatus,
      hide: props.role === 'viewers'
    };

    let companyId = null;
    if (props.role === 'root') {
      companyId = props.id;
    }
    this.TopPanelComponent = TopPanel(companyId);

    this.url = props.role === 'root' ?
      `viewers?viewer_company=${props.id}` :
      'account/viewers';
  }

  componentDidMount() {
    const { role, needSitesLoad, getEntities: getSitesEntities } = this.props;
    if (needSitesLoad && (role === 'company' || role === 'managers')) {
      getSitesEntities({}, 'account/site');
    }
  }

  editViewer = (id) => {
    this.props.push(`/viewer/${id}`);
  }

  deleteViewer = (id) => {
    confirm('Are you sure, that you want to delete this viewer?').then(() => {
      const { role, id: companyId } = this.props;
      this.props.deleteEntityById(
        id,
        role === 'root' ? 'user' : 'account/viewers',
        role === 'root' ? `/company/${companyId}/viewers` : '/company/viewers'
      );
    }, () => {
    });
  }

  changeStatus = (id, status) => {
    const { role } = this.props;
    this.props.updateEntityById(
      id,
      { status },
      role === 'root' ? 'user' : 'account/viewers',
      role === 'root' ? '/viewers' : '/company/viewers'
    );
  }

  render() {
    const { sites, role } = this.props;
    const siteFilter = [{ value: '', name: 'Choose site' }, ...sites];
    const filterProps = role !== 'viewers' && {
      filter: siteFilter,
      filterBy: 'site_viewer'
    };

    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company tabs-body">
        <ExtraAwesomeList
          className="members-list"
          item={MemberItem}
          head={MemberHead}
          actions={this.actions}
          url={this.url}
          defaultQuery={{ _sort: 'updatedAt:desc' }}
          TopPanel={
            (role !== 'viewers') ? this.TopPanelComponent : Fragment
          }
          searchBy="email"
          {...filterProps}
        />
      </div>
    );
  }
}

ViewersPage.propTypes = {
  sites: PropTypes.instanceOf(Array).isRequired,
  push: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  needSitesLoad: PropTypes.bool.isRequired,
  getEntities: PropTypes.func.isRequired,
  deleteEntityById: PropTypes.func.isRequired,
  updateEntityById: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const sites = filterSites(state, props, 'viewer');

  return {
    sites,
    needSitesLoad: true
  };
}

export default connect(mapStateToProps, {
  push, deleteEntityById, updateEntityById, getEntities
})(ViewersPage);
