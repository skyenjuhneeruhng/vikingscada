import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../../../components/Avatar';

export class AvatarItem extends React.Component {
  render() {
    const {
      name, img
    } = this.props;
    return (
      <div className="m-widget4">
        <div className="m-widget4__item">
          <div className="m-widget4__img m-widget4__img--pic">
            <Avatar name={name} img={img} />
          </div>
          <div className="m-widget4__info">
            <span className="m-widget4__title">
              {name}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

AvatarItem.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string
};

AvatarItem.defaultProps = {
  name: '',
  img: ''
};

export default AvatarItem;
