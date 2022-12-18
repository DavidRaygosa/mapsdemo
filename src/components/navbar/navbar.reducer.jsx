import { createSlice } from '@reduxjs/toolkit'

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
      component: '',
    },
    reducers: {
      changeComponent: (state, action) => {
        state.component = action.payload
      },
    }
  });
  
  // EXPORT ATTRIBUTES
  export const component = (state) => state.navbar.component;
  
  // EXPORT REDUX
  export const { changeComponent } = navbarSlice.actions;
  export default navbarSlice.reducer;