import React, { useEffect } from "react";
import "./dashboard.css";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import GroupIcon from "@mui/icons-material/Group";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";

export default function AdminDashboard() {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = "#f6f7fb";
    document.body.style.display = "block";
    document.body.style.minHeight = "100vh";
  }, []);

  const activities = [
    { title: "New results uploaded for Grade 10A", time: "2 hours ago", color: "#8b5cf6" },
    { title: "5 new students registered", time: "4 hours ago", color: "#10b981" },
    { title: "Results updated for Chemistry", time: "1 day ago", color: "#0ea5e9" },
  ];

  const quickStats = [
    { label: "Pass Rate", value: "94.2%" },
    { label: "Average Score", value: "78.5" },
    { label: "Pending Reviews", value: "23" },
    { label: "Subjects Covered", value: "12" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <p>Manage your academic results efficiently</p>
        <nav className="nav">

          {(userRole === "admin" || userRole === "teacher") && (
          <button className="nav-btn active" onClick={() => navigate("/dashboard")}>
            <HomeIcon fontSize="small" /> Home
          </button>
          )}

          {(userRole === "admin" || userRole === "teacher") && (
          <button className="nav-btn" onClick={() => navigate("/add-student-result")}>
            <AddBoxIcon fontSize="small" /> Add Student Result
          </button>
          )}

          {(userRole === "admin" || userRole === "teacher") && (
          <button className="nav-btn" onClick={() => navigate("/edit-result")}>
            <EditIcon fontSize="small" /> Edit Result
          </button>
          )}

          {userRole === "admin" && (
          <button className="nav-btn" onClick={() => navigate("/view-results-admin")}>
            <VisibilityIcon fontSize="small" /> View Results (Admin)
          </button>
          )}

          {userRole === "admin" && (
          <button className="nav-btn" onClick={() => navigate("/manage-teachers")}>
            <GroupIcon fontSize="small" /> Manage Teachers
          </button>
          )}

          {(userRole === "student" || userRole === "admin" ) && (
          <button className="nav-btn" onClick={() => navigate("/view-results-student")}>
            <VisibilityIcon fontSize="small" /> View Results (Student)
          </button>
          )}

          {userRole === "admin" && (
          <button className="nav-btn" onClick={() => navigate("/results-table")}>
            <VisibilityIcon fontSize="small" /> Results Table
          </button>
          )}

        </nav>
        <div className="logout-area">
          <button className="nav-btn" onClick={handleLogout}>
            <LogoutIcon fontSize="small" /> Logout
          </button>
        </div>
      </aside>

      <main className="main">
        <div className="header">
          <button className="icon-btn">
            <NotificationsNoneIcon fontSize="small" />
            <span className="dot" />
          </button>
          <div style={{ width: 1, height: 32, background: "#e2e8f0" }} />
          <div style={{ fontSize: 14, color: "#334155" }}>
            Welcome <b style={{ color: "#0f172a" }}>Admin</b>
          </div>
        </div>

        <div className="kpis">
          <div className="card kpi">
            <div className="icon-box"><GroupIcon fontSize="small" /></div>
            <div>
              <div className="meta">Total Students</div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <div className="value">1,247</div>
                <div className="trend up"><TrendingUpIcon fontSize="inherit" /> +12% from last month</div>
              </div>
            </div>
          </div>

          <div className="card kpi">
            <div className="icon-box"><CloudUploadIcon fontSize="small" /></div>
            <div>
              <div className="meta">Results Uploaded</div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <div className="value">342</div>
                <div className="trend up"><TrendingUpIcon fontSize="inherit" /> +8% from last week</div>
              </div>
            </div>
          </div>

          <div className="card kpi">
            <div className="icon-box"><AccessTimeIcon fontSize="small" /></div>
            <div>
              <div className="meta">Last Updated</div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <div className="value">2 hours ago</div>
                <div className="trend"><span>Mathematics · Grade 12</span></div>
              </div>
            </div>
          </div>

          <div className="card kpi">
            <div className="icon-box"><CheckCircleIcon fontSize="small" /></div>
            <div>
              <div className="meta">Teachers Active</div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <div className="value">89</div>
                <div className="trend up">Currently online</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-2-1">
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 style={{ fontSize: 16 }}>Recent Activity</h3>
              <button className="nav-btn" style={{ padding: 6 }}>
                View All <ChevronRightIcon fontSize="small" />
              </button>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {activities.map((a, i) => (
                <div key={i} className="activity-item">
                  <span className="activity-dot" style={{ background: a.color }} />
                  <div>
                    <div style={{ fontSize: 14, color: "#0f172a" }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 style={{ fontSize: 16 }}>Quick Stats</h3>
              <button className="nav-btn" style={{ padding: 6 }}>
                Details <ChevronRightIcon fontSize="small" />
              </button>
            </div>
            <div>
              {quickStats.map((q, i) => (
                <div key={i} className="quick-row">
                  <span style={{ color: "#64748b" }}>{q.label}</span>
                  <b style={{ color: "#0f172a" }}>{q.value}</b>
                </div>
              ))}
            </div>

            <div className="tip">
              <div className="icon-box"><MenuBookIcon fontSize="small" /></div>
              <div>
                <b style={{ fontSize: 14 }}>Tip</b>
                <div style={{ fontSize: 12, color: "#334155" }}>
                  Keep subjects updated to improve analytics accuracy for each grade.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}