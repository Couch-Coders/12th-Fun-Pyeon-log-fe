import styled from 'styled-components'

export const BrandList = styled.li`
  font-size: 15px;
  font-weight: 600;
  color: #8a8a8a;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 3px;
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;

  &.on {
    background-color: #7d53d6;
    color: #fff;
  }
`
