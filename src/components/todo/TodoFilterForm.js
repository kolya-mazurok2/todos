import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TodoFilterForm = ({ defaultState, onChange }) => {
  const [formFields, setFormFields] = useState({
    keyword: defaultState.keyword,
    completed: defaultState.completed,
    isUserChange: false
  });

  const updateFormField = (field, value) => {
    setFormFields({ ...formFields, [field]: value, isUserChange: true });
  };

  useEffect(() => {
    onChange(formFields);
  }, [formFields, onChange]);

  return (
    <Box component="form">
      <FormControl>
        <TextField
          label="Search by title"
          variant="outlined"
          value={formFields.keyword}
          onChange={(event) => {
            updateFormField('keyword', event.currentTarget.value);
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
            updateFormField('completed', event.target.value);
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
  defaultState: PropTypes.shape({
    keyword: PropTypes.string,
    completed: PropTypes.oneOf(['all', 'completed', 'not-completed']),
    isUserChange: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func
};

export default TodoFilterForm;
