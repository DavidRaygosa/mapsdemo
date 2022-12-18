import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from '../components/navbar/navbar.reducer';

export default configureStore({
  reducer: {
    "navbar": navbarReducer
  }
});