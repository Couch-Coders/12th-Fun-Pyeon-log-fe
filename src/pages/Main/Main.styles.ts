import styled from 'styled-components'

export const Wrapper = styled.article`
  display: flex;
  flex-direction: row;
`
export const ListView = styled.section`
  position: relative;
  z-index: 2;
  width: 25vw;
  min-width: 250px;
  max-width: 300px;
  height: calc(100vh - 80px);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
`
export const ListTop = styled.div`
  height: 90px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 10px 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const SearchBox = styled.div`
  margin-right: 10px;
  width: 15vw;
  min-width: 170px;
  height: 30px;

  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 5px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    min-width: 120px;
    padding: 0 10px;
    border: none;
  }

  button {
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.colors.searchBtn};
    background-color: transparent;
    border: none;
    text-align: right;
    cursor: pointer;
  }
`
export const SortBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: transparent;
  color: ${(props) => props.theme.colors.searchBtn};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &.on {
    background-color: #efefef;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`
