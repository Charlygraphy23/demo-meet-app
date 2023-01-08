import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
const PreviewPage = lazy(() => import('../pages/preview'))

const Routers = () => {
  return (
    
      <Suspense fallback={<>Loading..</>}>
        <Routes>
        <Route path='/' element={<PreviewPage/>} />
          <Route path='/:id' element={<PreviewPage/>} />

        </Routes>
      </Suspense>

  
  )
}

export default Routers