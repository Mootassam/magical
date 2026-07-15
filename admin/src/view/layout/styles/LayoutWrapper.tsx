import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  width: 100%;

  .main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1;
    padding: 20px;
    overflow-x: hidden;
  }
`;

export default LayoutWrapper;
