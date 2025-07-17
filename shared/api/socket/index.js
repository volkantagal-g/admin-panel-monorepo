import io from 'socket.io-client';
import { isEmpty } from 'lodash';

import { getUser, getToken, getAccessToken } from '../../redux/selectors/auth';
import { getSelectedCountry } from '../../redux/selectors/countrySelection';
import { ENVIRONMENT } from '../../config';
import { SOCKET_EVENT, getRoomOfAnEvent, getRoomFromRoomName, SOCKET_ROOM } from './constants';

const ioSocket = () => {
  const selectedCountry = getSelectedCountry();
  const user = getUser();
  const accessToken = getAccessToken();
  const token = getToken();

  if (isEmpty(user) || isEmpty(selectedCountry) || (!accessToken && !token)) {
    throw new Error('Missing user/token/country info');
  }

  return io(ENVIRONMENT.REACT_APP_API_GATEWAY_URI, {
    path: '/socket.io-client',
    transports: ['websocket'],
    query: {
      user: user._id,
      token, // potentially security issue, will be removed after fully JWT implementation
      authorization: `Bearer ${accessToken}`,
      country: selectedCountry._id,
    },
  });
};

class SocketHandler {
  constructor() {
    this.socketInstance = null;
    this.joinedRoomNameToListenerCountMap = {};
    this.isConnecting = false;
    this.isReconnecting = false;
    this.connectionPromise = null;
    this.connectCb = null;
    this.disconnectCb = null;
  }

  async connect() {
    if (this.isConnected()) return;
    if (this.isConnecting) {
      await this.connectionPromise;
      return;
    }

    if (this.socketInstance) {
      await this.getCleanConnectionPromise();
      return;
    }
    this.socketInstance = ioSocket();
    await this.getCleanConnectionPromise();
  }

  getCleanConnectionPromise() {
    this.isConnecting = true;
    if (this.connectCb) {
      // clean up previous connect listener
      this.socketInstance.off(SOCKET_EVENT.CONNECT, this.connectCb);
      this.socketInstance.off(SOCKET_EVENT.DISCONNECT, this.disconnectCb);
    }

    // socket-io tries to reconnect on failure infinitely, nothing to reject
    this.connectionPromise = new Promise(res => {
      this.disconnectCb = () => {
        if (!this.isReconnecting) {
          this.socketInstance.connect();
          this.isReconnecting = true;
        }
      };
      this.socketInstance.on(SOCKET_EVENT.DISCONNECT, this.disconnectCb);

      this.connectCb = () => {
        this.isConnecting = false;
        this.rejoinRooms();
        this.isReconnecting = false;
        res();
      };
      this.socketInstance.on(SOCKET_EVENT.CONNECT, this.connectCb);
    });

    return this.connectionPromise;
  }

  isConnected() {
    return !!this.socketInstance?.connected;
  }

  subscribe({ eventName, cb, extraArgs }) {
    const room = getRoomOfAnEvent(eventName);
    this.joinRoom({ room, extraArgs });
    this.socketInstance.on(eventName, cb);
  }

  unsubscribe({ eventName, cb }) {
    this.socketInstance.off(eventName, cb);
    const room = getRoomOfAnEvent(eventName);
    this.leaveRoom({ room });
  }

  joinRoom({ room, isRejoin, extraArgs }) {
    if (room === SOCKET_ROOM.defaultRoom) return;

    if (!isRejoin) {
      if (this.joinedRoomNameToListenerCountMap[room.name]) {
        this.joinedRoomNameToListenerCountMap[room.name] += 1;
        return;
      }
      this.joinedRoomNameToListenerCountMap[room.name] = 1;
    }

    const country = getSelectedCountry()._id;
    this.socketInstance.emit(room.joinEventName, { country, ...extraArgs });
  }

  leaveRoom({ room, extraArgs }) {
    if (room === SOCKET_ROOM.defaultRoom) return;
    this.joinedRoomNameToListenerCountMap[room.name] -= 1;

    if (this.shouldLeaveRoom(room)) {
      this.socketInstance.emit(room.leaveEventName, { ...extraArgs });
    }
  }

  shouldLeaveRoom(room) {
    // nothing listened from the room, we should leave
    return this.joinedRoomNameToListenerCountMap[room.name] === 0;
  }

  rejoinRooms() {
    Object.entries(this.joinedRoomNameToListenerCountMap).forEach(([roomName, listenerCount]) => {
      if (listenerCount > 0) {
        this.joinRoom({ room: getRoomFromRoomName(roomName), isRejoin: true });
      }
    });
  }
}

export const socketHandler = new SocketHandler();
