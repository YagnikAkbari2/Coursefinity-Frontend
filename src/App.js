import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import CourseDetailPage from "./pages/CourseDetail";
import FavouriteCoursesPage from "./pages/FavouriteCourse";
import AppLayout from "./pages/AppLayout";

import { loader as getCourseList } from "./features/course/Courses";
import { loader as getCourseById } from "./pages/CourseDetail";
import { action as logoutAction } from "./pages/Logout";
import { loader as favouriteCourseLoader } from "./features/course/components/FavouriteCourses";

import ResetPasswordPage from "./pages/ResetPasword";
import ResetEmailPage from "./pages/ResetEmail";
import { useEffect } from "react";
import { login } from "./features/auth/auth-slice";
import { useDispatch } from "react-redux";
import StripeCheckout from "./pages/StripeCheckout";
import Protected from "./features/auth/components/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <AppLayout />,

    children: [
      {
        index: true,
        element: <HomePage />,
        loader: getCourseList,
      },
      {
        path: ":courseId",
        element: <CourseDetailPage />,
        loader: getCourseById,
      },
      {
        path: "wishlist",
        element: (
          <Protected>
            <FavouriteCoursesPage />
          </Protected>
        ),
        loader: favouriteCourseLoader,
      },
    ],
  },
  {
    path: "/auth/signup",
    element: <SignupPage />,
  },
  {
    path: "/auth/signin",
    element: <SigninPage />,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/reset-email",
    element: <ResetEmailPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/course-checkout/:courseId",
    element: (
      <Protected>
        <StripeCheckout />
      </Protected>
    ),
  },
]);
const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("user");
  useEffect(() => {
    if (isLoggedIn !== null) {
      dispatch(login({ role: "learner" }));
    }
  }, [isLoggedIn, dispatch]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;

// {
//   "courseTitle": "The Complete JavaScript Course 2023: From Zero to Expert!",
//   "courseDescription": "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
//   "courseAuthor": "Jonas Schmedtmann",
//   "courseImageUrl": "https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg",
//   "coursePrice": 99.99,
//   "courseIntroVideoUrl": "vDQ9GZsJkms",
//   "courseLanguage": "English",
//   "courseDuration": "6 weeks",
//   "courseCategory": "Design",
//   "courseTotalQuiz": 26,
//   "courseTotalAssignment": 5,
//   "courseAuthorImage": "https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg",
//   "courseModules": [
//     {
//       "moduleTitle": "Welcome, Welcome, Welcome!",
//       "moduleDescription": [
//         {
//           "title": "Course Structure and Projects",
//           "duration": "02:15",
//           "url": "vDQ9GZsJkms",
//           "type": "video"
//         },
//         {
//           "title": "Read Before You Start!",
//           "duration": "01:23",
//           "url": "https://wesbos.com/javascript",
//           "type": "notes"
//         },
//         {
//           "title": "Watch Before You Start!",
//           "duration": "10:15",
//           "url": "vDQ9GZsJkms",
//           "type": "video"
//         },
//         {
//           "title": "Setting Up Our Code Editor",
//           "duration": "10:15",
//           "url": "vDQ9GZsJkms",
//           "type": "video"
//         }
//       ]
//     }
//   ]
// }
