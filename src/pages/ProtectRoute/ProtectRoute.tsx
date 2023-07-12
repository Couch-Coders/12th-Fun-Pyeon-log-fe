import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '@stores/store'

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user)
  if (!user) {
    alert('로그인 후 이용 가능합니다.')
    return <Navigate to="/" />
  }
  return <>{children}</>
}

export default ProtectRoute
