import styled from 'styled-components'

export const MapWrap = styled.section`
  position: relative;
  width: 100%;

  .map {
    width: 100%;
    height: calc(100vh - 80px);
  }

  @media screen and (max-width: 576px) {
    .map {
      height: calc(65vh - 60px);
    }
  }
`
export const ControlBtns = styled.div`
  width: 100%;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  &.tablet {
    display: none;
  }

  @media screen and (max-width: 768px) {
    right: 0px;
    justify-content: center;
    button {
      &.web {
        display: none;
      }

      &.tablet {
        display: flex;
        width: 38px;
        height: 38px;

        span {
          font-size: 20px;
          color: ${(props) => props.theme.colors.searchBtn};
        }

        &:hover {
          span {
            color: ${(props) => props.theme.colors.purple};
          }
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    bottom: 10px;
    top: unset;
  }
`
