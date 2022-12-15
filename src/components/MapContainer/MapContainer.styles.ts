import styled from 'styled-components'

export const MapWrap = styled.section`
  position: relative;
  width: 100%;

  .map {
    width: 100%;
    height: calc(100vh - 80px);
  }
`
export const ControlBtns = styled.div`
  width: 100%;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  button {
    background-color: #fff;
    color: #555;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 10px;
    opacity: 0.9;
    transition: 0.5s;
    padding: 10px;
    margin: 0 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: 1;
      color: ${(props) => props.theme.colors.purple};
      border: 1px solid ${(props) => props.theme.colors.purple};
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    }
  }
`
