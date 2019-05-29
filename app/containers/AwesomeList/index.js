import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';


class AwesomeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preloader: true
    };
  }

  sortByTitle = (name) => (e) => {
    e.preventDefault();
    this.props.sortAction(name);
  }

  renderItems() {
    const {
      data, actions, item: Item
    } = this.props;

    if (!data.length) {
      return <span className="m-datatable--error">No records found</span>;
    }
    return data.map((itemData, index) => <Item listTotal={data && data.length - 1} listIndex={index} key={shortid.generate()} {...itemData} {...actions} />);
  }

  render() {
    const {
      className, sort, headData, data, actions, preloader
    } = this.props;

    const Head = this.props.head;

    return (
      <table className={`m-datatable__table ${className}`}>
        <thead className="m-datatable__head">
          <Head
            sort={sort}
            onClick={this.sortByTitle}
            data={{ ...headData, hide: actions.hide }}
          />
        </thead>
        <tbody className={`m-datatable__body ${data.length ? null : 'm-datatable--error'}`}>
          {preloader ?
            <tr className="like-div">
              <td className="like-div">
                <PreloaderIcon loader={Oval} size={50} strokeWidth={8} strokeColor="#f7bd27" duration={800} />
              </td>
            </tr> :
           this.renderItems()}
        </tbody>
      </table>
    );
  }
}

AwesomeList.propTypes = {
  item: PropTypes.func, // item component
  head: PropTypes.func, // table head component
  headData: PropTypes.instanceOf(Object),
  data: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object)
  ]),
  sort: PropTypes.string,
  sortAction: PropTypes.func,
  className: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func), // callbacks for item
  preloader: PropTypes.bool
};

AwesomeList.defaultProps = {
  item() {}, // item component
  head() { return <Fragment />; }, // table head component
  headData: {},
  data: [],
  sort: '',
  sortAction() {},
  className: '',
  actions: {}, // callbacks for item
  preloader: false
};

export default AwesomeList;
