import { render, screen } from '@testing-library/react';
import TodoCounter from '../../../components/todo/TodoCounter';
import { dummyTodos } from '../../../data/todos';

test('Shows number of completed todos', () => {
  render(<TodoCounter todos={[]} />);

  const completedNumber = screen.getByTestId('completed-number');

  expect(completedNumber.textContent).toBe('0');
});

test('Shows number of completed todos', () => {
  render(<TodoCounter todos={dummyTodos} />);

  const completedNumber = screen.getByTestId('completed-number');

  expect(completedNumber.textContent).toBe('1');
});
