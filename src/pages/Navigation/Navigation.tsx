import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import LoginModal from '@components/LoginModal/LoginModal'
import FunButton from '@components/styles/FunButton'
import Spinner from '@components/styles/Spinner'
import { googleSignOut } from '@services/firebaseAuth'
import { logOutUserThunk } from '@stores/auth/authSlice'
import { RootState, useAppDispatch } from '@stores/store'
import { ReactComponent as Funlogo } from '../../assets/funlog.svg'
import {
  NavCon,
  LogoCon,
  Avatar,
  LogoutCon,
  LoadingContainer,
} from './Navigation.styles'

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const loading = useSelector((state: RootState) => state.user.loading)
  const [modalOpen, setModalOpen] = useState(false)

  const signOutHandler = async () => {
    if (user) {
      await googleSignOut()
      await dispatch(logOutUserThunk())
    }
    navigate('/', { replace: true })
  }

  return (
    <>
      <NavCon>
        <LogoCon>
          <Funlogo
            onClick={() => {
              navigate('/')
            }}
          />
        </LogoCon>

        {loading ? (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        ) : user ? (
          <LogoutCon>
            <Avatar>
              <img src={user.imgUrl} alt="user avatar" />
            </Avatar>
            <p>{user.displayName}</p>
            <FunButton onClick={signOutHandler}>Logout</FunButton>
          </LogoutCon>
        ) : (
          <FunButton
            onClick={() => {
              setModalOpen(true)
            }}
          >
            Login
          </FunButton>
        )}
        {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
      </NavCon>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navigation
