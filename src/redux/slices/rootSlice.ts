import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Name',
        brand: 'Brand',
        size: 'Size',
        proof: 'Proof',
        price: 'Price',
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseBrand: (state, action) => { state.brand = action.payload},
        chooseSize: (state, action) => { state.size = action.payload},
        chooseProof: (state, action) => { state.proof = action.payload},
        choosePrice: (state, action) => { state.price = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseBrand, chooseSize, chooseProof, choosePrice } = rootSlice.actions;