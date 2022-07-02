import { CssBaseline, Pagination, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoCounter from '../components/todo/TodoCounter';
import TodoTable from '../components/todo/TodoTable';
import { update } from '../store/slices/todosSlice';
import Switch from '@mui/material/Switch';
import TodoFilterForm from '../components/todo/TodoFilterForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { isEqual } from 'lodash';
import { pageHasScroll, pageScrolledToBottom } from '../helpers/dom';

const HOME_HISTORY_DEFAULT = {
  page: 1,
  perPage: 10,
  totalPages: 1,
  infinityScroll: false,
  filterForm: {
    keyword: '',
    completed: 'all'
  }
};

const Home = () => {
  const dispatch = useDispatch();

  const { entities: inputTodos, isLoading, isError } = useSelector((state) => state.todos);

  const [homeHistory, setHomeHistory] = useLocalStorage('homeHistory', HOME_HISTORY_DEFAULT);

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [page, setPage] = useState(homeHistory.page);
  const [perPage] = useState(homeHistory.perPage);
  const [totalPages, setTotalPages] = useState(homeHistory.totalPages);
  const [infinityScroll, setInfinityScroll] = useState(homeHistory.infinityScroll);

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
    setPage(1);
    setInfinityScroll(checked);
  };

  const handleFiltersChange = useCallback(
    (formFields) => {
      const newHistory = {
        ...homeHistory,
        filterForm: {
          keyword: formFields.keyword,
          completed: formFields.completed
        }
      };

      if (!isEqual(newHistory.filterForm, homeHistory.filterForm)) {
        setPage(1);
        setHomeHistory(newHistory);
      }

      let newTodos = [];

      if (formFields.completed === 'all') {
        newTodos = inputTodos.filter((inputTodo) => {
          return inputTodo.title.includes(formFields.keyword);
        });
      } else {
        const isCompleted = formFields.completed === 'completed';
        newTodos = inputTodos.filter((inputTodo) => {
          return (
            inputTodo.title.includes(formFields.keyword) && inputTodo.completed === isCompleted
          );
        });
      }

      setTodos(newTodos);
    },
    [inputTodos, homeHistory, setHomeHistory]
  );

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
    if (!infinityScroll) {
      return;
    }

    const onScroll = () => {
      if (totalPages <= page) {
        return;
      }

      if (pageScrolledToBottom(window.pageYOffset, 40)) {
        setPage(page + 1);
      }
    };

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [totalPages, page, infinityScroll]);

  useEffect(() => {
    const history = {
      ...homeHistory,
      page: page,
      perPage: perPage,
      totalPages: totalPages,
      infinityScroll: infinityScroll
    };

    if (isEqual(homeHistory, history)) {
      return;
    }

    setHomeHistory(history);
  }, [page, perPage, totalPages, infinityScroll, homeHistory, setHomeHistory]);

  return (
    <Container maxWidth="sm">
      <CssBaseline />

      <Typography variant="h5" className="toggle-pagination">
        <Typography variant="span">Toggle Pagination</Typography>

        <Switch onChange={handlePaginationChange} checked={infinityScroll} />
      </Typography>

      {isLoading && (
        <Typography
          component="h4"
          align="center"
          color="text.primary"
          gutterBottom
          className="title title--loading">
          Loading...
        </Typography>
      )}

      {isError && (
        <Typography
          component="h4"
          align="center"
          color="text.primary"
          gutterBottom
          className="title title--error">
          Something went wrong!
        </Typography>
      )}

      {!isLoading && !isError && (
        <Fragment>
          <TodoFilterForm
            defaultState={{ ...homeHistory.filterForm }}
            onChange={handleFiltersChange}
          />

          <TodoCounter todos={filteredTodos} />

          <TodoTable todos={filteredTodos} onChange={handleChange} />

          {!infinityScroll && totalPages > 1 && (
            <Pagination
              className="pagination pagination--todo"
              count={totalPages}
              page={page}
              color="primary"
              onChange={handlePageChange}
            />
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default Home;
