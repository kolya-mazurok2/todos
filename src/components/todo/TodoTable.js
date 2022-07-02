import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TodoTableItem from './TodoTableItem';
import PropTypes from 'prop-types';

const TodoTable = ({ todos = [], onChange }) => {
  return (
    <TableContainer component={Paper} className="table table--todo">
      <Table sx={{ minWidth: 320 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>

            <TableCell algin="right">Completed</TableCell>
          </TableRow>
        </TableHead>

        <TableBody data-testid="todo-table-body">
          {todos.map((todo) => (
            <TodoTableItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              onChange={(isCompleted) => onChange(todo.id, isCompleted)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      userId: PropTypes.number,
      completed: PropTypes.bool
    }).isRequired
  ),
  onChange: PropTypes.func
};

export default TodoTable;
