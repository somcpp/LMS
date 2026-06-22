import { useGet_Courses_Detail_With_StatusQuery } from "@/api/purchaseApi";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";


export const ProtectedRoute = ({children}) => {
  const {isAuthenticated} = useSelector((state) => state.auth);
  if(!isAuthenticated) {
    return <Navigate to="/auth"/>
  }
  return children;
}

export const AuthenticatedUser = ({children}) => {
  const {isAuthenticated} = useSelector((state) => state.auth);

  if(isAuthenticated) {
    return <Navigate to='/'/>
  }
  return children;
}

export const AdminRoute = ({children}) => {
  const {user, isAuthenticated} = useSelector((state) => state.auth);
  if(!isAuthenticated) {
    return <Navigate to={"/auth"} />
  }
  if(user.role !== "instructor") {
    return <Navigate to="/" />
  }
  return children;
}

export const PurchasedCourse = ({children}) => {
  const {courseId} = useParams();
  const {data, isLoading} = useGet_Courses_Detail_With_StatusQuery();
  if(isLoading) return <h1>Loading...</h1>
  return data?.purchased ? children : <Navigate to={`/course-detail/${courseId}`} />
}