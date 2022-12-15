import styled from 'styled-components'

export const SelectBox = styled.div`
  &.brand {
    h2 {
      margin-left: 10px;
      margin-bottom: 10px;
      font-weight: 700;
    }

    li {
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
    }
  }

  &.checkbox {
    p {
      margin-bottom: 10px;
    }

    li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;

      .desc {
        font-size: 14px;
        color: ${(props) => props.theme.colors.checkBoxDesc};
        transition: 0.5s;
      }

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

        .desc {
          color: #000;
        }
      }
    }
  }

  &.keyword {
    margin-bottom: 20px;
    p {
      text-align: center;
      font-weight: 700;
      width: 10%;
      margin-right: 10px;
    }

    ul {
      display: flex;
      border-left: 1px solid ${(props) => props.theme.colors.checkBoxDesc};
      padding-left: 20px;
      li {
        color: ${(props) => props.theme.colors.checkBoxDesc};
        border: 1px solid ${(props) => props.theme.colors.checkBoxDesc};
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
        cursor: pointer;

        &.on {
          color: white;
          background-color: ${(props) => props.theme.colors.purple};
        }
      }
    }
  }
`
