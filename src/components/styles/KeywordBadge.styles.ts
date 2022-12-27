import styled from 'styled-components'

export const KeywordWrapper = styled.li`
  span {
    background-color: white;
    font-size: 14px;
    color: #7d53d6;
    border: 1px solid #7d53d6;
    border-radius: 5px;
    padding: 2px 5px;
    margin: 0 5px;
    transition: 0.5s;
  }

  @media screen and (max-width: 768px) {
    span {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 576px) {
    span {
      margin: 2px;
      font-size: 10px;
    }
  }
`
