import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TodoCounter = ({ todos }) => {
  const completedTodosNum = todos.reduce((numCompleted, todo) => {
    if (todo.completed) {
      numCompleted++;
    }

    return numCompleted;
  }, 0);

  return (
    <Typography component="h4" align="center" color="text.primary" gutterBottom>
      <Typography component="strong">Completed: </Typography>
      <Typography component="span">{completedTodosNum}</Typography>
    </Typography>
  );
};

TodoCounter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      userId: PropTypes.number,
      completed: PropTypes.bool
    })
  ).isRequired
};

export default TodoCounter;
