import styled from 'styled-components'

export const ConBox = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 20px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.colors.purple};
    color: white;
  }
`

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 600;

  h2 {
    margin-bottom: 20px;
  }

  .star_box {
    svg {
      fill: ${(props) => props.theme.colors.star};
      margin-right: 4px;
    }
  }
`

export const Content = styled.div`
  position: relative;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    li {
      span {
        font-size: 14px;
        color: ${(props) => props.theme.colors.purple};
        background-color: white;
        border: 1px solid ${(props) => props.theme.colors.purple};
        border-radius: 5px;
        padding: 2px 5px;
        transition: 0.5s;
      }
    }
  }

  .review {
    position: absolute;
    right: 0;
    bottom: -10px;
    font-size: 14px;
    font-weight: 500;
  }
`
