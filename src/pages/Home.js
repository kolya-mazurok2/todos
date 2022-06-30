import { CssBaseline, Pagination, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoCounter from '../components/todo/TodoCounter';
import TodoTable from '../components/todo/TodoTable';
import { update } from '../store/slices/todosSlice';

const Home = () => {
  const dispatch = useDispatch();

  const { entities: todos, isLoading, isError } = useSelector((state) => state.todos);

  const [pageState, setPageState] = useState({
    page: 1,
    perPage: 10,
    totalPages: 1
  });

  const handleChange = (id, isCompleted) => {
    todos.map((todo) => {
      if (todo.id === id) {
        let newTodo = { ...todo, completed: isCompleted };
        dispatch(update(newTodo));

        return newTodo;
      }

      return todo;
    });
  };

  const handlePageChange = (event, page) => {
    setPageState({ ...pageState, page: page });
  };

  const getFilteredTodos = useCallback(() => {
    return [...todos].slice(
      (pageState.page - 1) * pageState.perPage,
      pageState.perPage * pageState.page
    );
  }, [todos, pageState]);

  const countTotalPages = useMemo(() => {
    return Math.ceil(todos.length / pageState.perPage);
  }, [todos, pageState]);

  const filteredTodos = getFilteredTodos();

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      {isLoading && (
        <Typography component="h4" align="center" color="text.primary" gutterBottom>
          Loading...
        </Typography>
      )}

      {isError && (
        <Typography component="h4" align="center" color="text.primary" gutterBottom>
          Something went wrong!
        </Typography>
      )}

      {!isLoading && !isError && <TodoCounter todos={filteredTodos} />}

      {!isLoading && !isError && <TodoTable todos={filteredTodos} onChange={handleChange} />}

      <Pagination count={countTotalPages} color="primary" onChange={handlePageChange} />
    </Container>
  );
};

export default Home;
