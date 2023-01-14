import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '@stores/store'

const ProtectRoute = () => {
  const user = useSelector((state: RootState) => state.user.user)
  if (!user) {
    alert('로그인 후 이용 가능합니다.')
    return <Navigate to="/" />
  }
  return <Outlet />
}

export default ProtectRoute
