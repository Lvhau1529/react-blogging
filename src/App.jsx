import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/auth-context'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <>
      <Suspense>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/sign-up' element={<SignUpPage />}></Route>
            <Route path='/sign-in' element={<SignInPage />}></Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
