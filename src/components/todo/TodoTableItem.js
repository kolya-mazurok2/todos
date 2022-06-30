import { TableCell, TableRow } from '@mui/material';

const TodoTableItem = ({ title, completed, onChange }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {title}
      </TableCell>

      <TableCell align="right">
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={(event) => onChange(event.currentTarget.checked)}
        />
      </TableCell>
    </TableRow>
  );
};

export default TodoTableItem;
