import styled from 'styled-components';

const StyledHome = styled.section`
  padding: 20px;

  .title--loading,
  .title--error,
  .form--todo-filter,
  .todo--counter,
  .table--todo,
  .pagination--todo {
    & > ul {
      justify-content: center;
    }

    margin-top: 20px;
`;

export default StyledHome;
