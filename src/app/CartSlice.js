import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
    cartItems: [],
    Shipping: 0,
}

const CartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload
        },
        addItemToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.slug === action.payload.slug
            )

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity +=
                    action.payload.cartQuantity
            } else {
                state.cartItems.push(action.payload)
            }
            toast.success(
                `Add ${action.payload.cartQuantity} ${action.payload.title} Successfully!`,
                {
                    position: 'top-center',
                }
            )
        },

        removeItemToCart: (state, action) => {
            const removeItem = state.cartItems.filter(
                (item) => item.slug !== action.payload.slug
            )
            state.cartItems = removeItem
            toast.success(`${action.payload.product_name} Removed From Cart`)
        },

        SetIncreaseItem: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.slug === action.payload.slug
            )

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
            }
        },

        setDecreaseItem: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.slug === action.payload.slug
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
            }
        },

        setShipping: (state, action) => {
            state.Shipping = action.payload
        },

        ClearAll: (state, action) => {
            state.cartItems = []
        },
    },
})

export const {
    addItemToCart,
    removeItemToCart,
    SetIncreaseItem,
    setDecreaseItem,
    GetTotal,
    ClearAll,
    setShipping,
    setCart,
} = CartSlice.actions

export default CartSlice.reducer
