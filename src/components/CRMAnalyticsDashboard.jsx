import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function CRMAnalyticsDashboard({ studentLeads = [] }) {
  const analytics = useMemo(() => {
    const totalLeads = studentLeads.length;
    const enrolled = studentLeads.filter(
      (lead) => lead.stage === "Enrolled"
    ).length;
    const visa = studentLeads.filter(
      (lead) => lead.stage === "Visa"
    ).length;
    const pendingFollowups = studentLeads.filter(
      (lead) => lead.followupDate
    ).length;

    const countryMap = {};
    const monthMap = {};
    const stageMap = {};

    studentLeads.forEach((lead) => {
      countryMap[lead.country] = (countryMap[lead.country] || 0) + 1;
      stageMap[lead.stage] = (stageMap[lead.stage] || 0) + 1;

      if (lead.leadDate) {
        const month = lead.leadDate.slice(0, 7);
        monthMap[month] = (monthMap[month] || 0) + 1;
      }
    });

    return {
      totalLeads,
      enrolled,
      visa,
      pendingFollowups,
      countryData: Object.entries(countryMap).map(([name, value]) => ({
        name,
        value,
      })),
      monthlyData: Object.entries(monthMap).map(([month, leads]) => ({
        month,
        leads,
      })),
      stageData: Object.entries(stageMap).map(([name, value]) => ({
        name,
        value,
      })),
    };
  }, [studentLeads]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 CRM Analytics Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div className="analytics-card">
          <h3>Total Leads</h3>
          <h2>{analytics.totalLeads}</h2>
        </div>

        <div className="analytics-card">
          <h3>Visa Stage</h3>
          <h2>{analytics.visa}</h2>
        </div>

        <div className="analytics-card">
          <h3>Enrolled</h3>
          <h2>{analytics.enrolled}</h2>
        </div>

        <div className="analytics-card">
          <h3>Pending Follow-ups</h3>
          <h2>{analytics.pendingFollowups}</h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div className="analytics-card">
          <h3>📈 Monthly Leads</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card">
          <h3>🌍 Country Wise Leads</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.countryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {analytics.countryData.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-card" style={{ marginTop: "20px" }}>
        <h3>🧭 Pipeline Stages</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.stageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}