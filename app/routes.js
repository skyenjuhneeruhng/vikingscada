import Dashboards from './containers/DashboardsPage';
import DashboardsList from './containers/DashboardsList';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Verify from './containers/Verify';
import Profile from './containers/ProfilePage';
import EditProfile from './containers/EditProfilePage';
// import Companies from './containers/CompaniesPage';
import NewCompaniesPage from './containers/NewCompaniesPage';
// import SitesPage from './containers/SitesPage';
import ManagersPage from './containers/ManagersPage';
import ViewersPage from './containers/ViewersPage';
import EditCompany from './containers/EditCompanyPage';
import NewBase from './containers/NewBasePage';
import ResetPassword from './containers/ResetPassword';

import GatewayList from './containers/GatewayList';
import DevicesList from './containers/DevicesList';
import SensorsList from './containers/SensorsList';
import EditSite from './containers/EditSitePage';

import TermsAndConditions from './containers/TermsAndConditionsPage';
import NotFound from './containers/NotFound';

import PurchasePage from './containers/PurchasePage';
import InvoicePage from './containers/InvoicePage';
import TransactionPage from './containers/TransactionPage';

import PlansList from './containers/PlansList';
import NotificationsList from './containers/NotificationsList';
import PaymentSuccess from './containers/PaymentSuccessPage';
import PaymentCancel from './containers/PaymentCancelPage';

import ReportsPage from './containers/ReportsPage';
import ConfirmMessagesPage from './containers/ConfirmMessagesPage';


import Base from './containers/Base';

const all = ['root', 'company', 'managers', 'viewers'];

const routes = [
  {
    path: '/dashboards/:id',
    exact: true,
    component: Base(DashboardsList, true)
  },
  {
    path: '/dashboard/:siteId-:dashboardId',
    exact: true,
    component: Base(Dashboards, true)
  },
  {
    path: '/gateways/:id',
    exact: true,
    component: Base(GatewayList, true, ['root', 'company', 'managers'])
  },
  {
    path: '/devices/:id',
    exact: true,
    component: Base(DevicesList, true, ['root', 'company', 'managers'])
  },
  {
    path: '/sensors/:id',
    exact: true,
    component: Base(SensorsList, true, ['root', 'company', 'managers'])
  },
  {
    path: '/login',
    exact: true,
    component: Base(SignIn, false)
  },
  {
    path: '/signup',
    exact: true,
    component: Base(SignUp, false)
  },
  {
    path: '/verify',
    exact: true,
    component: Base(Verify, false)
  },
  {
    path: '/reset-password',
    exact: true,
    component: Base(ResetPassword, false)
  },
  {
    path: '/reset-password/:id',
    exact: true,
    component: Base(ResetPassword, false)
  },
  {
    path: '/terms',
    exact: true,
    component: TermsAndConditions
  },
  {
    path: '/',
    exact: true,
    component: Base(Profile, true)
  },
  {
    path: '/settings',
    exact: true,
    component: Base(EditProfile, true)
  },
  {
    path: '/companies',
    exact: true,
    component: Base(NewCompaniesPage, true, ['root'])
  },
  {
    path: '/purchase',
    exact: true,
    component: Base(PurchasePage, true, ['company'])
  },
  {
    path: '/invoice/:id',
    exact: true,
    component: Base(InvoicePage, true, ['root', 'company'])
  },
  {
    path: '/transaction',
    exact: true,
    component: Base(TransactionPage, true, ['root', 'company'])
  },
  {
    path: '/plans',
    exact: true,
    component: Base(PlansList, true, ['root'])
  },
  {
    path: '/alarms',
    exact: true,
    component: Base(NotificationsList, true, ['company'])
  },
  {
    path: '/payment/success',
    exact: true,
    component: Base(PaymentSuccess, true, ['company'])
  },
  {
    path: '/payment/cancel',
    exact: true,
    component: Base(PaymentCancel, true, ['company'])
  },
  // {
  //   path: '/sites',
  //   exact: true,
  //   component: Base(SitesPage, true, ['root'])
  // },
  {
    path: '/managers',
    exact: true,
    component: Base(ManagersPage, true, ['root'])
  },
  {
    path: '/viewers',
    exact: true,
    component: Base(ViewersPage, true, ['root'])
  },
  {
    path: '/company/:id/:tab(details|admin|sites|managers|viewers)',
    exact: true,
    component: Base(EditCompany, true, ['root'])
  },
  {
    path: '/company/:tab(details|sites|managers|viewers)',
    exact: true,
    component: Base(EditCompany, true, ['company', 'managers', 'viewers'])
  },
  {
    path: '/new-company',
    exact: true,
    component: Base(NewBase('company', false), true, ['root', 'managers'])
  },
  {
    path: '/new-site',
    exact: true,
    component: Base(NewBase('site', false), true, ['root', 'company'])
  },
  {
    path: '/new-site/:id',
    exact: true,
    component: Base(NewBase('site', false), true, ['root'])
  },
  {
    path: '/site/:id',
    exact: true,
    component: Base(EditSite, true, all)
  },
  {
    path: '/new-manager',
    exact: true,
    component: Base(NewBase('managers', false), true, ['root', 'company'])
  },
  {
    path: '/new-manager/:id',
    exact: true,
    component: Base(NewBase('managers', false), true, ['root'])
  },
  {
    path: '/manager/:id',
    exact: true,
    component: Base(NewBase('managers', true), true, all)
  },
  {
    path: '/new-viewer',
    exact: true,
    component: Base(NewBase('viewers', false), true, ['root', 'company', 'managers'])
  },
  {
    path: '/new-viewer/:id',
    exact: true,
    component: Base(NewBase('viewers', false), true, ['root'])
  },
  {
    path: '/viewer/:id',
    exact: true,
    component: Base(NewBase('viewers', true), true, all)
  },
  {
    path: '/reports',
    exact: true,
    component: Base(ReportsPage, true)
  },
  {
    path: '/:type/confirm/:id',
    exact: true,
    component: Base(ConfirmMessagesPage, true)
  },
  {
    component: NotFound
  }
];

export default routes;
