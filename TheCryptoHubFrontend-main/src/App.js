import "./App.css";
import Home from "./Pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AmbassadorPage from "./Pages/AmbassadorPage";
import UserAdmin from "./Components/Admin/UserAdmin/UserAdmin";
import LoginAdminPage from "./Pages/LoginAdminPage";
import AmbassadorsAdmin from "./Components/Admin/AmbassadorsAdmin/AmbassadorsAdmin";
import AmbassadorsVerified from "./Components/Admin/AmbassadorVerified/AmbassadorVerified";
import InvestorsAdmin from "./Components/Admin/InvestorsAdmin/InvestorsAdmin";
import InvestorsVerified from "./Components/Admin/InvestorsVerified/InvestorsVerified";
import FoundersAdmin from "./Components/Admin/FoundersAdmin/FoundersAdmin";
import FoundersVerified from "./Components/Admin/FoundersVerified/FoundersVerified";
import AddPartner from "./Components/Admin/AddPartner/AddPartner";
import AddPodcast from "./Components/Admin/AddPodcast/AddPodcast";
import AddBanner from "./Components/Admin/AddBanner/AddBanner";

import AddProject from "./Components/Admin/CreateProject";
import AddBlog from "./Components/Admin/CreateBlog";
import AddEvent from "./Components/Admin/CreateEvent";
import UserAddProject from "./Pages/UserAddProject"
import UserAddBlog from "./Pages/UserAddBlog"
import UserAddEvent from "./Pages/UserAddEvent"


import Others from "./Components/Admin/Other/Other";
import ProjectsPage from "./Pages/ProjectsPage";
import ProjectDetailPage from "./Pages/ProjectDetailPage";
import BlogsPage from "./Pages/BlogsPage";
import CommingSoonPage from "./Pages/CommingSoonPage";
import VerificationCodePage from "./Pages/VerificationCodePage";
import VerificationCodePageNew from "./Pages/VerificationCodePageNew";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ProjectsAdmin from "./Components/Admin/ProjectsAdmin/ProjectsAdmin";
import EventsAdmin from "./Components/Admin/EventsAdmin/EventsAdmin";
import BlogsAdmin from './Components/Admin/BlogsAdmin/BlogsAdmin';
import PartnersAdmin from "./Components/Admin/PartnersAdmin/PartnersAdmin";
import PodcastsAdmin from "./Components/Admin/PodcastsAdmin/PodcastsAdmin";
import PageNotFound from "./Pages/PageNotFound";
import EventListing from "./Pages/eventListing";
import PastEventListing from "./Pages/PasteventListing";
import EventDetails from "./Pages/eventDetails";
import BlogDetail from "./Pages/BlogDetail";
import ProjectRequestsAdmin from "./Components/Admin/ProjectRequestsAdmin/ProjectRequestsAdmin";
import BlogRequests from "./Components/Admin/BlogRequestsAdmin/BlogRequestsAdmin";
import CreateProject from "./Components/Admin/CreateProject";
import CreateBlog from "./Components/Admin/CreateBlog";
import CreateEvent from "./Components/Admin/CreateEvent";
import EventRequests from "./Components/Admin/EventRequestsAdmin/EventRequestsAdmin";
import ContactUsPage from "./Pages/ContactUsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin Routes */}
          <Route path="/admin/users" element={<ProtectedRoute element={UserAdmin} />} />
        <Route path="/admin/ManageProjects" element={<ProtectedRoute element={ProjectsAdmin} />} />
        <Route path="/admin/ManageProjectRequests" element={<ProtectedRoute element={ProjectRequestsAdmin} />} />
        <Route path="/admin/ManageEvents" element={<ProtectedRoute element={EventsAdmin} />} />
        <Route path="/admin/ManageBlogs" element={<ProtectedRoute element={BlogsAdmin} />} />
        <Route path="/admin/ManagePartners" element={<ProtectedRoute element={PartnersAdmin} />} />
        <Route path="/admin/ManagePodcasts" element={<ProtectedRoute element={PodcastsAdmin} />} />
        <Route path="/admin/login" element={<ProtectedRoute element={LoginAdminPage} />} />
        <Route path="/admin" element={<ProtectedRoute element={LoginAdminPage} />} />
        <Route path="/admin/ambassadors" element={<ProtectedRoute element={AmbassadorsAdmin} />} />
        <Route path="/admin/amb/verified" element={<ProtectedRoute element={AmbassadorsVerified} />} />
        <Route path="/admin/investors" element={<ProtectedRoute element={InvestorsAdmin} />} />
        <Route path="/admin/investors/verified" element={<ProtectedRoute element={InvestorsVerified} />} />
        <Route path="/admin/founders" element={<ProtectedRoute element={FoundersAdmin} />} />
        <Route path="/admin/founders/verified" element={<ProtectedRoute element={FoundersVerified} />} />
        <Route path="/admin/others" element={<ProtectedRoute element={Others} />} />
        <Route path="/admin/AddPartner" element={<ProtectedRoute element={AddPartner} />} />
        <Route path="/admin/AddPodcast" element={<ProtectedRoute element={AddPodcast} />} />
        <Route path="/admin/AddAnnouncement" element={<ProtectedRoute element={AddBanner} />} />
        
        <Route path="/admin/AddProject" element={<ProtectedRoute element={AddProject} />} />
        <Route path="/admin/AddBlog" element={<ProtectedRoute element={AddBlog} />} />
        <Route path="/admin/AddEvent" element={<ProtectedRoute element={AddEvent} />} />
        <Route path="/user/AddProject" element={<ProtectedRoute element={UserAddProject} />} />
        <Route path="/user/AddBlog" element={<ProtectedRoute element={UserAddBlog} />} />
         <Route path="/user/AddEvent" element={<ProtectedRoute element={UserAddEvent} />} />
        <Route path="/admin/ProjectRequests" element={<ProtectedRoute element={ProjectRequestsAdmin} />} />
        <Route path="/admin/BlogRequests" element={<ProtectedRoute element={BlogRequests} />} />
        <Route path="/admin/EventRequests" element={<ProtectedRoute element={EventRequests} />} />


          {/* Auth Routes */}
          <Route path="/user/signup" element={<SignupPage />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/user/forgot/password" element={<ForgotPasswordPage />} />
          <Route path="/user/reset/password" element={<ResetPasswordPage />} />
          <Route path="/user/join/crypto" element={<AmbassadorPage />} />
          <Route path="/user/verify" element={<VerificationCodePage />} />
          <Route path="/user/verifyUser" element={<VerificationCodePageNew />} />
          <Route path="/user/contact" element={<ContactUsPage />} />

          {/* User Routes */}
          <Route path="/user/projects" element={<ProjectsPage />} />
          <Route path="/user/projectDetail/:projectId" element={<ProjectDetailPage />} />
          <Route path="/user/blogs" element={<BlogsPage />} />
          <Route path="/user/privacy/policy" element={<PrivacyPolicy />} />
          <Route path="/user/coming/soon" element={<CommingSoonPage />} />
          {/* {routes made by ali} */}
          <Route path="/user/events" element={<EventListing/>} />
          <Route path="/user/past/events" element={<PastEventListing/>} />
          
          <Route path="/user/eventDetails/:eventId" element={<EventDetails/>} />
          <Route path="/user/blogDetail/:blogId" element={<BlogDetail/>} />
          
          {/* new routes by ali */}
          <Route path="/user/createProject" element={<CreateProject/>} />
          <Route path="/user/createBlog" element={<CreateBlog/>}/>
          <Route path="/user/createEvent" element={<CreateEvent/>}/>

          {/* Wildcard Route for Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;