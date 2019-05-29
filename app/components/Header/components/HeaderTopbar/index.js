import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserPanelDropdown from '../UserPanelDropdown';
import Avatar from '../../../Avatar';


import { listenTrafic, stopListening } from '../../../../api_helper/data_handler';


import { updateTraffic, getTraffic, clearTraffic } from '../../actions';

/**
 * Header Topbar
 */
export class HeaderTopbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPanel: false,
      data: ''
    };
  }

  // after render
  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentDidMount() {
    const {
      profile
    } = this.props;
    if (profile.role && profile.role.type === 'company') {
      this.props.getTraffic();
    }
    this.updateTraffic();
  }

  // after removing the component
  componentWillUnmount() {
    const {
      profile
    } = this.props;
    const userId = profile.company_admin && profile.company_admin.admin && profile.company_admin.admin.id;
    const url = `/${userId}/traffic`;
    document.removeEventListener('click', this.handleClickOutside, false);
    stopListening(url);
    this.props.clearTraffic();
  }


  /**
   * handle Click Outside
   *
   * @param {event} e
   * @public
   */
  handleClickOutside = (e) => {
    const userPanel = document.getElementById('user-panel');
    const userPanelBtn = document.querySelector('.m-nav__link--user');
    const path = e.path || (e.composedPath && e.composedPath());
    if ((path && !path.includes(userPanel) && !path.includes(userPanelBtn)) && this.state.userPanel) {
      this.setState({ userPanel: false });
    }
  }

  returnUrl() {
    const { profile } = this.props;

    const type = profile && profile.role && profile.role.type;
    switch (type) {
      case 'company': return profile && profile.company_admin && profile.company_admin.admin && profile.company_admin.admin.id;
      case 'managers': return profile && profile.manager_company && profile.manager_company.admin;
      case 'viewers': return profile && profile.viewer_company && profile.viewer_company.admin;
      default:
        return null;
    }
  }

  updateTraffic = () => {
    const {
      profile
    } = this.props;
    const userId = this.returnUrl();
    if (profile.role && profile.role.type !== 'root') {
      const url = `/${userId}/traffic`;
      listenTrafic(
        url,
        (data) => {
          this.props.updateTraffic(data);
        }
      );
    }
  }

  /**
   * toggle User Panel
   *
   * @param {event} e
   * @public
   */
  toggleUserPanel = (e) => {
    e.preventDefault();
    this.setState({ userPanel: !this.state.userPanel });
  }

  render() {
    const {
      profile
    } = this.props;

    const { count, stream } = this.props.traffic;

    // const data = `${count || '...'} B`;

    let data = '...';
    if (+count > 104857) {
      data = `${((count / 1024) / 1024).toFixed(2)} Mb`;
    } else if (+count < 104857 && +count > 102) {
      data = `${(count / 1024).toFixed(2)} Kb`;
    }

    // const companyName = (profile.company_admin && profile.company_admin.company_name) || (profile.manager_company && profile.manager_company.company_name) || (profile.viewer_company && profile.viewer_company.company_name);

    return (
      <div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general">
        <div className="m-stack__item m-topbar__nav-wrapper">
          <ul className="m-topbar__nav m-nav m-nav--inline">
            {
              profile.role && profile.role.type !== 'root' &&
                <li className="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light">
                  <div className="m-nav__link m-dropdown__toggle">
                    <span className="m-topbar__userpic m-topbar__company-name">
                      {
                        profile.role && profile.role.type === 'company' &&
                          <span className="m-subheader__daterange companies " id="m_dashboard_daterangepicker">
                            <span className="m-subheader__daterange-label">
                              {
                                stream && count !== '"off"' ?
                                  <Fragment>
                                    <span className="m-subheader__daterange-title">Stream: </span>
                                    <span className="m-subheader__daterange-date m--font-success">On / </span>
                                    <span className="m-subheader__daterange-date m--font-success">{data}</span>
                                  </Fragment>
                                  :
                                  <Fragment>
                                    <span className="m-subheader__daterange-title">Stream: </span>
                                    <span className="m-subheader__daterange-title">Off / </span>
                                    <span className="m-subheader__daterange-date m--font-success stream-data">{data}</span>
                                  </Fragment>
                              }
                            </span>
                            <Link to="../purchase">
                              <button type="button" className="btn m-btn--pill btn-warning m-btn--wide m-btn--bolder m-btn--lg purchase-btn" />
                            </Link>
                          </span>
                      }
                      {
                        profile.role && profile.role.type !== 'root' && profile.role && profile.role.type !== 'company' &&
                          <span className="m-subheader__daterange companies " id="m_dashboard_daterangepicker">
                            <span className="m-subheader__daterange-label">
                              {
                                stream ? <span className="m-subheader__daterange-date m--font-success">Stream: On </span> :
                                <span className="m-subheader__daterange-title">Stream: Off </span>
                              }
                            </span>
                          </span>
                      }
                    </span>
                  </div>
                </li>
            }
            {/* <li className="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light">
              <div className="m-nav__link m-dropdown__toggle">
                <span className="m-topbar__userpic m-topbar__company-name">
                  {companyName}
                </span>
              </div>
            </li> */}
            <li className={`m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-nav__link--user m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light ${this.state.userPanel ? 'm-dropdown--open' : null}`}>
              <a href="/" onClick={this.toggleUserPanel} className="m-nav__link m-dropdown__toggle">
                <span className="m-topbar__userpic">
                  <Avatar name={profile.first_name ? `${profile.first_name} ${profile.last_name}` : ''} img={profile.img ? profile.img : null} />
                </span>
                <span className="m-topbar__username m--hide">
                  {profile.first_name ? `${profile.first_name} ${profile.last_name}` : ''}
                </span>
              </a>
              <UserPanelDropdown waitingApprove={this.props.waitingApprove} name={profile.first_name ? `${profile.first_name} ${profile.last_name}` : ''} email={profile.email} profile={profile} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

HeaderTopbar.propTypes = {
  /**
   * User information
   */
  profile: PropTypes.instanceOf(Object),
  /**
   * Number of companies waiting to be approved
   */
  waitingApprove: PropTypes.number,
  updateTraffic: PropTypes.func,
  getTraffic: PropTypes.func,
  clearTraffic: PropTypes.func,
  traffic: PropTypes.instanceOf(Object)
};
HeaderTopbar.defaultProps = {
  profile: {},
  waitingApprove: 0,
  updateTraffic: () => {},
  getTraffic: () => {},
  clearTraffic: () => {},
  traffic: {}
};

/**
 * Binding data from store, return props for component
 *
 * @param {object} state
 * @public
 */
function mapStateToProps(state) {
  return {
    profile: state.profile,
    waitingApprove: state.waitingApprove,
    traffic: state.traffic
  };
}

export default connect(mapStateToProps, { updateTraffic, getTraffic, clearTraffic })(HeaderTopbar);
