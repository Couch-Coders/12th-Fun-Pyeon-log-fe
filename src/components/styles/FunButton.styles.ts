import styled from 'styled-components'

export const BaseBtn = styled.button`
  width: 5.5rem;
  height: 2rem;

  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 5px;
  border: none;

  color: white;
  cursor: pointer;
  transition: 0.5s;

  :hover {
    background-color: rgba(125, 83, 214, 0.8);
  }

  &.opposite {
    color: ${(props) => props.theme.colors.purple};
    background-color: white;
    border: 1px solid ${(props) => props.theme.colors.purple};

    :hover {
      background-color: rgba(125, 83, 214, 0.1);
    }
  }

  @media screen and (max-width: 768px) {
    width: 4rem;
    font-size: 12px;
  }
`

export const GoogleSignInBtn = styled.button`
  width: 200px;
  background-color: #fff;
  font-size: 17px;
  font-weight: 700;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.purple};
  border-radius: 5px;
  padding: 15px 5px;
  cursor: pointer;
  transition: all 0.5s;

  :hover {
    color: white;
    background-color: ${(props) => props.theme.colors.purple};
  }
  @media screen and (max-width: 768px) {
    width: 160px;
    font-size: 15px;
    padding: 10px 5px;
  }
  @media screen and (max-width: 576px) {
    width: 140px;
    font-size: 12px;
    padding: 8px 5px;
  }
`

export const mapBtn = styled.button`
  background-color: #fff;
  color: #555;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 10px;
  opacity: 0.9;
  transition: 0.5s;
  padding: 10px;
  margin: 0 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.colors.purple};
    border: 1px solid ${(props) => props.theme.colors.purple};
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  }

  &.tablet {
    display: none;
  }

  @media screen and (max-width: 768px) {
    &.web {
      display: none;
    }

    &.tablet {
      display: flex;
      width: 38px;
      height: 38px;

      span {
        font-size: 20px;
        color: ${(props) => props.theme.colors.searchBtn};
      }

      &:hover {
        span {
          color: ${(props) => props.theme.colors.purple};
        }
      }
    }
  }
`
