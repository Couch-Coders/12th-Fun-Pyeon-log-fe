import styled from 'styled-components'

export const BrandList = styled.li`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.filterBrand};
  border: 1px solid ${(props) => props.theme.colors.border};
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
