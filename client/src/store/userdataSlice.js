import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const userdataSlice = createSlice({
  name: "userdata",
  initialState: {
    data: null,
    loading: true,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLogout: (state, action) => {
      state.data = null;
      state.loading = false;
    },
  },
});

export const getUserData = () => {
  return axios.get(`/api/userdata/get-userdata`).then((response) => {
    if (response.data.isSuccess) {
      return response.data.userdata;
    }
  });
};

export const { setUserData, setLogout } = userdataSlice.actions;
export default userdataSlice.reducer;
