import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';

import Helmet from 'react-helmet';

import _ from 'lodash';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotFound from './../NotFound';

import { getProfile } from './../ProfilePage/actions';
import { savePrevUrl } from './actions';

import { logout } from './../SignIn/actions';

/**
 * Base component
 */
export default (WrappedComponent, isHeader = false, allowedRoles = []) => {
  class Base extends Component {
    componentWillMount() {
      const { token, profile } = this.props;
      this.shouldShowPage = (token && !_.isEmpty(profile)) || !token;

      const isProfileEmpty = this.isProfileEmpty(this.props);

      if (isProfileEmpty) {
        this.props.getProfile();
      }

      if (this.shouldRedirectToSignIn(this.props)) {
        this.redirectTo('/login', true, false);
      } else if (
        !isProfileEmpty && this.notVerified(this.props) && !this.isSomeLoginPage && !this.isOnPage('/verify')
      ) {
        this.redirectTo('/verify', true, false);
      } else if (token && !_.isEmpty(profile) && this.isSomeLoginPage && this.notVerified(this.props)) {
        this.props.logout();
        this.shouldShowPage = true;
      } else if (this.shouldRedirectToHome(this.props)) {
        this.redirectTo('/', true, false);
      }

      // console.log('!qwe', this.props.location && this.props.location.pathname, this.isSomeLoginPage);

      if (!this.isSomeLoginPage && this.props.location && this.props.location.pathname !== '/') {
        this.props.savePrevUrl(this.props.location && this.props.location.pathname);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.token && this.shouldRedirectToSignIn(nextProps)) {
        this.redirectTo('/login', false, true);
      } else if (
        this.isProfileEmpty(this.props) && this.notVerified(nextProps) && this.isSomeLoginPage
      ) {
        this.props.logout();
        this.shouldShowPage = true;
      } else if (
        this.notVerified(nextProps) && !this.isOnPage('/verify') && !this.isSomeLoginPage
      ) {
        this.redirectTo('/verify', true, false);
      // } else if (
      //   this.notVerified(nextProps) && !this.isOnPage('/verify') && !this.props.token && this.isSomeLoginPage
      // ) {
      //   this.redirectTo('/verify', false, false);
      } else if (this.props.token && this.shouldRedirectToHome(nextProps)) {
        this.redirectTo('/', true, false);
      } else if (nextProps.token && !this.isSomeLoginPage) {
        this.shouldShowPage = true;
      }
    }

    componentDidUpdate() {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }

    get isSomeLoginPage() {
      return this.isOnPage('/login', '/signup', '/reset-password');
    }

    redirectTo(url, useReplace = false, shouldShowPage = false) {
      if (useReplace) {
        this.props.replace(url);
      } else {
        this.props.push(url);
      }
      this.shouldShowPage = shouldShowPage;
    }

    shouldRedirectToSignIn(props) {
      const { token } = props;
      return !token && !this.isSomeLoginPage;
    }

    shouldRedirectToHome(props) {
      const { token, profile } = props;
      return token && (
        (this.isSomeLoginPage && !_.isEmpty(profile)) ||
        (!this.isOnPage('/$', '/verify') && this.isForbiddenStatus(profile)) ||
        (this.isOnPage('/verify') && profile.verified)
      );
    }

    notVerified(props) {
      const { token, profile } = props;
      return token && !profile.verified;
    }

    isOnPage(...pages) {
      const formRegExp = pages.map((page) => `^\\${page}`).join('|');
      const checkExpression = new RegExp(formRegExp);
      return Boolean(this.props.location.pathname.match(checkExpression));
    }

    isProfileEmpty(props) {
      const { token, profile } = props;
      return token && _.isEmpty(profile);
    }

    isForbiddenStatus(profile) {
      return !_.isEmpty(profile) && (
        (profile.role.type === 'company' && (profile.company_admin.status === 'pending' || profile.company_admin.status === 'rejected')) ||
        ((profile.role.type === 'managers' || profile.role.type === 'viewers') && (profile.status === 'pending' || profile.status === 'rejected'))
      );
    }

    /**
     * Call to run render for existing pages
     * @public
     */
    usualRender() {
      return isHeader ? (
        <Fragment>
          <Helmet
            title="Viking Scada"
            meta={[
              { name: 'description', content: 'Viking' },
              { property: 'og:title', content: 'Viking' }
            ]}
          />
          <Header />
          <div className="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
            <WrappedComponent {...this.props} />
          </div>

          <Footer />
        </Fragment>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }

    render() {
      const { profile } = this.props;
      return this.shouldShowPage && (
        profile.role && allowedRoles.length > 0 && !allowedRoles.includes(profile.role.type) ? (
          <NotFound />
        ) : (
          this.usualRender()
        )
      );
    }
  }

  Base.propTypes = {
    /**
     * Call to redirect
     */
    push: PropTypes.func.isRequired,

    replace: PropTypes.func.isRequired,

    logout: PropTypes.func.isRequired,

    /**
     * Location object (pathname)
     */
    location: PropTypes.instanceOf(Object).isRequired,

    /**
     * User profile
     */
    profile: PropTypes.instanceOf(Object).isRequired,

    /**
     * User token
     */
    token: PropTypes.string.isRequired,

    status: PropTypes.string.isRequired,

    /**
     * Call to get user profile
     */
    getProfile: PropTypes.func.isRequired,

    /**
     * Call to get count for companies whit status pending
     */
    getPendingCount: PropTypes.func.isRequired
  };

  function mapStateToProps(state) {
    return {
      token: state.token,
      profile: state.profile
    };
  }

  return connect(mapStateToProps, {
    push, replace, logout, getProfile, savePrevUrl
  })(Base);
};
