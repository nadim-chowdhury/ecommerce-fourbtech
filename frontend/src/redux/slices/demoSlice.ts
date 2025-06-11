import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DemoState {
  count: number;
}

const initialState: DemoState = {
  count: 0,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { increment, decrement, setCount } = demoSlice.actions;
export default demoSlice.reducer;
