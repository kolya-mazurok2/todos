import { fireEvent, render, screen } from '@testing-library/react';
import TodoFilterForm from '../../../components/todo/TodoFilterForm';

test('Interacts with TodoFilterForm', () => {
  render(<TodoFilterForm defaultState={{ keyword: '', completed: 'all' }} onChange={() => {}} />);

  const keywordWrapper = screen.getByTestId('keyword');
  const keywordInput = keywordWrapper.querySelector('input');
  const completedWrapper = screen.getByTestId('completed');
  const completedInput = completedWrapper.querySelector('input');

  expect(keywordInput.value).toBe('');
  expect(completedInput.value).toBe('all');

  fireEvent.change(keywordInput, { target: { value: 'test' } });
  expect(keywordInput.value).toBe('test');

  fireEvent.change(completedInput, { target: { value: 'completed' } });
  expect(completedInput.value).toBe('completed');
});
