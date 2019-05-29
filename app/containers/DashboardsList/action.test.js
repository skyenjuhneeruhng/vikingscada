import { getDashboardsList, receiveDashboardsList, cancelDashboardsList,
        clearDashboardsList, addDashboard, receiveNewDashboard, deleteDashboard,
        receiveDeleteDashboard, editDashboard, receiveEditDashboard } from './actions'

describe('>>>A C T I O N --- Test DashboardsList', ()=> {
    it('+++ action getDashboardsList', () => {
        const url = 'dashboard';
        const query = {};
        const getDashboards = getDashboardsList(url, query);
        expect(getDashboards).toEqual({ type: 'GET_DASHBOARDS_LIST', 'payload': {'query': query, 'url': url}})
    });

    it('+++ action receiveDashboardsList', () => {
      const data = {};
      const receiveDashboards = receiveDashboardsList(data);
      expect(receiveDashboards).toEqual({ type: 'DASHBOARDS_LIST_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action cancelDashboardsList', () => {
      const message = 'Success!';
      const cancelDashboards = cancelDashboardsList(message);
      expect(cancelDashboards).toEqual({ type: 'DASHBOARDS_LIST_CANCELED', 'payload': {'message': message}})
    });

    it('+++ action cancelDashboardsList', () => {
      const clearDashboards = clearDashboardsList();
      expect(clearDashboards).toEqual({ type: 'CLEAR_DASHBOARDS_LIST'})
    });

    it('+++ action addDashboard', () => {
      const url = 'dashboard';
      const data = {name: 'New dashboard'};
      const add = addDashboard(url, data);
      expect(add).toEqual({ type: 'ADD_NEW_DASHBOARD', 'payload': {'data': data, 'url': url}})
    });

    it('+++ action receiveNewDashboard', () => {
      const data = {name: 'New dashboard'};
      const reciveNew = receiveNewDashboard(data);
      expect(reciveNew).toEqual({ type: 'NEW_DASHBOARD_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action deleteDashboard', () => {
      const url = 'dashboard';
      const id = 'dashboardId';
      const del = deleteDashboard(url, id);
      expect(del).toEqual({ type: 'DELETE_DASHBOARD', 'payload': {'url': url, 'id': id}})
    });

    it('+++ action receiveDeleteDashboard', () => {
      const id = 'dashboardId';
      const receiveDel = receiveDeleteDashboard(id);
      expect(receiveDel).toEqual({ type: 'DELETE_DASHBOARD_RECEIVED', 'payload': {'id': id}})
    });

    it('+++ action editDashboard', () => {
      const url = 'dashboard';
      const id = 'dashboardId';
      const data = {name: 'New dashboard'};
      const edit = editDashboard(url, id, data);
      expect(edit).toEqual({ type: 'EDIT_DASHBOARD', 'payload': {'url': url, 'id': id, 'data': data}})
    });

    it('+++ action receiveEditDashboard', () => {
      const id = 'dashboardId';
      const data = {name: 'New dashboard'};
      const receiveEdit = receiveEditDashboard(id, data);
      expect(receiveEdit).toEqual({ type: 'EDIT_DASHBOARD_RECEIVED', 'payload': {'id': id, 'data': data}})
    });
});