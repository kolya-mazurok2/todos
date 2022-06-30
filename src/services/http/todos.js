const PATH = 'https://jsonplaceholder.typicode.com/todos';

const findAll = async () => {
  const response = {
    todos: [],
    isError: false
  };

  try {
    const apiResponse = await fetch(PATH);

    if (!apiResponse.ok) {
      throw new Error('Something went wrong!');
    }

    return { ...response, todos: await apiResponse.json() };
  } catch {
    return { ...response, isError: true };
  }
};

const update = async (todo) => {
  try {
    const apiResponse = await fetch(`${PATH}/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...todo
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    if (!apiResponse.ok) {
      throw new Error('Something went wrong!');
    }

    return true;
  } catch {
    return false;
  }
};

export { findAll, update };
