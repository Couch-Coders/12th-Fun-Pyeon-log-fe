import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from '@components/LoginModal/LoginModal'
import FunButton from '@styles/FunButton'
import Spinner from '@styles/Spinner'
import { ReactComponent as Funlogo } from '../../assets/fun-pyeon-logo.svg'
import { googleSignOut } from '@services/firebaseAuth'
import { authService } from '@services/authService'
import { RootState } from '@stores/store'
import { setUser } from '@stores/auth/authSlice'
import {
  NavigationContainer,
  LogoContainer,
  Avatar,
  LogoutContainer,
} from './Navigation.styles'

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
      <NavigationContainer>
        <LogoContainer>
          <Funlogo
            onClick={() => {
              navigate('/')
            }}
          />
        </LogoContainer>

        {loading ? (
          <Spinner />
        ) : user ? (
          <LogoutContainer>
            <Avatar></Avatar>
            <p>{user.displayName}</p>
            <FunButton onClick={signOutHandler}>Logout</FunButton>
          </LogoutContainer>
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
      </NavigationContainer>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navigation
