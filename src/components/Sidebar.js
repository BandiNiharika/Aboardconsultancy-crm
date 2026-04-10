import React from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <h2>Red Star CRM</h2>
      <button onClick={() => setActiveTab("students")}>🎓 Students</button>
      <button onClick={() => setActiveTab("followups")}>📅 Follow-ups</button>
      <button onClick={() => setActiveTab("visit")}>✈️ Visit Visa</button>
      <button onClick={() => setActiveTab("work")}>💼 Work Visa</button>
    </aside>
  );
}