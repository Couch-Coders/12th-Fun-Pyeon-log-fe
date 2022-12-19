import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { googleSignOut } from '@services/firebaseAuth'
import { RootState, useAppDispatch } from '@stores/store'
import { logOutUserThunk } from '@stores/auth/authSlice'

import LoginModal from '@components/LoginModal/LoginModal'
import Spinner from '@styles/Spinner'
import FunButton from '@styles/FunButton'
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
  const [modalOpen, setModalOpen] = useState<boolean>(false)

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
            <FunButton name={'Logout'} onClick={signOutHandler} />
          </LogoutCon>
        ) : (
          <FunButton
            name={'Login'}
            onClick={() => {
              setModalOpen(true)
            }}
          />
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
