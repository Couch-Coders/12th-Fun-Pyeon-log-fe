import styled from 'styled-components'

export const NavCon = styled.header`
  background-color: #fff;
  top: 0;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #ececec;

  p {
    font-size: 16px;
    font-weight: 700;
  }
`

export const LogoCon = styled.div`
  cursor: pointer;
  svg {
    height: 45px;
  }
`
export const Avatar = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #ececec;
  background-color: #d9d9d9;

  overflow: hidden;

  img {
    width: 100%;
  }
`
export const LogoutCon = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 20px;
`
