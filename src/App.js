import React, { useState, useEffect } from "react";
import StudentBoard from "./components/StudentBoard";
import VisitVisaBoard from "./components/VisitVisaBoard";
import WorkVisaBoard from "./components/WorkVisaBoard";
import FollowupBoard from "./components/FollowupBoard";
import CRMAnalyticsDashboard from "./components/CRMAnalyticsDashboard";
import "./App.css";

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [screen, setScreen] = useState(
  localStorage.getItem("crmScreen") || "welcome"
);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const [activeBoard, setActiveBoard] = useState("home");
  const [studentLeads, setStudentLeads] = useState([]);
  const [visitLeads, setVisitLeads] = useState([]);
  const [workLeads, setWorkLeads] = useState([]);
  const [dailyNote, setDailyNote] = useState("");
  
  // Load saved data
useEffect(() => {
  const savedStudents = localStorage.getItem("studentLeads");
  const savedVisit = localStorage.getItem("visitLeads");
  const savedWork = localStorage.getItem("workLeads");
  const savedNotes = localStorage.getItem("dailyNote");

  if (savedStudents) setStudentLeads(JSON.parse(savedStudents));
  if (savedVisit) setVisitLeads(JSON.parse(savedVisit));
  if (savedWork) setWorkLeads(JSON.parse(savedWork));
  if (savedNotes) setDailyNote(savedNotes);
}, []);

// Auto save data
useEffect(() => {
  localStorage.setItem("studentLeads", JSON.stringify(studentLeads));
}, [studentLeads]);

useEffect(() => {
  localStorage.setItem("visitLeads", JSON.stringify(visitLeads));
}, [visitLeads]);

useEffect(() => {
  localStorage.setItem("workLeads", JSON.stringify(workLeads));
}, [workLeads]);

useEffect(() => {
  localStorage.setItem("dailyNote", dailyNote);
}, [dailyNote]);

useEffect(() => {
  localStorage.setItem("crmScreen", screen);
}, [screen]);

  const todayFollowups = studentLeads.filter(
    (lead) => lead.followupDate === today
  ).length;

  const handleLogin = () => {
    if (
      loginData.username === "admin" &&
      loginData.password === "redstar123"
    ) {
      setScreen("dashboard");
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleLogin();
    }
  };

  if (screen === "welcome") {
    return (
      <div className="welcome-page">
        <img src="/logo192.png" alt="logo" className="welcome-logo" />
        <h1>Welcome to Red Star Immigration Services</h1>
        <button onClick={() => setScreen("login")}>Enter Dashboard</button>
      </div>
    );
  }

  if (screen === "login") {
    return (
      <div
        className="welcome-page"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="popup-box"
          style={{
            minWidth: "460px",
            background: "white",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src="/logo192.png"
              alt="logo"
              style={{ width: "70px", marginBottom: "10px" }}
            />
            <h2 style={{ margin: 0 }}>🔐 CRM Secure Login</h2>
            <p style={{ color: "#64748b", marginTop: "8px" }}>
              Enter your credentials to continue
            </p>
          </div>

          <label style={{ fontSize: "14px", fontWeight: "600" }}>
            User ID
          </label>
          <input
            type="text"
            placeholder="Enter user id"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />

          <label
            style={{
              fontSize: "14px",
              fontWeight: "600",
              display: "block",
              marginTop: "16px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            onKeyDown={handlePasswordKeyDown}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              marginTop: "22px",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "600",
            }}
          >
            Login to Dashboard
          </button>

          {loginError && (
            <p style={{ color: "red", marginTop: "12px", textAlign: "center" }}>
              {loginError}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    
    <div className="crm-layout">
      
      <header className="top-navbar">
        
        🌟 Consultancy Name CRM
        
      </header>
      
      

      <div className="dashboard-layout">
        <aside className="sidebar">
          <img src="/logo192.png" alt="logo" className="sidebar-logo" />
          <button onClick={() => setActiveBoard("home")}>🏠 Home</button>
          <button onClick={() => setActiveBoard("student")}>🎓 Students</button>
          <button onClick={() => setActiveBoard("visit")}>✈️ Visit Visa</button>
          <button onClick={() => setActiveBoard("work")}>💼 Work Visa</button>
          <button onClick={() => setActiveBoard("followup")}>📅 Follow-up</button>
          <button onClick={() => setActiveBoard("analytics")}>📈 Analytics</button>
        </aside>

        <main className="main-content">
          {activeBoard === "home" && (
            <>
              <div className="dashboard-cards">
                <div className="card"><h3>Total Student Leads</h3><h2>{studentLeads.length}</h2></div>
                <div className="card"><h3>Visit Visa Leads</h3><h2>{visitLeads.length}</h2></div>
                <div className="card"><h3>Work Visa Leads</h3><h2>{workLeads.length}</h2></div>
                <div className="card"><h3>Today's Follow-ups</h3><h2>{todayFollowups}</h2></div>
              </div>

              <div className="card" style={{ marginTop: "20px" }}>
                <h3>📝 Today Notes</h3>
                <textarea
                  rows="5"
                  value={dailyNote}
                  onChange={(e) => setDailyNote(e.target.value)}
                  placeholder="Write today's important office tasks..."
                  style={{ width: "100%", marginTop: "10px", padding: "10px" }}
                />
              </div>
            </>
          )}

          {activeBoard === "student" && (
            <StudentBoard
              studentLeads={studentLeads}
              setStudentLeads={setStudentLeads}
              today={today}
            />
          )}

          {activeBoard === "visit" && (
            <VisitVisaBoard
              visitLeads={visitLeads}
              setVisitLeads={setVisitLeads}
              today={today}
            />
          )}

          {activeBoard === "work" && (
            <WorkVisaBoard
              workLeads={workLeads}
              setWorkLeads={setWorkLeads}
              today={today}
            />
          )}

          {activeBoard === "followup" && (
            <FollowupBoard
              studentLeads={studentLeads}
              setStudentLeads={setStudentLeads}
              today={today}
            />
          )}

          {activeBoard === "analytics" && (
            <CRMAnalyticsDashboard studentLeads={studentLeads} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
