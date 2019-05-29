import socket from './socket';

const MAX_DATA_LEN = 20;

const data = {};

let connectTraffic = false;

socket.on(
  'disconnect',
  () => {
    console.warn('Disconnected!');
    if (!connectTraffic) {
      socket.close();
    }
  }
);

const receiveNewData = function(id, newData) {
  const sensorData = data[id];
  const len = sensorData.push(newData);

  if (len > MAX_DATA_LEN) {
    sensorData.shift();
  }
};

const listenSensor = function(id, listener) {
  if (socket.disconnected) {
    socket.open();
  }

  data[id] = [];
  console.log(`%c Start listening socket -> id: ${id}.`, 'background: #0f0; color: #000');

  socket.on(id, (newData) => {
    console.log(`%c Receive new data -> id: ${id}; data: ${newData}`, 'background: #000; color: #fff');
    receiveNewData(id, newData);
    listener(data);
  });
};

const listenTrafic = function(id, listener) {
  connectTraffic = true;
  if (socket.disconnected) {
    socket.open();
  }

  socket.on(id, (newData) => {
    listener(newData);
  });
};

const stopListening = function(id) {
  connectTraffic = false;
  socket.close();
  socket.removeAllListeners(id);
  console.log(`%c Stop listening socket -> id: ${id}.`, 'background: #f00; color: #000');

  data[id] = undefined;
};

const convertToXY = function(cdata) {
  return cdata.reduce((prev, cur, i) => ([
    ...prev,
    { x: i, y: cur }
  ]), []);
};

const convertToPosValue = function(cdata) {
  return cdata.reduce((prev, cur, i) => ([
    ...prev,
    { pos: i, value: cur }
  ]), []);
};

const convertToPercent = function(x, a, b) {
  const per = (x - a) / (b - a);

  if (per < 0) {
    return 0;
  } else if (per > 1) {
    return Math.round(100);
  }

  return Math.round(per * 100);
};

export {
  listenSensor,
  listenTrafic,
  stopListening,
  socket,

  convertToXY,
  convertToPosValue,
  convertToPercent
};
