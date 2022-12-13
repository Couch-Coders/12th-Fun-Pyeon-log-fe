import styled from 'styled-components'

export const KeywordGroup = styled.div`
  padding: 5px 15px;
  margin-bottom: 5px;

  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h3 {
    margin-bottom: 10px;
  }
`
export const KeywordName = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.checkBoxDesc};
  transition: 0.5s;
`
export const KeywordList = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  svg {
    width: 23px;
    height: 23px;
    color: ${(props) => props.theme.colors.checkBox};
    border-radius: 5px;
    margin-right: 5px;
    transition: 0.5s;
  }

  &.on {
    svg {
      color: ${(props) => props.theme.colors.purple};
    }

    ${KeywordName} {
      color: #000;
    }
  }
`
