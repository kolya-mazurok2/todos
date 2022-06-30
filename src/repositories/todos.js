import { findAll, update } from '../services/http/todos';

const findTodos = async () => {
  const data = await findAll();
  if (data.isError) {
    throw new Error('Something went wrong!');
  }

  return data.todos;
};

const updateTodo = async (todo) => {
  const isUpdated = await update(todo);
  if (!isUpdated) {
    throw new Error('Something went wrong!');
  }

  return isUpdated;
};

export { findTodos, updateTodo };
