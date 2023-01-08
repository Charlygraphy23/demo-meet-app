import { createAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const addSocketAction = createAction<Socket<DefaultEventsMap, DefaultEventsMap>>("ADD_SOCKET")
