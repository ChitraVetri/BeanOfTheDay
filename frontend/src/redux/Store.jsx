
import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from './Slice';

const customStore = configureStore({
    reducer:{
        carts:cartsReducer
    }
})

export default customStore;