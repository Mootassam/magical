import { io, Socket } from 'socket.io-client';
import config from 'src/config';
import { AuthToken } from 'src/modules/auth/authToken';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const socketBaseUrl = config.backendUrl.replace(/\/api\/?$/, '');

let socket: Socket | null = null;

// A single shared socket connection for the whole admin app - callers
// subscribe/unsubscribe to events on it rather than each opening their own
// connection.
function getSocket(): Socket | null {
  const token = AuthToken.get();
  const tenantId = AuthCurrentTenant.get();

  if (!token || !tenantId) {
    return null;
  }

  if (socket && socket.connected) {
    return socket;
  }

  if (!socket) {
    socket = io(socketBaseUrl, {
      auth: { token, tenantId },
      autoConnect: true,
      reconnection: true,
      transports: ['websocket', 'polling'],
    });
  } else if (!socket.connected) {
    // Auth may have changed (re-login, tenant switch) since the socket was
    // first created - refresh the handshake payload before reconnecting.
    (socket.auth as any) = { token, tenantId };
    socket.connect();
  }

  return socket;
}

function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export default {
  getSocket,
  disconnectSocket,
};
