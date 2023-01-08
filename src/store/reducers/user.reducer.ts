import { createReducer } from "@reduxjs/toolkit"
import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { addSocketAction, addUser } from "../actions"

export type ActiveUserType = {
    ownId : boolean,
    id : string
}

type InitialStateType = {
    activeUsers : ActiveUserType[]
}
const initialState : InitialStateType = {
    activeUsers : []
}

export const UserReducer = createReducer(initialState , (builder) => {

    builder.addCase(addUser , (state , action) => {
        state.activeUsers = [...state.activeUsers , action.payload]
        return state

    })

})