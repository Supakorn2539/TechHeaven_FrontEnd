import { listCategory } from "@/API/category-api";
import { create } from "zustand";

const useCategoryStore = create((set) => ({
    categories : [],

    getCategory : async () => {
        try {
            const res = await listCategory();
            set({ categories: res.data })
        } catch (err) {
            console.log(err);
        }
    }
}))

export default useCategoryStore