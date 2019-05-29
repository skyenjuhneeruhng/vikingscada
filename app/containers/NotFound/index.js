import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  // <div classNameName="not-found-container">
  //   ¯\_(ツ)_/¯
  // </div>
  <div className="m-grid m-grid--hor m-grid--root m-page">
    <div className="m-grid__item m-grid__item--fluid m-grid m-error-1">
      <div className="m-error_container">
        <span className="m-error_number">
          <h1>
            404
          </h1>
        </span>
        <p className="m-error_desc">
          OOPS! Something went wrong here
        </p>
        <p className="m-error_desc">
          <Link to="./" className="m-link">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default NotFound;
