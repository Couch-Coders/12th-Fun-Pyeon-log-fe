import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { googleSignOut } from '@services/firebaseAuth'
import AuthService from '@services/authService'
import { RootState } from '@stores/store'
import { setUser } from '@stores/auth/authSlice'

import LoginModal from '@components/LoginModal/LoginModal'
import Spinner from '@styles/Spinner'
import FunButton from '@styles/FunButton'
import { ReactComponent as Funlogo } from '../../assets/fun-pyeon-logo.svg'
import { NavCon, LogoCon, Avatar, LogoutCon } from './Navigation.styles'

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const loading = useSelector((state: RootState) => state.user.loading)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const signOutHandler = async () => {
    googleSignOut()
    if (user) {
      try {
        await AuthService.signOut({ token: user.token })
        console.log('signOutSuccess')
        dispatch(setUser(null))
      } catch (e) {
        console.log(e)
      }
    }
  }

  console.log(user)

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
          <Spinner />
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
