import styled from 'styled-components'

export const BaseBtn = styled.button`
  width: 5.5rem;
  height: 2rem;

  background-color: #7d53d6;
  border-radius: 5px;
  border: none;

  color: white;
  cursor: pointer;

  :hover {
    background-color: rgba(125, 83, 214, 0.8);
  }
`

export const GoogleSignInBtn = styled.button`
  width: 200px;
  background-color: #fff;
  font-size: 17px;
  font-weight: 700;
  text-align: center;
  border: 1px solid #7d53d6;
  border-radius: 5px;
  padding: 15px 5px;
  cursor: pointer;
`
