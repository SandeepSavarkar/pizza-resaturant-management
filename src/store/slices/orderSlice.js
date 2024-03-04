import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
  orders: [],
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload]
    },
    updateOrder: (state, action) => {
      const { orderId, itemId } = action.payload
      const existingOrderIndex = state.orders.findIndex(
        (order) => order.orderId === orderId && order.itemId === itemId
      )

      if (existingOrderIndex !== -1) {
        state.orders[existingOrderIndex] = action.payload
      }
    },
    cancelOrder: (state, action) => {
      state.orders = state.orders?.filter(
        (order) => order.orderId !== action.payload
      )
    },
  },
})

export const { addOrder, updateOrder, cancelOrder } = orderSlice.actions

export default orderSlice.reducer
