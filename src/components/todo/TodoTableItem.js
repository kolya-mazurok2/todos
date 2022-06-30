import { TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

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

TodoTableItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};

export default TodoTableItem;
