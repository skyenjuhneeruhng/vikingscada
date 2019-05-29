import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import widgets from './DashboardsPage/reducer';
import dashboards from './DashboardsList/reducer';
import sidebar from './../components/Sidebar/reducer';
import notifiactions from './NotificationGenerator/reducer';
import token from './SignIn/reducer';
import profile from './ProfilePage/reducer';
import company from './EditCompanyPage/reducer';
import companies from './CompaniesPage/reducer';
import list_data from './ExtraAwesomeList/reducer';
import sites from './NewBasePage/reducer';
import waitingApprove from './ProfilePage/reducer-waiting-approve';
import entities from '../components/FormRenderers/InputAutoComplete/reducer';
import gateways from './GatewayList/reducer';
import devices from './DevicesList/reducer';
import sensors from './SensorsList/reducer';
import plans from './PlansList/reducer';
import payments from './PurchasePage/reducer';
import transaction from './TransactionPage/reducer';
import traffic from '../components/Header/reducer';
import reports from './ReportsPage/reducer';
import invoice from './InvoicePage/reducer';
import statistic from './../components/charts/LiveStatistic/reducer';
import barStatistic from './../components/charts/StackedBar/reducer';
import notifications from './NotificationsList/reducer';
import confirmMessages from './ConfirmMessagesPage/reducer';
import redirect from './Base/reducer';

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  notifiactions,
  widgets,
  dashboards,
  sidebar,
  token,
  profile,
  company,
  companies,
  list_data,
  waitingApprove,
  sites,
  entities,
  gateways,
  devices,
  sensors,
  plans,
  payments,
  transaction,
  traffic,
  reports,
  statistic,
  barStatistic,
  invoice,
  notifications,
  confirmMessages,
  redirect
});
