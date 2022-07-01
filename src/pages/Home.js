import { CssBaseline, Pagination, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoCounter from '../components/todo/TodoCounter';
import TodoTable from '../components/todo/TodoTable';
import { update } from '../store/slices/todosSlice';
import Switch from '@mui/material/Switch';

const Home = () => {
  const dispatch = useDispatch();

  const { entities: todos, isLoading, isError } = useSelector((state) => state.todos);

  const [filteredTodos, setFilteredTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [infinityScroll, setInfinityScroll] = useState(false);

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
    setPage(page);
  };

  const handlePaginationChange = (event, checked) => {
    setInfinityScroll(checked);
  };

  const pageHasScroll = () => {
    const html = document.getElementsByTagName('html')[0];
    return html.scrollHeight > html.clientHeight;
  };

  const scrolledToBottom = (offset, gap = 0) => {
    const html = document.getElementsByTagName('html')[0];
    console.log(offset, html.scrollHeight, html.clientHeight, gap);
    return offset >= html.scrollHeight - html.clientHeight - gap;
  };

  useEffect(() => {
    const newTodos = infinityScroll
      ? [...todos].slice(0, perPage * page)
      : [...todos].slice((page - 1) * perPage, perPage * page);

    setFilteredTodos(newTodos);
  }, [todos, infinityScroll, page, perPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(todos.length / perPage));
  }, [todos, perPage]);

  useEffect(() => {
    if (pageHasScroll()) {
      return;
    }

    if (infinityScroll && totalPages > page) {
      setPage(page + 1);
    }
  }, [totalPages, page, infinityScroll]);

  useEffect(() => {
    const onScroll = () => {
      if (totalPages <= page) {
        return;
      }
      console.log(scrolledToBottom(window.pageYOffset, 40));
      if (scrolledToBottom(window.pageYOffset, 40)) {
        setPage(page + 1);
      }
    };

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [totalPages, page]);

  return (
    <Container maxWidth="sm">
      <CssBaseline />

      <Typography variant="h5">
        <Typography variant="span">Toggle Pagination</Typography>

        <Switch onChange={handlePaginationChange} />
      </Typography>

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

      {!infinityScroll && (
        <Pagination
          count={totalPages}
          defaultPage={page}
          color="primary"
          onChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default Home;
