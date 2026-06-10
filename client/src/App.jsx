import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from './pages/Auth'
import Home from './pages/student/Home/HomePage'
import ProfilePage from './pages/student/Profile/ProfilePage'
import MyLeariningPage from './pages/student/MyLearning/MyLeariningPage'
import MainLayout from './layout/MainLayout'
import { useDispatch } from 'react-redux'
import { useGetUserProfileQuery } from './api/userApi'
import { userLoggedIn } from './redux/authSlice'
import LoadingSpinner from './components/LoadingSpinner'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import EditLecture from './pages/admin/lecture/EditLecture'
import CreateLecture from './pages/admin/lecture/CreateLecture'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path: "/",
        element: (
          <Home/>
        )
      },
      {
        path: "/auth",
        element: <Auth/>
      },
      {
        path: "/profile",
        element: <ProfilePage/>
      },
      {
        path: "/mylearning",
        element: <MyLeariningPage/>
      },

      // admin routes start from here
      {
        path: "/admin",
        element: (
          <Sidebar/>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ]
      }
      
    ]
  }
])

const App = () => {
  const dispatch = useDispatch();
  const { data, isSuccess ,isLoading } = useGetUserProfileQuery();

  

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(userLoggedIn(data));
    }
  }, [isSuccess, data, dispatch]);

  if(isLoading) return (
    <LoadingSpinner/>
  )

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App