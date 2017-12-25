import styled from 'styled-components';

export default styled.div`
  background: #5682a3;
  color: white;
  min-height: 48px;
  padding: 0;
  flex-grow: 0 !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
  display: flex !important;
  & > * {
    align-self: center;
  }
`;
