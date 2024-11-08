import {
  createOrder,
  getOrderByUserId,
  getOrderAdmin,
  deleteOrder,
  changeOrderStatus,
} from "../API/order-api";
import { create } from "zustand";

const useOrderStore = create((set, get) => ({
  orders: [],
  actionCreateOrder: async (token, payload) => {
    try {
      const result = await createOrder(token, payload);
      if (result && result.data && result.data.created) {
        set((state) => ({
          orders: [...state.orders, result.data.created],
        }));
        return result.data.created;
      } else {
        console.warn("Unexpected result structure:", result);
        return undefined;
      }
    } catch (err) {
      console.error("Error creating order:", err.response?.data || err.message);
      throw err;
    }
  },

  actionGetOrderByUserId: async (token, id) => {
    try {
      const result = await getOrderByUserId(token, id);
      console.log(result);
      set({ orders: result.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionGetOrderAdmin: async () => {
    try {
      const result = await getOrderAdmin();
      console.log(result);
      set({ orders: result.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionUpdateOrder: async (token, id, data) => {
    try {
      const result = await changeOrderStatus(token, id, data);
      console.log(result);
      set((state) => ({
        orders: state.orders.map((item) =>
          item.id === id ? { ...item, ...result } : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  },
  actionDeleteOrder: async (token, id) => {
    try {
      const result = await deleteOrder(token, id);
      console.log(result);
      set((state) => ({
        orders: state.orders.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useOrderStore;
