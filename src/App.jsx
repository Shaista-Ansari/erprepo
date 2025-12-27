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
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-student-result"
            element={
              <ProtectedRoute>
                <AddStudentResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-result"
            element={
              <ProtectedRoute>
                <EditResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-results-admin"
            element={
              <ProtectedRoute>
                <ViewResults />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-results-student"
            element={
              <ProtectedRoute>
                <ViewResultsStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-teachers"
            element={
              <ProtectedRoute>
                <ManageTeachers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results-table"
            element={
              <ProtectedRoute>
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
