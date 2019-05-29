import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SiteItem from './components/SiteItem';
import SiteHead from './components/SiteHead';

import AwesomeList from './../../../AwesomeList';

import { getNotificationsList, updateNotifications } from '../../actions';


class NotificationsList extends Component {
  constructor(props) {
    super(props);

    this.type = props.type;

    this.actions = {
      changeStatus: this.changeStatus,
      changePriority: this.changePriority
    };
  }

  componentDidMount() {
    this.props.getNotificationsList(this.type);
  }

  changeStatus = (id, status) => {
    const action = status ? 'enable' : 'disable';
    this.props.updateNotifications(this.type, id, action);
  }

  changePriority = (id, priority) => {
    this.props.updateNotifications(this.type, id, priority);
  }

  render() {
    const shortList = this.props.notifications && this.props.notifications.list && this.props.notifications.list.length > 2 ? 'full-list' : null;

    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies tabs-body">
        <div className={`m_datatable m-datatable m-datatable--default m-datatable--subtable  m-datatable--loaded ${shortList}`} id="local_data">
          <AwesomeList
            className="sites-list"
            head={SiteHead}
            item={SiteItem}
            data={this.props.notifications && this.props.notifications.list}
            actions={this.actions}
          />
        </div>
      </div>
    );
  }
}

NotificationsList.propTypes = {
  type: PropTypes.string.isRequired,
  getNotificationsList: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.instanceOf(Object).isRequired
};

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

export default connect(mapStateToProps, { getNotificationsList, updateNotifications })(NotificationsList);
