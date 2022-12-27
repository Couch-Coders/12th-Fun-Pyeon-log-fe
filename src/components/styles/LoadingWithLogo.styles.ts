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
  @media screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
    .logo {
      width: 180px;
      height: 180px;
    }
    .spinner {
      width: 50px;
      height: 50px;
    }
  }
  @media screen and (max-width: 576px) {
    width: 250px;
    height: 250px;

    .logo {
      width: 160px;
      height: 160px;
      margin-bottom: 15px;
    }
    .spinner {
      width: 40px;
      height: 40px;
    }
  }
`
