import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routers } from '@pages/routes'

function App() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  useEffect(() => {
    // API 스크립트 로드
    if (!isScriptLoaded) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d25f19cf0a1860dd105275f8a970b86d&libraries=services&autoload=false`

      script.onload = () => {
        setIsScriptLoaded(true)
      }
      if (!document.querySelector(`script[src="${script.src}"]`)) {
        document.body.appendChild(script)
      }
    }
  }, [isScriptLoaded])
  if (!isScriptLoaded) {
    return <></>
  }
  return <RouterProvider router={routers} />
}

export default React.memo(App)
