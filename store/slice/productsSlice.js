import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/products");
      console.log("API Response:", res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || " خطا در دریافت محصول"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/api/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || " خطا در حذف محصول"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`api/products/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "خطا در ویرایش محصول"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/products", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "خطا در ثبت محصول");
    }
  }
);

export const deleteMultipleProducts = createAsyncThunk(
  "products/deleteMultipleProducts",
  async (productIds, { rejectWithValue }) => {
    try {
      await API.delete("/api/products", { 
        data: { ids: productIds } 
      });
      return productIds;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "خطا در حذف چندتایی محصولات"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeMultipleProducts: (state, action) => {
      state.products = state.products.filter(
        product => !action.payload.includes(product.id)
      );
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data || [];
        state.totalProducts = action.payload.totalProducts || 0;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) => 
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteMultipleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          product => !action.payload.includes(product.id)
        );
      })
      .addCase(deleteMultipleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeMultipleProducts, clearError } = productSlice.actions;
export default productSlice.reducer;