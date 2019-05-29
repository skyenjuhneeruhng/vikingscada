import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withPreloader from '../HOCS/withPreloader';

const MAX_SHOWN = 20;

class Bar extends Component {
  render() {
    const { data } = this.props;
    const valuesLen = data.length;
    const lastInd = valuesLen < MAX_SHOWN ? valuesLen - 1 : MAX_SHOWN - 1;

    return (
      <div style={{ overflow: 'hidden' }}>
        Value: [{
          data
            .slice(-MAX_SHOWN)
            .map((value, i) => `${(+value).toFixed(2)}${lastInd !== i ? ', ' : ''}`)
        }]
      </div>
    );
  }
}

Bar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withPreloader(Bar, { size: 70 });
