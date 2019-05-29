import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

export class UserPanel extends React.Component {
  render() {
    const {
      item
    } = this.props;
    return (
      <li className="m-nav__item">
        <NavLink to="/" exact className="m-nav__link" activeClassName="active">
          <i className="m-nav__link-icon flaticon-time-3" />
          <span className="m-nav__link-title">
            <span className="m-nav__link-wrap">
              <span className="m-nav__link-text">
                Waiting for Approval
              </span>
              {
                item > 0 ?
                  <span className="m-nav__link-badge">
                    <span className="m-badge m-badge--warning">
                      {item}
                    </span>
                  </span> : null
              }
            </span>
          </span>
        </NavLink>
      </li>
    );
  }
}

UserPanel.propTypes = {
  item: PropTypes.number
};

UserPanel.defaultProps = {
  item: 0
};

export default UserPanel;
