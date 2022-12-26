import styled from 'styled-components'

export const LoadingContainer = styled.div`
  width: 350px;
  height: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    width: 250px;
    height: 250px;
    margin-bottom: 20px;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .spinner {
    width: 60px;
    height: 60px;
    border: 5px solid #fff;
    border-top-color: #7d53d6;
    margin-right: 0;
  }
`
