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

    @media screen and (max-width: 768px) {
      li {
        font-size: 13px;
        padding: 4px 7px;
        margin: 2px;
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

    @media screen and (max-width: 768px) {
      p {
        font-size: 13px;
      }
      li {
        .desc {
          font-size: 13px;
        }
      }
    }

    @media screen and (max-width: 576px) {
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        li {
          svg {
            margin-right: 3px;
            margin-left: 5px;
          }
        }
      }
    }
  }

  &.keyword {
    margin-bottom: 20px;

    p {
      text-align: center;
      font-weight: 700;
      margin-right: 5px;
      width: 80px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid ${(props) => props.theme.colors.checkBoxDesc};
      padding-left: 10px;
      width: 90%;
      li {
        color: ${(props) => props.theme.colors.checkBoxDesc};
        border: 1px solid ${(props) => props.theme.colors.checkBoxDesc};
        border-radius: 5px;
        padding: 5px;
        margin: 2px 0;
        margin-right: 10px;
        cursor: pointer;

        &.on {
          color: white;
          background-color: ${(props) => props.theme.colors.purple};
        }
      }
    }
    @media screen and (max-width: 768px) {
      p {
        font-size: 13px;
      }
      li {
        .desc {
          font-size: 13px;
        }
      }
    }

    @media screen and (max-width: 576px) {
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        li {
          svg {
            margin-right: 3px;
            margin-left: 5px;
          }
        }
      }
    }
  }
`
