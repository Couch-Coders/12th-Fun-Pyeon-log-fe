import styled from 'styled-components'

export const StoreWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`
export const StoreMapWrapper = styled.section`
  margin-top: 20px;
  width: 80%;
  min-width: 800px;
  height: 500px;

  .map {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    min-width: 550px;
    height: 400px;
  }
  @media screen and (max-width: 576px) {
    width: 90%;
    min-width: 450px;
    height: 300px;
  }
`
