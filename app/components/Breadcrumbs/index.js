import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
/**
 * Breadcrumbs
 */
export class Breadcrumbs extends React.Component {
  renderList(data) {
    return (
      <Fragment key={shortid.generate()}>
        <li className="m-nav__separator">
          -
        </li>
        <li className="m-nav__item">
          <Link to={`/${data.link}`} className="m-nav__link">
            <span className="m-nav__link-text">
              {data.label}
            </span>
          </Link>
        </li>
      </Fragment>
    );
  }

  render() {
    const {
      pages, current
    } = this.props;

    return (
      <ul className="m-subheader__breadcrumbs m-nav m-nav--inline">
        <li className="m-nav__item m-nav__item--home">
          <Link to="/" className="m-nav__link m-nav__link--icon">
            <i className="m-nav__link-icon la la-home" />
          </Link>
        </li>
        {pages ? pages.map((data) => this.renderList(data)) : null}
        <li className="m-nav__separator">
          -
        </li>
        <li className="m-nav__item m-nav__item--current">
          <span className="m-nav__link-text">
            {current}
          </span>
        </li>
      </ul>
    );
  }
}

Breadcrumbs.propTypes = {
  /**
   * List of pages
   */
  pages: PropTypes.instanceOf(Array),
  /**
   * Current page
   */
  current: PropTypes.string
};

Breadcrumbs.defaultProps = {
  pages: [],
  current: ''
};


export default Breadcrumbs;
