import React from 'react';

/**
 * Footer component
 */
export class Footer extends React.Component {
  render() {
    return (
      <footer className="m-grid__item main-footer">
        <div className="m-container m-container--fluid m-container--full-height m-page__container">
          <div className="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
            <div className="m-stack__item m-stack__item--left m-stack__item--middle m-stack__item--last">
              <span className="m-footer__copyright">{`© ${new Date().getFullYear()} Viking SCADA `}</span>
            </div>
            <div className="m-stack__item m-stack__item--right m-stack__item--middle m-stack__item--first">
              <span className="m-footer__copyright">
                <span className="m-footer__copyright">
                  Powered by
                  <a href="https://indeema.com/" target="blank" className="m-link">
                    <img alt="" src="/img/indeema-logo.png" />
                  </a>
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
