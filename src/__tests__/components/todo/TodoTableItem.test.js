import { fireEvent, render, screen } from '@testing-library/react';
import TodoTableItem from '../../../components/todo/TodoTableItem';

test('Interacts with TodoListItem', () => {
  render(
    <table>
      <tbody>
        <TodoTableItem title="test" completed={false} />
      </tbody>
    </table>
  );

  const title = screen.getByTestId('title');
  const completed = screen.getByTestId('completed');

  expect(title.textContent).toBe('test');
  expect(completed.checked).toBe(false);
});

test('Render TodoListItem', () => {
  render(
    <table>
      <tbody>
        <TodoTableItem title="test" completed={true} onChange={() => {}} />
      </tbody>
    </table>
  );

  const completed = screen.getByTestId('completed');

  expect(completed.checked).toBe(true);

  fireEvent.click(completed);

  expect(completed.checked).toBe(false);
});
