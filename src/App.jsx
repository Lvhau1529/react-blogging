import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/auth-context'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'

function App() {
  return (
    <>
      <Suspense>
        <AuthProvider>
          <Routes>
            <Route path='/sign-up' element={<SignUpPage />}></Route>
            <Route path='/sign-in' element={<SignInPage />}></Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
