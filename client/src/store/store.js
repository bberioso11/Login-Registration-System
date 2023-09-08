import { configureStore } from "@reduxjs/toolkit";
import userdataSlice from "./userdataSlice";

export default configureStore({
  reducer: {
    userdata: userdataSlice,
  },
});
