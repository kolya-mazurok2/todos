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

const TodoTable = ({ todos = [], onChange }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>

            <TableCell algin="right">Completed</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
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

export default TodoTable;
