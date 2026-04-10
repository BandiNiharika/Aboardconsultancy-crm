import React, { useState } from "react";
import { exportToExcel } from "../utils/exportToExcel";
import { importFromExcel } from "../utils/importFromExcel";

const pipelineStages = [
  "New Lead",
  "Contacted",
  "Documents Pending",
  "Applied for University",
  "Offer Letter",
  "Visa",
  "Enrolled",
];

const countries = [
  "Ireland",
  "UK",
  "Canada",
  "Australia",
  "USA",
  "Germany",
];

const qualifications = [
  "B.Tech",
  "B.Sc",
  "B.Com",
  "MBA",
  "MCA",
  "Diploma",
  "Intermediate",
];

export default function StudentBoard({
  studentLeads,
  setStudentLeads,
  today,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [reportType, setReportType] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "Ireland",
    intake: "",
    graduation: "B.Tech",
    stage: "New Lead",
    leadDate: today,
    followupDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      country: "Ireland",
      intake: "",
      graduation: "B.Tech",
      stage: "New Lead",
      leadDate: today,
      followupDate: "",
      notes: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const saveLead = () => {
    if (!formData.name || !formData.phone) return;

    if (editingId) {
      setStudentLeads((prev) =>
        prev.map((lead) =>
          lead.id === editingId ? { ...formData, id: editingId } : lead
        )
      );
    } else {
      setStudentLeads([...studentLeads, { ...formData, id: Date.now() }]);
    }

    resetForm();
  };

  const deleteLead = (id) => {
    setStudentLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const editLead = (lead) => {
    setFormData(lead);
    setEditingId(lead.id);
    setShowForm(true);
  };

  const updateLeadStage = (id, value) => {
    setStudentLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, stage: value } : lead
      )
    );
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    importFromExcel(file, (rows) => {
      const formattedRows = rows.map((row) => ({
        id: Date.now() + Math.random(),
        name: row.name || "",
        phone: row.phone || "",
        email: row.email || "",
        country: row.country || "Ireland",
        intake: row.intake || "",
        graduation: row.graduation || "B.Tech",
        stage: row.stage || "New Lead",
        leadDate: row.leadDate || today,
        followupDate: row.followupDate || "",
        notes: row.notes || "",
      }));

      setStudentLeads((prev) => [...prev, ...formattedRows]);
    });
  };

  const filteredLeads = studentLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
  );

  const getDateFilteredLeads = () => {
    const now = new Date();
    let fromDate = null;
    let toDate = null;

    if (reportType === "today") {
      fromDate = today;
      toDate = today;
    }

    if (reportType === "week") {
      const last7 = new Date();
      last7.setDate(now.getDate() - 7);
      fromDate = last7.toISOString().split("T")[0];
      toDate = today;
    }

    if (reportType === "month") {
      fromDate = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-01`;
      toDate = today;
    }

    if (reportType === "year") {
      fromDate = `${now.getFullYear()}-01-01`;
      toDate = today;
    }

    if (reportType === "custom") {
      fromDate = customFrom;
      toDate = customTo;
    }

    return filteredLeads.filter((lead) => {
      if (!fromDate || !toDate) return true;
      return lead.leadDate >= fromDate && lead.leadDate <= toDate;
    });
  };

  const reportLeads = getDateFilteredLeads();

  return (
    <div className="board-section">
      <div className="board-header">
        <h2>🎓 Student Leads Board</h2>

        <div className="board-actions">
          <button
            className="primary-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {editingId ? "Edit Lead" : "+ Add Student Lead"}
          </button>

          <label className="primary-btn" style={{ cursor: "pointer" }}>
            📥 Import Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              style={{ display: "none" }}
            />
          </label>

          <select
            className="uniform-select"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="custom">Custom</option>
          </select>

          {reportType === "custom" && (
            <>
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
              />
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
              />
            </>
          )}

          <button
            className="primary-btn"
            onClick={() => exportToExcel(reportLeads, "student_report")}
          >
            📊 Export Report
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-box">
          <input name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

          <select className="uniform-select" name="country" value={formData.country} onChange={handleChange}>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>

          <input name="intake" placeholder="Intake" value={formData.intake} onChange={handleChange} />

          <select className="uniform-select" name="graduation" value={formData.graduation} onChange={handleChange}>
            {qualifications.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>

          <input type="date" name="leadDate" value={formData.leadDate} onChange={handleChange} />
          <input type="date" name="followupDate" value={formData.followupDate} onChange={handleChange} />
          <textarea name="notes" placeholder="Counsellor Notes" value={formData.notes} onChange={handleChange} />

          <button className="save-btn" onClick={saveLead}>
            {editingId ? "Update Lead" : "Save Lead"}
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />

      <div style={{ overflowX: "auto" }}>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Country</th>
              <th>Qualification</th>
              <th>Lead Date</th>
              <th>Follow-up</th>
              <th>Pipeline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>{lead.country}</td>
                <td>{lead.graduation}</td>
                <td>{lead.leadDate}</td>
                <td>{lead.followupDate}</td>
                <td>
                  <select
                    className="uniform-select"
                    value={lead.stage}
                    onChange={(e) =>
                      updateLeadStage(lead.id, e.target.value)
                    }
                  >
                    {pipelineStages.map((stage) => (
                      <option key={stage}>{stage}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => editLead(lead)}>Edit</button>
                  <button onClick={() => deleteLead(lead.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}