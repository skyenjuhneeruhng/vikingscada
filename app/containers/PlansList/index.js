import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { confirm } from '../../components/Modal/util/confirm';

// import { getCompany } from './../../api_helper';

import Breadcrumbs from '../../components/Breadcrumbs';

import PlanItem from './components/PlanItem';
import PlanHead from './components/PlanHead';

import TopPanel from './components/TopPanel';

import AddPlanForm from './addPlanForm';
import EditPlanForm from './editPlanForm';
import { changeDefaultIndex } from '../EditCompanyPage/actions';

import ExtraAwesomeList from './../ExtraAwesomeList';

import { getPlansList, addPlan, editPlan, deletePlan } from './actions';
import { getEntityById } from '../NewBasePage/actions';

class PlansList extends Component {
  constructor(props) {
    super(props);

    this.url = 'plan';

    this.actions = {
      edit: this.editPlan,
      // openPlan: this.openPlan,
      deleteItem: this.deletePlan
    };

    this.state = {
      showAddPlan: false,
      showEditPlan: false,
      editing: {}
    };
  }

  componentDidMount() {
    this.props.getPlansList(
      this.url,
      {}
    );
  }

  onAddPlan = (values) => {
    this.hideAddForm();
    const newValues = values;
    const { price } = values;
    newValues.price = +price * 100;
    this.props.addPlan(
      this.url,
      newValues
    );
  }

  onEditPlan = (values) => {
    const { id } = this.state.editing;
    const newValues = values;
    const { price } = values;
    newValues.price = +price * 100;
    this.setState({
      showEditPlan: false,
      editing: {}
    }, () => this.props.editPlan(this.url, id, newValues));
  }

  editPlan = (id) => {
    const plan = this.props.plans.filter((item) => item.id === id)[0];
    this.setState({
      showEditPlan: true,
      editing: {
        name: plan.name,
        desc: plan.desc,
        mb: plan.mb,
        price: plan.price / 100,
        site: id,
        id
      }
    });
  }

  // openDashboard = (id) => {
  //   this.props.push(`/dashboard/${this.props.match.params.id}-${id}`);
  //   this.props.changeDefaultIndex(1);
  // }

  deletePlan = (id) => {
    confirm('Are you sure, that you want to delete this Plan?').then(() => {
      this.props.deletePlan(this.url, id);
    }, () => {
    });
  }

  showAddForm = () => {
    this.setState({
      showAddPlan: true
    });
  }

  hideAddForm = () => {
    this.setState({
      showAddPlan: false
    });
  }

  hideEditForm = () => {
    this.setState({
      showEditPlan: false,
      editing: {}
    });
  }

  returnLink() {
    const {
      profile
    } = this.props;
    if (profile) {
      return [{
        label: 'Plans',
        link: 'plans'
      }];
    }
    return [];
  }

  render() {
    const currentEntity = 'Plans';
    const { site_manager } = this.props.profile;
    const type = this.props.profile && this.props.profile.role && this.props.profile.role.type;

    const topPanelAction = {
      role: (type === 'company' || (type === 'managers' && this.props.match.params.id === (site_manager && site_manager._id))),
      showAddForm: this.showAddForm
    };
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title">
                {currentEntity}
              </h3>
              <Breadcrumbs current={currentEntity} />
            </div>
          </div>
        </div>

        <div className="m-content">
          <div className="row">
            <div className="col-md-12">
              <div className="m-portlet m-portlet--full-height m-portlet--tabs m-portlet-pb sensors-body">
                <div className="m-portlet__head">
                  <div className="m-portlet__head-caption">
                    <br />
                    <ul className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--primary">
                      <li className="nav-item m-tabs__item react-tabs__tab--selected">Plans</li>
                    </ul>
                  </div>
                </div>
                <ExtraAwesomeList
                  className="plans-list"
                  item={PlanItem}
                  head={PlanHead}
                  actions={this.actions}
                  url={this.url}
                  defaultQuery={{ _sort: 'name:asc' }}
                  TopPanel={TopPanel}
                  topPanelAction={topPanelAction}
                  searchBy="name"
                  tab
                />
              </div>
            </div>
          </div>
        </div>

        <AddPlanForm
          show={this.state.showAddPlan}
          onSubmit={this.onAddPlan}
          hide={this.hideAddForm}
          notRoot={this.props.plans && this.props.plans.length < 3}
        />

        <EditPlanForm
          show={this.state.showEditPlan}
          onSubmit={this.onEditPlan}
          hide={this.hideEditForm}
          data={this.state.editing}
        />
      </div>
    );
  }
}

PlansList.propTypes = {
  plans: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  addPlan: PropTypes.func,
  editPlan: PropTypes.func,
  deletePlan: PropTypes.func,
  getPlansList: PropTypes.func
};

PlansList.defaultProps = {
  plans: {},
  profile: {},
  match: {},
  addPlan: () => {},
  editPlan: () => {},
  deletePlan: () => {},
  getPlansList: () => {}

};

function mapStateToProps(state) {
  return {
    plans: state.plans && state.plans.list,
    site: state.sites
  };
}

export default connect(mapStateToProps, {
  push, getPlansList, addPlan, editPlan, deletePlan, changeDefaultIndex, getEntityById
})(PlansList);
