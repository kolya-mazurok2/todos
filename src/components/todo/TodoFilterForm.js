import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StyledTodoFilterForm from '../../styled/components/todo/StyledTodoFilterForm';

const TodoFilterForm = ({ defaultState, onChange }) => {
  const [formFields, setFormFields] = useState({
    keyword: defaultState.keyword,
    completed: defaultState.completed
  });

  const updateFormField = (field, value) => {
    setFormFields({ ...formFields, [field]: value });
  };

  useEffect(() => {
    onChange({ ...formFields });
  }, [formFields, onChange]);

  return (
    <StyledTodoFilterForm>
      <Box component="form" className="form form--todo-filter">
        <FormControl>
          <TextField
            label="Search by title"
            variant="outlined"
            value={formFields.keyword}
            onChange={(event) => {
              updateFormField('keyword', event.currentTarget.value);
            }}
            data-testid="keyword"
          />
        </FormControl>

        <FormControl>
          <InputLabel id="completed">Completed</InputLabel>

          <Select
            label="completed"
            id="completed"
            value={formFields.completed}
            onChange={(event) => {
              updateFormField('completed', event.target.value);
            }}
            data-testid="completed">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="not-completed">Not Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </StyledTodoFilterForm>
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
