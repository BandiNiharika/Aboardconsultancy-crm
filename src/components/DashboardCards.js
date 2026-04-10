import React from "react";

export default function DashboardCards({
  studentLeads = [],
  visitLeads = [],
  workLeads = [],
  today,
}) {
  const todayFollowups = studentLeads.filter(
    (lead) => lead.followupDate === today
  ).length;

  const overdue = studentLeads.filter(
    (lead) => lead.followupDate && lead.followupDate < today
  ).length;

  return (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>🎓 Total Students</h3>
        <p>{studentLeads.length}</p>
      </div>

      <div className="dashboard-card">
        <h3>📅 Today Follow-ups</h3>
        <p>{todayFollowups}</p>
      </div>

      <div className="dashboard-card">
        <h3>✈️ Visit Leads</h3>
        <p>{visitLeads.length}</p>
      </div>

      <div className="dashboard-card">
        <h3>💼 Work Leads</h3>
        <p>{workLeads.length}</p>
      </div>

      <div className="dashboard-card">
        <h3>⚠️ Overdue</h3>
        <p>{overdue}</p>
      </div>
      <div className="card">
  <h3>🔴 Overdue</h3>
  <h2>{overdueFollowups}</h2>
</div>

<div className="card">
  <h3>🟡 Today</h3>
  <h2>{todayFollowups}</h2>
</div>

<div className="card">
  <h3>🟢 Upcoming</h3>
  <h2>{upcomingFollowups}</h2>
</div>
    </div>
  );
}