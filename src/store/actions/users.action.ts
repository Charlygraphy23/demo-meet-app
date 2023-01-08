import { createAction } from "@reduxjs/toolkit";
import { ActiveUserType } from "../reducers/user.reducer";

export const addUser = createAction<ActiveUserType>('ADD_USER')