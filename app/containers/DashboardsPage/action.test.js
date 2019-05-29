import { getDashboard, receiveDashboard, cancelDashboard,
        cleanLayout, addWidget, removeWidget, updateWidget,
        updateLayout, lockLayout, saveDashboardSuccess } from './actions'

describe('>>>A C T I O N --- Test Dashboard', ()=> {
    it('+++ action getDashboard', () => {
        const url = 'dashboard';
        const get = getDashboard(url);
        expect(get).toEqual({ type: 'GET_ONE_DASHBOARD', 'payload': {'url': url}})
    });

    it('+++ action receiveDashboard', () => {
      const data = {};
      const receive = receiveDashboard(data);
      expect(receive).toEqual({ type: 'ONE_DASHBOARD_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action cancelDashboard', () => {
      const message = 'Success!';
      const cancel = cancelDashboard(message);
      expect(cancel).toEqual({ type: 'ONE_DASHBOARD_CANCELED', 'payload': {'message': message}})
    });

    it('+++ action cleanLayout', () => {
      const clea = cleanLayout();
      expect(clea).toEqual({ type: 'CLEAN_LAYOUT'})
    });

    it('+++ action addWidget', () => {
      const data = {name: 'New widget'};
      const add = addWidget(data);
      expect(add).toEqual({ type: 'ADD_ITEM', 'payload': {'data': data}})
    });

    it('+++ action removeWidget', () => {
      const ind = 'ind';
      const remove = removeWidget(ind);
      expect(remove).toEqual({ type: 'REMOVE_ITEM', 'payload': {'ind': ind}})
    });

    it('+++ action updateWidget', () => {
      const data = {};
      const ind = 'ind';
      const update = updateWidget(ind, data);
      expect(update).toEqual({ type: 'UPDATE_WIDGET', 'payload': {'ind': ind, 'data': data}})
    });

    it('+++ action updateLayout', () => {
      const layouts = {};
      const updateLay = updateLayout(layouts);
      expect(updateLay).toEqual({ type: 'UPDATE_LAYOUT', 'payload': {'layouts': layouts}})
    });

    it('+++ action lockLayout', () => {
      const url = 'dashboard';
      const data = {};
      const lock = {};
      const lockLay = lockLayout(lock, url, data);
      expect(lockLay).toEqual({ type: 'LOCK', 'payload': {'lock': lock, 'url': url, 'data': data}})
    });

    it('+++ action saveDashboardSuccess', () => {
      const message = 'Success!';
      const type = '';
      const save = saveDashboardSuccess(message, type);
      expect(save).toEqual({ type: 'SAVE_DASHBOARD_SUCCESS', 'payload': {'message': message, 'type': type}})
    });
});