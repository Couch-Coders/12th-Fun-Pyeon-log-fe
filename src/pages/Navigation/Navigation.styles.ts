import styled from 'styled-components'

export const NavCon = styled.header`
  background-color: #fff;
  top: 0;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #ececec;

  p {
    font-size: 16px;
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 576px) {
    height: 60px;
  }
`

export const LogoCon = styled.div`
  cursor: pointer;
  svg {
    height: 50px;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    svg {
      height: 40px;
      width: 100%;
    }
  }

  @media screen and (max-width: 576px) {
    svg {
      height: 30px;
      width: 100%;
    }
  }
`
export const Avatar = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #ececec;
  background-color: #d9d9d9;

  overflow: hidden;

  img {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`
export const LogoutCon = styled.div`
  display: flex;
  align-items: center;

  font-size: 20px;

  div,
  p,
  button {
    margin: 0 10px;
  }

  @media screen and (max-width: 768px) {
    div,
    p,
    button {
      margin: 0 3px;
    }

    p {
      font-size: 14px;
    }

    button {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 576px) {
    p {
      display: none;
    }
  }
`
export const LoadingContainer = styled.div`
  width: 5.5rem;
`
