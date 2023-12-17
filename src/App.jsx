import { Suspense } from "react"

import { Route, Routes } from "react-router-dom"

import { AuthProvider } from "./contexts/auth-context"
import DashboardLayout from "./module/dashboard/DashboardLayout"
import PostAddNew from "./module/post/PostAddNew"
import PostManage from "./module/post/PostManage"
import DashboardPage from "./pages/DashboardPage"
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import CategoryManage from "./module/category/CategoryManage"
import CategoryAddNew from "./module/category/CategoryAddNew"
import CategoryUpdate from "./module/category/CategoryUpdate"

function App() {
  return (
    <>
      <Suspense>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='*' element={<PageNotFound />} />
            {/* Dashboard */}
            <Route element={<DashboardLayout />}>
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/manage/post' element={<PostManage />} />
              <Route path='/manage/add-post' element={<PostAddNew />} />
              <Route path='/manage/category' element={<CategoryManage />} />
              <Route path='/manage/add-category' element={<CategoryAddNew />} />
              <Route path='/manage/update-category' element={<CategoryUpdate />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
