import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import AdminDashboard from "./AdminDashboard";
import AddStudentResult from "./AddStudentResult";
import EditResult from "./EditResult";
import ViewResults from "./ViewResults"; 
import AuthProvider from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ManageTeachers from "./ManageTeachers";
import ViewResultsStudent from "./ViewResultsStudent";
import ResultsTable from "./ResultsTable"

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-student-result"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <AddStudentResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-result"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <EditResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-results-admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ViewResults />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-results-student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ViewResultsStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-teachers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageTeachers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results-table"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ResultsTable />
              </ProtectedRoute>
            }
          />

          
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
