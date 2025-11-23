import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalToastHandler } from "./components/GlobalToastHandler";
import { Toaster } from "./components/ui/toaster";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardOverviewPage from "@/pages/dashboard/dashboardOverviewPage/DashboardOverviewPage";
import DashboardSettingsPage from "@/pages/dashboard/DashboardSettingsPage";
import DashboardAboutPage from "@/pages/dashboard/DashboardAboutPage";

import DashboardWorkplacesSettingsPage from "./pages/dashboard/dashboardWorkplacesSettingsPage/DashboardWorkplacesSettingsPage";
import DashboardWorkplacePage from "./pages/dashboard/dashboardWorkplacePage/DashboardWorkplacePage";
import DashboardAllCoursesPage from "@/pages/dashboard/dashboardAllCoursesPage/DashboardAllCoursesPage";
import DashboardCourseSettingsPage from "./pages/dashboard/dashboardCourseSettingsPage/DashboardCourseSettingsPage";
import DashboardCoursePage from "./pages/dashboard/dashboardCoursePage/DashboardCoursePage";
import DashboardLessonPage from "./pages/dashboard/dashboardLessonPage/dashboardLessonPage";

function App() {
  return (
    <>
      <GlobalToastHandler />
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverviewPage />} />

          <Route path="workplace/:id" element={<DashboardWorkplacePage />} />
          <Route path="workplaces" element={<DashboardWorkplacesSettingsPage />} />

          <Route path="courses" element={<DashboardAllCoursesPage />} />
          <Route path="courses/:id" element={<DashboardCoursePage />} />
          <Route path="courses/:id/settings" element={<DashboardCourseSettingsPage />} />

          <Route path="courses/:courseId/lessons/:lessonId" element={<DashboardLessonPage />} />

          <Route path="settings" element={<DashboardSettingsPage />} />
          <Route path="about" element={<DashboardAboutPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;