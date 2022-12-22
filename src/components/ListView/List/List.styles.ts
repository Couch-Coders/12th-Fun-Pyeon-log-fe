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
    line-height: 1.2;
  }

  .star_box {
    min-width: 50px;
    margin-left: 10px;
    svg {
      fill: ${(props) => props.theme.colors.star};
      margin-right: 3px;
    }
  }
`

export const Content = styled.div`
  position: relative;

  ul {
    display: flex;
    flex-direction: column;

    li {
      margin-bottom: 10px;
      :last-child {
        margin-bottom: 20px;
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
