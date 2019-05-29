import { getDevicesList, receiveDevicesList, cancelDevicesList,
        clearDevicesList, addDevice, receiveNewDevice, deleteDevice,
        receiveDeleteDevice, editDevice, receiveEditDevice } from './actions'

describe('>>>A C T I O N --- Test DevicesList', ()=> {
    it('+++ action getDevicesList', () => {
        const url = 'Device';
        const query = {};
        const getDevices = getDevicesList(url, query);
        expect(getDevices).toEqual({ type: 'GET_DEVICES_LIST', 'payload': {'query': query, 'url': url}})
    });

    it('+++ action receiveDevicesList', () => {
      const data = {};
      const receiveDevices = receiveDevicesList(data);
      expect(receiveDevices).toEqual({ type: 'DEVICES_LIST_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action cancelDevicesList', () => {
      const message = 'Success!';
      const cancelDevices = cancelDevicesList(message);
      expect(cancelDevices).toEqual({ type: 'DEVICES_LIST_CANCELED', 'payload': {'message': message}})
    });

    it('+++ action cancelDevicesList', () => {
      const clearDevices = clearDevicesList();
      expect(clearDevices).toEqual({ type: 'CLEAR_DEVICES_LIST'})
    });

    it('+++ action addDevice', () => {
      const url = 'Device';
      const data = {name: 'New Device'};
      const add = addDevice(url, data);
      expect(add).toEqual({ type: 'ADD_NEW_DEVICE', 'payload': {'data': data, 'url': url}})
    });

    it('+++ action receiveNewDevice', () => {
      const data = {name: 'New Device'};
      const reciveNew = receiveNewDevice(data);
      expect(reciveNew).toEqual({ type: 'NEW_DEVICE_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action deleteDevice', () => {
      const url = 'Device';
      const id = 'DeviceId';
      const del = deleteDevice(url, id);
      expect(del).toEqual({ type: 'DELETE_DEVICE', 'payload': {'url': url, 'id': id}})
    });

    it('+++ action receiveDeleteDevice', () => {
      const id = 'DeviceId';
      const receiveDel = receiveDeleteDevice(id);
      expect(receiveDel).toEqual({ type: 'DELETE_DEVICE_RECEIVED', 'payload': {'id': id}})
    });

    it('+++ action editDevice', () => {
      const url = 'Device';
      const id = 'DeviceId';
      const data = {name: 'New Device'};
      const edit = editDevice(url, id, data);
      expect(edit).toEqual({ type: 'EDIT_DEVICE', 'payload': {'url': url, 'id': id, 'data': data}})
    });

    it('+++ action receiveEditDevice', () => {
      const id = 'DeviceId';
      const data = {name: 'New Device'};
      const receiveEdit = receiveEditDevice(id, data);
      expect(receiveEdit).toEqual({ type: 'EDIT_DEVICE_RECEIVED', 'payload': {'id': id, 'data': data}})
    });
});