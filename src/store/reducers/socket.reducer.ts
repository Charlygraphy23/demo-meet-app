import { createReducer } from "@reduxjs/toolkit"
import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { addSocketAction } from "../actions"

type InitialStateType = {
    socket : Socket<DefaultEventsMap, DefaultEventsMap> | null
}
const initialState : InitialStateType = {
    socket : null
}

export const SocketReducer = createReducer(initialState , (builder) => {

    builder.addCase(addSocketAction , (state , action) => {
        // @ts-expect-error
        state.socket = action.payload
        return state

    })

})