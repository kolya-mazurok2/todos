import { Typography } from '@mui/material';
import { useMemo } from 'react';

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

export default TodoCounter;
