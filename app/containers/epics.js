import { combineEpics } from 'redux-observable';

import notificationsEpic from './NotificationGenerator/epic';
import signUpEpic from './SignUp/epic';
import signInEpic from './SignIn/epic';
import verifyEpic from './Verify/epic';
import dashboardsEpic from './DashboardsList/epic';
import dashboardEpic from './DashboardsPage/epic';
import viewCompany from './EditCompanyPage/epic';
import companiesEpic from './CompaniesPage/epic';
import listDataEpic from './ExtraAwesomeList/epic';
import profileEpic from './ProfilePage/epic';
import resetPasswordEpic from './ResetPassword/epic';
import addNew from './NewBasePage/epic';
import entities from '../components/FormRenderers/InputAutoComplete/epic';
import gatewaysEpic from './GatewayList/epic';
import devicesEpic from './DevicesList/epic';
import sensorsEpic from './SensorsList/epic';
import plansEpic from './PlansList/epic';
import paymentsEpic from './PurchasePage/epic';
import transactionsEpic from './TransactionPage/epic';
import trafficEpic from '../components/Header/epic';
import reportEpic from './ReportsPage/epic';
import invoiceEpic from './InvoicePage/epic';
import statisticEpic from '../components/charts/LiveStatistic/epic';
import barStatisticEpic from '../components/charts/StackedBar/epic';
import userNotificationsEpic from './NotificationsList/epic';
import confirmMessagesEpic from './ConfirmMessagesPage/epic';

export default combineEpics(
  notificationsEpic,
  signUpEpic,
  signInEpic,
  verifyEpic,
  dashboardsEpic,
  dashboardEpic,
  viewCompany,
  companiesEpic,
  listDataEpic,
  profileEpic,
  resetPasswordEpic,
  addNew,
  entities,
  gatewaysEpic,
  devicesEpic,
  sensorsEpic,
  plansEpic,
  paymentsEpic,
  transactionsEpic,
  trafficEpic,
  reportEpic,
  statisticEpic,
  barStatisticEpic,
  invoiceEpic,
  userNotificationsEpic,
  confirmMessagesEpic
);
