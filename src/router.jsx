import { createBrowserRouter } from 'react-router-dom';
import StudentListPage from './App';
import { StudentDetailPage } from './pages/StudentDetailPage';
import { SubmitStudentPage } from './pages/SubmitStudentPage';

// add SubmitStudentPage to the router at the path '/student/submit'
export const router = createBrowserRouter([
  { path: '/', element: <StudentListPage /> },
  { path: '/student/:id', element: <StudentDetailPage /> },
  { path: '/student/submit', element: <SubmitStudentPage /> },
]);
