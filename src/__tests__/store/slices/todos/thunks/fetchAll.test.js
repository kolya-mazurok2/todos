import todosSlice, { fetchAll, initialState } from '../../../../../store/slices/todosSlice';
import store from '../../../../../store';
import { dummyTodos } from '../../../../../data/todos';

describe('Fetch all todos', () => {
  const unmockedFetch = global.fetch;

  beforeAll(() => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => Promise.resolve(dummyTodos),
        ok: true
      });
    };
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });

  it('Should set isLoading to true', async () => {
    const action = { type: fetchAll.pending.type };
    const state = todosSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Should be able to fecth todo list', async () => {
    const result = await store.dispatch(fetchAll());

    const todos = result.payload;

    expect(result.type).toBe('todos/fetchAll/fulfilled');
    expect(todos).toEqual(dummyTodos);

    const state = store.getState();
    expect(state.todos.entities).toEqual(dummyTodos);
  });
});
