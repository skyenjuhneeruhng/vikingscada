import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import WaitingApprov from '../WaitingApprov';

import { changeDefaultIndex } from '../../../EditCompanyPage/actions';

export class ProfileMenu extends React.Component {
  pushToIndex = (e) => {
    e.preventDefault();
    this.props.changeDefaultIndex(+e.target.dataset.index);
    this.props.push('../company');
  }

  renderMenu(profile) {
    switch (profile.role && profile.role.type) {
      case 'root':
        return (
          <Fragment>
            <WaitingApprov item={this.props.waitingApprove} />
            <li className="m-nav__item">
              <NavLink to="/companies" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-clipboard" />
                <span className="m-nav__link-text">
                  Companies
                </span>
              </NavLink>
            </li>
            {/* <li className="m-nav__item">
              <NavLink to="/sites" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-web" />
                <span className="m-nav__link-text">
                  Sites
                </span>
              </NavLink>
            </li> */}
            <li className="m-nav__item">
              <NavLink to="/managers" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-user-ok" />
                <span className="m-nav__link-text">
                  Managers
                </span>
              </NavLink>
            </li>
            <li className="m-nav__item">
              <NavLink to="/viewers" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-users" />
                <span className="m-nav__link-text">
                  Viewers
                </span>
              </NavLink>
            </li>
            <li className="m-nav__item">
              <NavLink to="/settings" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-settings-1" />
                <span className="m-nav__link-text">
                  My Settings
                </span>
              </NavLink>
            </li>
            <li className="m-nav__item">
              <NavLink to="/plans" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-list-3" />
                <span className="m-nav__link-text">
                  Payment Plans
                </span>
              </NavLink>
            </li>
          </Fragment>
        );
      case 'company':
        return (
          <Fragment>
            <li className="m-nav__item">
              <NavLink to="/company/details" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-clipboard" />
                <span className="m-nav__link-text">
                  My Company
                </span>
              </NavLink>
              <div className="m-menu__submenu " m-hidden-height="840">
                <span className="m-menu__arrow" />
                <ul className="m-menu__subnav">
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/details" className="m-nav__link">
                      Details
                    </NavLink>
                  </li>
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/sites" className="m-nav__link">
                      Sites
                    </NavLink>
                  </li>
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/managers" className="m-nav__link">
                      Managers
                    </NavLink>
                  </li>
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/viewers" className="m-nav__link">
                      Viewers
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="m-nav__item">
              <NavLink to="/settings" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-settings-1" />
                <span className="m-nav__link-text">
                  My Settings
                </span>
              </NavLink>
            </li>
            <li className="m-nav__item">
              <NavLink to="/transaction" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-cart" />
                <span className="m-nav__link-text">
                  Manage My Account
                </span>
              </NavLink>
            </li>
            <li className="m-nav__item">
              <NavLink to="/reports" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-open-box" />
                <span className="m-nav__link-text">
                  Reports
                </span>
              </NavLink>
            </li>
            <li className="m-nav__item">
              <NavLink to="/alarms" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-bell" />
                <span className="m-nav__link-text">
                  Alarms
                </span>
              </NavLink>
            </li>

            <li className="m-nav__item">
              <a target="blank" href="/uploads/Viking SCADA Web Application Manual.pdf" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-download" />
                <span className="m-nav__link-text">
                  Download Manual
                </span>
              </a>
            </li>
          </Fragment>
        );
      case 'managers':
      case 'viewers':
        return (
          <Fragment>
            <li className="m-nav__item">
              <NavLink to="/company/details" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-clipboard" />
                <span className="m-nav__link-text">
                  My Company
                </span>
              </NavLink>
              <div className="m-menu__submenu " m-hidden-height="840">
                <span className="m-menu__arrow" />
                <ul className="m-menu__subnav">
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/details" className="m-nav__link">
                      Details
                    </NavLink>
                  </li>
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/sites" className="m-nav__link">
                      Sites
                    </NavLink>
                  </li>
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/managers" className="m-nav__link">
                      Managers
                    </NavLink>
                  </li>
                  <li className="m-menu__item" aria-haspopup="true">
                    <NavLink to="/company/viewers" className="m-nav__link">
                      Viewers
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="m-nav__item">
              <NavLink to="/settings" className="m-nav__link" activeClassName="active">
                <i className="m-nav__link-icon flaticon-settings-1" />
                <span className="m-nav__link-text">
                  My Settings
                </span>
              </NavLink>
            </li>
          </Fragment>
        );
      default:
        return 'm-badge--warning';
    }
  }
  render() {
    const { profile } = this.props;
    return (
      <ul className="m-nav m-nav--hover-bg m-portlet-fit--sides">
        <li className="m-nav__separator m-nav__separator--fit" />
        <li className="m-nav__section m--hide">
          <span className="m-nav__section-text">
            Section
          </span>
        </li>

        {this.renderMenu(profile)}
        {/* {this.renderMenu([{name: "Activity"}, {name: "Activity2"}])} */}
      </ul>
    );
  }
}

ProfileMenu.propTypes = {
  waitingApprove: PropTypes.number,
  profile: PropTypes.instanceOf(Object),
  changeDefaultIndex: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
};

ProfileMenu.defaultProps = {
  waitingApprove: 0,
  profile: {}
};


export default connect(null, {
  push, changeDefaultIndex
})(ProfileMenu);
