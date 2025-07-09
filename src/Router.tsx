import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';
import { AdminLayout } from './components/Layout/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardPage } from './pages/admin/Dashboard.page';
import { UsersPage } from './pages/admin/Users.page';
import { OrganizationsPage } from './pages/admin/Organizations.page';
import { ReportsPage } from './pages/admin/Reports.page';
import { AnalyticsPage } from './pages/admin/Analytics.page';
import { SettingsPage } from './pages/admin/Settings.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout><DashboardPage /></AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute>
        <AdminLayout><UsersPage /></AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/organizations',
    element: (
      <ProtectedRoute>
        <AdminLayout><OrganizationsPage /></AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <ProtectedRoute>
        <AdminLayout><ReportsPage /></AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <ProtectedRoute>
        <AdminLayout><AnalyticsPage /></AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <ProtectedRoute>
        <AdminLayout><SettingsPage /></AdminLayout>
      </ProtectedRoute>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
