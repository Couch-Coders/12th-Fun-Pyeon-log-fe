import styled from 'styled-components'

export const BaseBtn = styled.button`
  width: 5.5rem;
  height: 2rem;

  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 5px;
  border: none;

  color: white;
  cursor: pointer;

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
