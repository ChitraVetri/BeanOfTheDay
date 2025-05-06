import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const cartsSlice = createSlice({
    name: "carts",
    initialState: {
        productData: [],
        count: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const { Id, Name, Cost, ImageUrl, quantity = 1 } = action.payload;
            const existingItem = state.productData.find(item => item.Id === Id);
            if (existingItem) {
                existingItem.product_quantity += quantity;
            } else {
                state.productData.push({
                    Id,
                    Name,
                    Cost,
                    ImageUrl,
                    product_quantity: quantity,
                });
            }
            state.count += quantity;
        },
        removeFromCart: (state, action) => {
            const idToRemove = action.payload;
            const itemToRemove = state.productData.find(item => item.Id === idToRemove);

            if (itemToRemove) {
                state.count -= itemToRemove.product_quantity;
            }

            state.productData = state.productData.filter(item => item.Id !== idToRemove);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.productData.find((item) => item.Id === id);

            if (item) {
                // Only update the quantity if it will not result in a non-positive value
                const newQuantity = item.product_quantity + quantity;
                if (newQuantity > 0) {
                    item.product_quantity = newQuantity;
                    // Update total count
                    state.count += quantity;
                }
            }
        },
        updateCartCount: (state, action) => {
            state.count = action.payload || 0;
        },
        setCartItems: (state, action) => {
            state.productData = action.payload;
            state.count = action.payload.reduce((total, item) => total + item.bean_quantity, 0);
        }
    }
})

export const fetchCartItemsFromAPI = (user) => async (dispatch) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/getcartdetails`, {
            params: { user }
        });
        dispatch(setCartItems(res.data));
    } catch (err) {
        console.error("Failed to fetch cart items:", err);
    }
};

export const { addToCart, removeFromCart,updateQuantity, updateCartCount,setCartItems } = cartsSlice.actions

export default cartsSlice.reducer;