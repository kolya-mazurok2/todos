import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findTodos, updateTodo } from '../../repositories/todos';

const fetchAll = createAsyncThunk('todos/fetchAll', async () => {
  const todos = await findTodos();
  return todos;
});

const update = createAsyncThunk('todos/updateById', async (todo) => {
  const isUpdated = await updateTodo(todo);
  return isUpdated;
});

const initialState = {
  entities: [],
  isLoading: false,
  isError: false
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAll.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(update.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(update.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  }
});

export default todosSlice.reducer;

export { fetchAll, update, initialState };
