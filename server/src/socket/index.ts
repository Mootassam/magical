import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import { getConfig } from "../config";
import { databaseInit } from "../database/databaseConnection";
import UserRepository from "../database/repositories/userRepository";
import TenantRepository from "../database/repositories/tenantRepository";

let io: SocketIOServer | null = null;

function tenantRoom(tenantId) {
  return `tenant:${tenantId}`;
}

export function initSocket(httpServer: HttpServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const { token, tenantId } = socket.handshake.auth || {};

      if (!token || !tenantId) {
        next(new Error("unauthorized"));
        return;
      }

      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(token, getConfig().AUTH_JWT_SECRET, (err, payload) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(payload);
        });
      });

      const database = await databaseInit();

      const [user, tenant] = await Promise.all([
        UserRepository.findById(decoded.id, {
          database,
          bypassPermissionValidation: true,
        } as any),
        TenantRepository.findById(tenantId, { database } as any),
      ]);

      if (!user || !tenant) {
        next(new Error("unauthorized"));
        return;
      }

      socket.data.userId = user.id;
      socket.data.tenantId = tenant.id;

      next();
    } catch (error) {
      next(new Error("unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(tenantRoom(socket.data.tenantId));

    socket.on("disconnect", () => {
      // no-op - socket.io cleans up room membership automatically
    });
  });

  return io;
}

export function getIO() {
  return io;
}

export function emitToTenant(tenantId, event, payload) {
  if (!io) {
    return;
  }

  io.to(tenantRoom(tenantId)).emit(event, payload);
}
