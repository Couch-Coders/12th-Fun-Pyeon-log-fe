import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ReactComponent as Funlogo } from '../../assets/fun-pyeon-logo.svg'
import FunButton from '@styles/FunButton'
import {
  NavigationContainer,
  LogoContainer,
  Avatar,
  LogoutContainer,
} from './Navigation.styles'
import LoginModal from '@components/LoginModal/LoginModal'
import { googleSignOut } from '@services/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@stores/store'
import { authService } from '@services/authService'
import { setUser } from '@stores/auth/authSlice'
import Spinner from '@styles/Spinner'

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
            <p>{user.email.split('@')[0]}</p>
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
