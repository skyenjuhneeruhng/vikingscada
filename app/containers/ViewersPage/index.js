import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import { confirm } from '../../components/Modal/util/confirm';

import Breadcrumbs from '../../components/Breadcrumbs';

import MemberItem from './../Members/MemberItem';
import MemberHead from './../Members/MemberHead';

import ExtraAwesomeList from './../ExtraAwesomeList';

import { deleteEntityById, updateEntityById } from './../NewBasePage/actions';

const url = 'viewers';

const TopPanel = () => (
  <div className="col-md-4 order-1 order-md-2 m--align-right">
    <Link to="/new-viewer" className="btn btn-warning m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill">
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
      changeStatus: this.changeStatus
    };
  }

  editViewer = (id) => {
    this.props.push(`/viewer/${id}`);
  }

  deleteViewer = (id) => {
    confirm('Are you sure, that you want to delete this viewer?').then(() => {
      this.props.deleteEntityById(id, 'user', 'viewers');
    }, () => {
    });
  }

  changeStatus = (id, status) => {
    this.props.updateEntityById(id, { status }, 'user', 'viewers');
  }

  render() {
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Viewers
              </h3>
              <Breadcrumbs current="Viewers" />
            </div>
          </div>
        </div>

        <ExtraAwesomeList
          className="members-list"
          item={MemberItem}
          head={MemberHead}
          actions={this.actions}
          url={url}
          defaultQuery={{ _sort: 'updatedAt:desc' }}
          TopPanel={TopPanel}
          searchBy="email"
          tab
        />
      </div>
    );
  }
}

ViewersPage.propTypes = {
  push: PropTypes.func.isRequired,
  deleteEntityById: PropTypes.func.isRequired,
  updateEntityById: PropTypes.func.isRequired
};

export default connect(null, {
  push, deleteEntityById, updateEntityById
})(ViewersPage);
