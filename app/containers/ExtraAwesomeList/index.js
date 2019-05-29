import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { parseQuery, stringifyQuery } from '../../api_helper';

import AwesomeList from './../AwesomeList';

import Input from '../../components/UIKit/Input';
import InputPicker from '../../components/UIKit/InputPicker';
import Select from '../../components/UIKit/Select';
import Pagination from '../../components/Pagination';
import NumberPerPage from '../../components/NumberPerPage';

import { getListData, clearListData } from './actions';

class ExtraAwesomeList extends Component {
  constructor(props) {
    super(props);

    this.urlQuery = parseQuery(window.location.search);

    const from = new Date();
    const newFrom = from.setMonth(from.getMonth() - 1);

    this.state = {
      search: this.urlQuery.search || '',
      filter: this.urlQuery.filter || '',
      from: new Date(newFrom),
      to: new Date()
    };
  }

  componentDidMount() {
    const { _start, _limit } = this.props;
    // const lastPage = Math.ceil(total / _limit);
    const proposedPage = Math.ceil(_start / _limit) + 1;

    // if (this.urlQuery.page && this.urlQuery.page > lastPage) {
    //   this.updateUrlQuery({ page: proposedPage });
    // }

    this.updatePageData(this.urlQuery.page || proposedPage, true);
  }

  componentWillUnmount() {
    if (this.props.destroyOnUnmount) {
      this.props.clearListData();
    }
  }

  onPage = (num) => {
    this.updateUrlQuery({ page: num });
    this.updatePageData(num);
  }

  updateUrlQuery(updateQuery) {
    const { pathname } = window.location;

    Object.assign(this.urlQuery, updateQuery);

    this.urlQuery = Object.keys(this.urlQuery).reduce(
      (acc, curKey) => {
        const value = this.urlQuery[curKey];
        return value === '' ? acc : { ...acc, [curKey]: value };
      },
      {}
    );
    const query = stringifyQuery(this.urlQuery).replace('%3A', ':');
    window.history.replaceState(null, null, `${pathname}?${query}`);
  }

  updatePageData(page = 1, useDefault = false) {
    const {
      search, filter, from, to
    } = this.state;
    const {
      _limit: propsLimit, _sort: propsSort, url, defaultQuery, searchBy, filterBy, fromTo
    } = this.props;
    const { _limit = propsLimit, _sort = defaultQuery._sort || propsSort } = this.urlQuery;

    const query = {
      _start: _limit * (page - 1),
      _limit: +_limit,
      _sort
    };

    if (search !== '') {
      query[`${searchBy}_contains`] = search;
    }
    if (filter !== '') {
      query[filterBy] = filter;
    }

    if (fromTo) {
      query.from = from;
      query.to = to;
    }

    this.props.getListData(url, useDefault ? { ...query, ...defaultQuery, _sort } : query);
  }

  sortByTitle = (name) => {
    const {
      _start, _limit, _sort, url, searchBy, filterBy
    } = this.props;
    const { search, filter } = this.state;
    const [sortName, sortType] = _sort.split(':');

    const newSort = sortName === name && sortType === 'asc' ? `${name}:desc` : `${name}:asc`;

    this.updateUrlQuery({ _sort: newSort });

    const query = {
      _start,
      _limit,
      _sort: newSort
    };

    if (search !== '') {
      query[`${searchBy}_contains`] = search;
    }

    if (filter !== '') {
      query[filterBy] = filter;
    }

    this.props.getListData(url, query);
  }

  updateSearch = (e) => {
    const searchValue = e.target.value;
    this.setState({
      search: searchValue
    }, () => {
      this.updateUrlQuery({ search: searchValue });
      this.fetchSearchData();
    });
  }

  updateFromPeriod = (data) => {
    this.setState({
      from: data
    }, () => {
      this.fetchFromToData();
    });
  }

  updateToPeriod = (data) => {
    this.setState({
      to: data
    }, () => {
      this.fetchFromToData();
    });
  }

  fetchFromToData = () => {
    const { from, to } = this.state;
    const { url } = this.props;

    this.updateUrlQuery({ page: '' });

    this.props.getListData(url, {
      from,
      to,
      _start: 0,
      _limit: 10
    });
  }

  updateFilter = (value) => {
    const filterValue = value;
    this.setState({
      filter: filterValue
    }, () => {
      this.updateUrlQuery({ filter: filterValue });
      this.fetchSearchData();
    });
  }

  fetchSearchData = () => {
    const { search, filter } = this.state;
    const { url, searchBy, filterBy } = this.props;

    if (search === '' && filter === '') {
      this.updatePageData();
    } else {
      const searchUrl = search ? { [`${searchBy}_contains`]: search } : null;
      const filterUrl = filter ? { [filterBy]: filter } : null;

      this.updateUrlQuery({ page: '' });

      this.props.getListData(url, {
        ...searchUrl,
        ...filterUrl,
        _start: 0
      });
    }
  }

  updateLimit = (limit) => {
    const validLimit = +limit || 10;
    const {
      _start, _sort, _limit, total, url, searchBy, filterBy, fromTo
    } = this.props;
    const {
      search, filter, from, to
    } = this.state;

    const prevMaxPage = Math.ceil(total / _limit);
    const newMaxPage = Math.ceil(total / validLimit);

    let guessedPage = 0;
    if (newMaxPage < prevMaxPage) {
      const currentPage = (_start / _limit) + 1;
      const currentPageFactor = currentPage / prevMaxPage;
      guessedPage = Math.round(newMaxPage * currentPageFactor) - 1;
    }

    this.updateUrlQuery({
      _limit: validLimit,
      page: guessedPage > 0 ? guessedPage + 1 : 1
    });

    const query = {
      _limit: validLimit,
      _start: guessedPage > 0 ? guessedPage * validLimit : 0,
      _sort
    };

    if (search !== '') {
      query[`${searchBy}_contains`] = search;
    }

    if (filter !== '') {
      query[filterBy] = filter;
    }

    if (fromTo) {
      query.from = from;
      query.to = to;
    }

    this.props.getListData(url, query);
  }

  openModal = () => {
    this.props.topPanelAction.showAddForm();
  }

  renderContent() {
    const {
      head, item, list, actions,
      _limit, _start, total, _sort,
      TopPanel, className, searchBy, topPanelAction, filterBy, filter, fromTo, preloader
    } = this.props;

    const shortList = list && list.length > 2 ? 'full-list' : null;

    return (
      <div className="m-portlet m-portlet--full-height m-portlet--tabs m-portlet-pb">
        <div className="m-portlet__head">
          <div className="m-form m-form--label-align-right m--margin-top-30 m--margin-bottom-30">
            <div className="row align-items-center">
              <div className="col-md-8 order-2 order-md-1">
                <div className="form-group m-form__group row align-items-center filter-block filter-label">
                  { searchBy &&
                    <div className="col-md-6">
                      <div className="m-input-icon m-input-icon--left">
                        <Input
                          placeholder={`Search by ${searchBy.replace('_', ' ')}`}
                          icon="la la-search"
                          value={this.state.search}
                          type="text"
                          className="searsh"
                          onChange={this.updateSearch}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  }
                  {filterBy &&
                    <div className="col-md-6">
                      <div className="m-input-icon m-input-icon--left filter-wrp">
                        <Select
                          value={this.state.filter}
                          options={filter}
                          type="filter"
                          className="filters"
                          onChange={this.updateFilter}
                        />
                      </div>
                    </div>
                  }
                  {fromTo &&
                    <Fragment>
                      <div className="col-md-6 from-to">
                        <div className="m-input-icon m-input-icon--left filter-wrp">
                          <InputPicker
                            placeholder={`Search by ${searchBy.replace('_', ' ')}`}
                            icon="la la-picker"
                            value={this.state.from}
                            type="text"
                            name="reportsFrom"
                            labelText="* From:"
                            className="searsh"
                            onChange={this.updateFromPeriod}
                            autoComplete="off"
                            maxDate={this.state.to}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 from-to">
                        <div className="m-input-icon m-input-icon--left filter-wrp">
                          <InputPicker
                            value={this.state.to}
                            type="text"
                            labelText="* To:"
                            className="searsh"
                            onChange={this.updateToPeriod}
                            autoComplete="off"
                            minDate={this.state.from}
                            maxDate={new Date()}
                          />
                        </div>
                      </div>
                    </Fragment>
                  }
                </div>
              </div>
              <TopPanel role={topPanelAction && topPanelAction.role} showModal={this.openModal} />
            </div>
          </div>
        </div>
        <div className="m-portlet__body">
          <div className={`m_datatable m-datatable m-datatable--default m-datatable--subtable  m-datatable--loaded ${shortList}`} id="local_data">
            <AwesomeList
              className={className}
              head={head}
              item={item}
              data={list}
              actions={actions}
              sortAction={this.sortByTitle}
              sort={_sort}
              preloader={preloader}
            />
            <div className="m-datatable__pager m-datatable--paging-loaded clearfix">
              <Pagination
                limit={_limit}
                skip={_start}
                total={total}
                onPage={this.onPage}
              />

              <NumberPerPage
                start={_start}
                limit={_limit}
                total={total}
                onChange={this.updateLimit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const listContent = this.renderContent();

    return this.props.tab ? (
      <div className="m-content">
        <div className="row">
          <div className="col-md-12">
            {listContent}
          </div>
        </div>
      </div>
    ) : listContent;
  }
}

ExtraAwesomeList.propTypes = {
  item: PropTypes.func, // item component
  head: PropTypes.func, // table head component
  TopPanel: PropTypes.func,
  url: PropTypes.string,
  defaultQuery: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func), // callbacks for item
  topPanelAction: PropTypes.instanceOf(Object),

  destroyOnUnmount: PropTypes.bool,
  tab: PropTypes.bool,
  searchBy: PropTypes.string,
  filterBy: PropTypes.string,
  fromTo: PropTypes.bool,

  getListData: PropTypes.func.isRequired,
  clearListData: PropTypes.func.isRequired,

  filter: PropTypes.arrayOf(PropTypes.object),
  preloader: PropTypes.bool,

  list: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
  _start: PropTypes.number,
  _limit: PropTypes.number,
  _sort: PropTypes.string
};

ExtraAwesomeList.defaultProps = {
  TopPanel() { return <Fragment />; },
  className: '',
  searchBy: '',
  filterBy: '',
  fromTo: false,
  defaultQuery: {},
  actions: {},
  destroyOnUnmount: true,
  tab: false,
  preloader: false,
  list: [],
  total: 0,
  _start: 0,
  _limit: 10,
  _sort: '',
  item() {},
  head() { return <Fragment />; },
  url: '',
  topPanelAction: {},
  filter: []
};

function mapStateToProps(state) {
  if (state.list_data) {
    const {
      list, total, _start, _limit, _sort, preloader
    } = state.list_data;

    return {
      list, total, _start, _limit, _sort, preloader
    };
  }
  return {};
}


export default connect(mapStateToProps, {
  getListData, clearListData
})(ExtraAwesomeList);
