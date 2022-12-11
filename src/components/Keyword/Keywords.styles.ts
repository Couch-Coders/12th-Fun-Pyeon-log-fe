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
  color: #969696;
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
    color: #ececec;
    border-radius: 5px;
    margin-right: 5px;
    transition: 0.5s;
  }

  &.on {
    svg {
      color: #7d53d6;
    }

    ${KeywordName} {
      color: #000;
    }
  }
`
