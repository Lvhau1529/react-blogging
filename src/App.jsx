import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/auth-context'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <>
      <Suspense>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<SignUpPage />}></Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
