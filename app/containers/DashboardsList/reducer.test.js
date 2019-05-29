import DashboardsReducers from './reducer'
describe('>>>R E D U C E R --- Test DashboardsList',()=>{
    it('+++ reducer for DashboardListReceived', () => {
        let state = { list: [] }
        state = DashboardsReducers(state, { type: 'EDIT_DASHBOARD_RECEIVED', list: []})
        expect(state).toEqual({ list: [] })
    });
    
});