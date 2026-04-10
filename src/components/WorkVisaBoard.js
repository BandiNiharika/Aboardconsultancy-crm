import React, { useState } from "react";
import { exportToExcel } from "../utils/exportToExcel";

const countries = ["Germany", "UK", "Canada", "Dubai", "Poland", "Australia"];

export default function WorkVisaBoard({ today }) {
  const [workLeads, setWorkLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "Germany",
    jobRole: "",
    experience: "",
    followupDate: "",
    notes: "",
    leadDate: today,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveLead = () => {
    if (!formData.name || !formData.phone) return;

    setWorkLeads([...workLeads, { ...formData, id: Date.now() }]);
    setShowForm(false);
  };

  return (
    <div className="board-header">
  <h2>💼 Work Visa Board</h2>

  <div className="board-actions">
    <button
      className="primary-btn"
      onClick={() => setShowForm(!showForm)}
    >
      + Add Work Lead
    </button>

    <button
      className="primary-btn"
      onClick={() => exportToExcel(workLeads, "work_visa_leads")}
    >
      📤 Export Excel
    </button>
  </div>

    

      {showForm && (
        <div className="form-box">
          <input name="name" placeholder="Candidate Name" value={formData.name} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

          <select className="uniform-select" name="country" value={formData.country} onChange={handleChange}>
            {countries.map((country) => <option key={country}>{country}</option>)}
          </select>

          <input name="jobRole" placeholder="Job Role / Occupation" value={formData.jobRole} onChange={handleChange} />
          <input name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} />

          <div>
            <label>Next Follow-up Date</label>
            <input type="date" name="followupDate" value={formData.followupDate} onChange={handleChange} />
          </div>

          <textarea name="notes" placeholder="Extra Candidate Notes" value={formData.notes} onChange={handleChange} />

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
        <th>Job Role</th>
        <th>Experience</th>
        <th>Follow-up</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
        {workLeads.map((lead) => (
        <tr key={lead.id}>
          <td>{lead.name}</td>
          <td>{lead.phone}</td>
          <td>{lead.country}</td>
          <td>{lead.jobRole}</td>
          <td>{lead.experience}</td>
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