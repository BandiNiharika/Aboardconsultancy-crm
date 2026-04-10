import React, { useState } from "react";
import { exportToExcel } from "../utils/exportToExcel";

const countries = ["UK", "USA", "Canada", "Australia", "Germany", "Dubai"];

export default function VisitVisaBoard({ today }) {
  const [visitLeads, setVisitLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "UK",
    purpose: "",
    travelDate: "",
    followupDate: "",
    notes: "",
    leadDate: today,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveLead = () => {
    if (!formData.name || !formData.phone) return;

    setVisitLeads([...visitLeads, { ...formData, id: Date.now() }]);

    setFormData({
      name: "",
      phone: "",
      country: "UK",
      purpose: "",
      travelDate: "",
      followupDate: "",
      notes: "",
      leadDate: today,
    });

    setShowForm(false);
  };

  return (
    <div className="board-section">
      <div className="board-header">
        <h2>✈️ Visit Visa Board</h2>

        <div className="board-actions">
          <button
            className="primary-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Visit Lead
          </button>

          <button
            className="primary-btn"
            onClick={() => exportToExcel(visitLeads, "visit_visa_leads")}
          >
            📤 Export Excel
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-box">
          <input name="name" placeholder="Client Name" value={formData.name} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

          <select className="uniform-select" name="country" value={formData.country} onChange={handleChange}>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>

          <input name="purpose" placeholder="Purpose of Visit" value={formData.purpose} onChange={handleChange} />
          <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} />
          <input type="date" name="followupDate" value={formData.followupDate} onChange={handleChange} />
          <textarea name="notes" placeholder="Extra Notes" value={formData.notes} onChange={handleChange} />

          <button className="save-btn" onClick={saveLead}>Save Lead</button>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Purpose</th>
              <th>Travel Date</th>
              <th>Follow-up</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {visitLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.country}</td>
                <td>{lead.purpose}</td>
                <td>{lead.travelDate}</td>
                <td>{lead.followupDate}</td>
                <td>{lead.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
