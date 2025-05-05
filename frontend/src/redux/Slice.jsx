import { createSlice } from "@reduxjs/toolkit";

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

        updateCartCount: (state, action) => {
            state.count = action.payload || 0;
        }
    }
})

export const { addToCart, removeFromCart, updateCartCount } = cartsSlice.actions

export default cartsSlice.reducer;