import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/auth-context'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import PostManage from './module/post/PostManage'
import PostAddNew from './module/post/PostAddNew'
import DashboardPage from './pages/DashboardPage'
import DashboardLayout from './module/dashboard/DashboardLayout'

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
            {/* Dashboard */}
            <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
          </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
