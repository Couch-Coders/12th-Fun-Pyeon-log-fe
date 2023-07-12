import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Edit from '@pages/Edit/Edit'
import Main from '@pages/Main/Main'
import Navigation from '@pages/Navigation/Navigation'
import ProtectRoute from '@pages/ProtectRoute/ProtectRoute'
import Store from '@pages/Store/Store'
import Write from '@pages/Write/Write'

export interface RouterBase {
  id: number
  path: string
  element: React.ReactNode
}

const router: RouterBase[] = [
  {
    id: 1,
    path: '/',
    element: <Main />,
  },
  {
    id: 2,
    path: '/stores/:storeId/*',
    element: <Store />,
  },
  {
    id: 3,
    path: '/stores/:storeId/write',
    element: (
      <ProtectRoute>
        <Write />
      </ProtectRoute>
    ),
  },
  {
    id: 4,
    path: '/stores/:storeId/edit/:reviewId',
    element: (
      <ProtectRoute>
        <Edit />
      </ProtectRoute>
    ),
  },
]

export const routers = createBrowserRouter(
  router.map((route) => {
    return {
      path: route.path,
      element: (
        <>
          <Navigation />
          {route.element}
        </>
      ),
    }
  })
)
