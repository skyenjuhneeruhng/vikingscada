import React from 'react';
import PropTypes from 'prop-types';

export class SiteItem extends React.Component {
  editItem = (e) => {
    e.preventDefault();

    const { id, edit } = this.props;
    edit(id);
  }

  deleteItem = (e) => {
    e.preventDefault();

    const { id, deleteItem } = this.props;
    deleteItem(id);
  }

  render() {
    const {
      name, location
    } = this.props;
    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-name">
            {name}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-location">{location}</span>
        </td>
        <td className="m-datatable__cell">
          <a href="/" onClick={this.editItem} className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Edit">
            <i className="la la-edit" />
          </a>
          <a href="/" onClick={this.deleteItem} className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">
            <i className="la la-trash" />
          </a>
        </td>
      </tr>
    );
  }
}

SiteItem.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  id: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

SiteItem.defaultProps = {
  name: '',
  location: ''
};

export default SiteItem;
