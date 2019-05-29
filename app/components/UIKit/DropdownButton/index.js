import React from 'react';
import PropTypes from 'prop-types';

export class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  composedPath(el) {
    let data = el;
    const path = [];
    while (data) {
      path.push(data);
      if (data.tagName === 'HTML') {
        path.push(document);
        path.push(window);
      }
      const ch = data.parentElement;
      data = ch;
    }
    return path;
  }

  handleClickOutside = (e) => {
    const userPanelBtn = document.querySelectorAll('.drobdown-menu-button');
    const path = this.composedPath(e.target);
    if (e.target.id !== this.props.id && (path && !path.includes(userPanelBtn)) && this.state.show) {
      this.setState({ show: false });
    }
  }

  handleClick = () => {
    this.setState({ show: !this.state.show });
  }

  changeStatus = (e) => {
    e.preventDefault();
    this.props.onChoose(e.target.dataset.value.toLowerCase());
    this.setState({ show: false });
  }

  createOptions(data, i) {
    return (
      <a key={i} data-value={data.val} className="dropdown-item" href="/" onClick={this.changeStatus} data-toggle="m-tooltip" title="" data-placement="right" data-skin="dark" data-container="body">
        {data.label}
      </a>
    );
  }
  selectedValue(selected) {
    switch (selected) {
      case 'pedding': return 'm-badge--warning';
      case 'approved': return 'm-badge--success';
      case 'rejected': return 'm-badge--danger';
      case 'Enabled': return 'm-badge--success';
      case 'Disabled': return 'm-badge--danger';
      default:
        return 'm-badge--warning';
    }
  }

  render() {
    const {
      options, selected, id
    } = this.props;

    return (
      <div className="dropdown c-dropdown">
        <button
          className={`m-badge ${this.selectedValue(selected)} m-badge--wide drobdown-menu-button`}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleClick}
          id={id}
        >
          {selected}
        </button>
        <div className={`dropdown-menu ${this.state.show ? 'show' : null}`} aria-labelledby="dropdownMenuButton" x-placement="bottom-start" >
          {options.map((data, i) => this.createOptions(data, i))}
        </div>
      </div>
    );
  }
}

DropdownButton.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.string,
  options: PropTypes.instanceOf(Array),
  onChoose: PropTypes.func.isRequired
};

DropdownButton.defaultProps = {
  selected: '',
  options: ''
};

export default DropdownButton;
