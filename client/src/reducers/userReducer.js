import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getIsLogged } from "../api/auth";

const userInitialSate={
    fullname:"",
    email:"",
    profile_picture:"",
    user:"",
    isLoading :false,
    isLogged:false
}

export const IsUserLogged = createAsyncThunk(
    '/users/isLogged',
    ()=>{
        return getIsLogged();
        
    }
)
export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialSate,
    reducers:{

        loginUser : (state, action)=>{
            state.isLogged = true;
        },
        logoutUser : (state,action)=>{
            state.isLogged = false;
        }
    },
     extraReducers:(builder)=>{

            builder.addCase(IsUserLogged.pending, (state)=>{
                state.isLoading = true;
            })
            builder.addCase(IsUserLogged.fulfilled, (state, action)=>{
                state.isLogged = action.payload.isLogged;
                state.isLoading = false;
            })

            builder.addCase(IsUserLogged.rejected, (state)=>{
                state.isLoading = false;
            })
        }

});

export const {loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;