import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  account: {"_id":"",
    "username":"",
    "password":"",
    "role":"USER",
    "__v":0},
  logged_in: false 
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
        state.account = action.payload;
        console.log("Set account.");
        console.log(action.payload);
        console.log(state.account);
  },
  setLoggedIn: (state, action) => {
    state.logged_in = action.payload;
    console.log("Set logged in/logged out.")
    console.log(state.logged_in);
  }
  },
});

export const { setAccount, setLoggedIn } = accountSlice.actions;
export default accountSlice.reducer;