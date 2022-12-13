import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { googleSignOut } from '@services/firebaseAuth'
import { authService } from '@services/authService'
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
        await authService.signOut({ token: user.token })
        console.log('signOutSuccess')
        dispatch(setUser(null))
      } catch (e) {
        console.log(e)
      }
    }
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
          <Spinner />
        ) : user ? (
          <LogoutCon>
            <Avatar>
              <img
                src="https://lh3.googleusercontent.com/a/AEdFTp4oKPFW_6nqYPabxkYl1wZ8zvdbYIvb7Ndo7nJh=s96-c"
                alt=""
              />
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
