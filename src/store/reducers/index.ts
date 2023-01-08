import { combineReducers } from "redux";
import { SocketReducer } from './socket.reducer'
import { UserReducer } from './user.reducer'


export default combineReducers({
    SocketReducer,
    UserReducer
})