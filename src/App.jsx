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
import UserManage from "./module/user/UserManage"
import UserAddNew from "./module/user/UserAddNew"
import UserUpdate from "./module/user/UserUpdate"
import PostUpdate from "./module/post/PostUpdate"
import PostDetailsPage from "./pages/PostDetailsPage"

function App() {
  return (
    <>
      <Suspense>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:slug" element={<PostDetailsPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<PageNotFound />} />
            {/* Dashboard */}
            <Route element={<DashboardLayout />}>
              {/* Post */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/manage/posts" element={<PostManage />} />
              <Route path="/manage/add-post" element={<PostAddNew />} />
              <Route path="/manage/update-post" element={<PostUpdate />} />
              {/* Category */}
              <Route path="/manage/category" element={<CategoryManage />} />
              <Route path="/manage/add-category" element={<CategoryAddNew />} />
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate />}
              />
              {/* User */}
              <Route path="/manage/user" element={<UserManage />} />
              <Route path="/manage/add-user" element={<UserAddNew />} />
              <Route path="/manage/update-user" element={<UserUpdate />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
