import { render, screen } from '@testing-library/react';
import TodoTable from '../../../components/todo/TodoTable';
import { dummyTodos } from '../../../data/todos';

test('Renders TodoTable with 0 items', () => {
  render(<TodoTable todos={[]} />);

  const tableBody = screen.getByTestId('todo-table-body');

  expect(tableBody.textContent).toBe('');
});

test('Renders TodoTable with 3 items', () => {
  render(<TodoTable todos={dummyTodos} />);

  const items = screen.getAllByTestId('todo-table-item');

  expect(items.length).toBe(3);
});
