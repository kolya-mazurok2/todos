import styled from 'styled-components';

const StyledTodoFilterForm = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & > div {
      &:first-child {
        flex: 1 0 calc(100% - 160px);
      }

      &:last-child {
        flex: 1 0 160px;
      }
    }
  }
`;

export default StyledTodoFilterForm;
