import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TodoFilterForm = ({ onChange }) => {
  const [formFields, setFormFields] = useState({
    keyword: '',
    completed: 'all'
  });

  useEffect(() => {
    onChange(formFields);
  }, [formFields]);

  return (
    <Box component="form">
      <FormControl>
        <TextField
          label="Search by title"
          variant="outlined"
          onChange={(event) => {
            setFormFields({ ...formFields, keyword: event.currentTarget.value });
          }}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="completed">Completed</InputLabel>

        <Select
          label="completed"
          id="completed"
          value={formFields.completed}
          onChange={(event) => {
            setFormFields({ ...formFields, completed: event.target.value });
          }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="not-completed">Not Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

TodoFilterForm.propTypes = {
  onChange: PropTypes.func
};

export default TodoFilterForm;
