import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";



import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundPage } from "@/pages/404";
import { EmailVerificationPage } from "@/pages/Auth/EmailVerification";
import { ForgotPassword } from "@/pages/Auth/ForgotPassword";
import { ResetPassword } from "@/pages/Auth/ResetPassword";
import { VerificationPage } from "@/pages/Auth/Verification";
import { LoginPage } from "@/pages/Auth/login";
import { RegisterPage } from "@/pages/Auth/register";
import { HomePage } from "@/pages/home";
import { MentorViewerPage } from "@/pages/mentor/viewer";



import { DashboardLayout } from "./layouts/DashboardLayout";
import { FooterLayout } from "./layouts/FooterLayout";
import { NavLayout } from "./layouts/NavLayout";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { ChatPage } from "./pages/chat";
import { Contact } from "./pages/contact";
import { CourseInfo } from "./pages/courseInfo";
import { CourseVideo } from "./pages/courseVideo";
import { CoursesPage } from "./pages/courses";
import { DashboardCourses } from "./pages/dashboard/courses";
import { DashboardMain } from "./pages/dashboard/main";
import { DashboardMentors } from "./pages/dashboard/mentors";
import { OrderDetails } from "./pages/dashboard/orderDetails";
import { DashboardOrders } from "./pages/dashboard/ordersList";
import { EditProfile } from "./pages/editProfile";
import BeMentorForm from "./pages/mentor/beMentor";
import MentorPage from "./pages/mentors";
import { Pricing } from "./pages/pricing";
import Profile from "./pages/profile";
import { Quiz } from "./pages/quiz";
import { Roadmap } from "./pages/roadmap";
import { Track } from "./pages/track";


export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>404</div>}>
      <Route path="/">
        <Route element={<AppLayout />}>
          <Route element={<NavLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/quiz/:trackName" element={<Quiz />} />
              {/* Profile Route */}
              <Route path="profile" element={<Profile />} />
              <Route path="profile/edit" element={<EditProfile />} />
            </Route>
            {/* Mentor Routes */}
            <Route path="mentor/:id" element={<MentorViewerPage />} />
            <Route element={<FooterLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/mentors" element={<MentorPage />} />
              <Route path="/track/:id" element={<Track />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/course/:id" element={<CourseInfo />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/be-a-mentor" element={<BeMentorForm />} />
                <Route path="/course/lecture/:id" element={<CourseVideo />} />
                <Route path="/roadmap" element={<Roadmap />} />
              </Route>
            </Route>
          </Route>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="main" element={<DashboardMain />} />
            <Route path="courses" element={<DashboardCourses />} />
            <Route path="mentors" element={<DashboardMentors />} />
            <Route path="orders-list" element={<DashboardOrders />} />
            <Route path="orders-list/:orderId" element={<OrderDetails />} />
          </Route>

          {/* Chat Routes */}
          <Route path="chat/coursanity-assistant" element={<ChatPage />} />
        </Route>
      </Route>

      {/* Authentication Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="auth/verify/email/:code" element={<EmailVerificationPage />} />
        <Route path="auth/verification" element={<VerificationPage />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="auth/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);