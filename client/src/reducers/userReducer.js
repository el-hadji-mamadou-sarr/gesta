import {createSlice} from "@reduxjs/toolkit";

const userInitialSate={
    fullname:"",
    email:"",
    profile_picture:"",
    user:"",
    isLogged:false
}
export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialSate,
    reducers:{

        loginUser : (state, action)=>{
            state.isLogged = true;
        },

    }

});

export const {loginUser, logout} = userSlice.actions;
export default userSlice.reducer;