import { createBrowserRouter } from 'react-router-dom';
import StudentListPage from './App';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDetailPage } from './pages/StudentDetailPage';
import { SubmitStudentPage } from './pages/SubmitStudentPage';

// add SubmitStudentPage to the router at the path '/student/submit'
export const router = createBrowserRouter([
  { path: '/', element: <StudentListPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/student/:id', element: <StudentDetailPage /> },
  { path: '/student/submit', element: <SubmitStudentPage /> },
]);
