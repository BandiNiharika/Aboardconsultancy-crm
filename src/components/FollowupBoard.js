import React, { useMemo, useState } from "react";

export default function FollowupBoard({
  studentLeads = [],
  setStudentLeads,
  today,
}) {
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [nextDate, setNextDate] = useState("");
  const [followupNote, setFollowupNote] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [historyLead, setHistoryLead] = useState(null);
  
  const followupLeads = useMemo(() => {
    return studentLeads.filter(
      (lead) => lead.followupDate && lead.followupDate >= today
    );
  }, [studentLeads, today]);
  

  const overdueLeads = studentLeads.filter(
  (lead) =>
    lead.followupDate &&
    lead.followupDate < today &&
    lead.lastFollowupDone !== today
);
  const markCompleted = (lead) => {
    setSelectedLead(lead);
    setNextDate("");
    setShowReschedule(true);
  };

  const saveCompletion = () => {
    if (!selectedLead) return;

    setStudentLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== selectedLead.id) return lead;

        
        return {
  ...lead,
  completedToday: true,
  followupDate: nextDate || lead.followupDate,
  lastFollowupDone: today,
  notes: `${lead.notes || ""}\n[${today}] ${followupNote}`,
};
      })
    );

    setShowReschedule(false);
    setSelectedLead(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Follow-up Task Board</h2>
      {overdueLeads.length > 0 && (
  <div
    style={{
      background: "#ffe5e5",
      border: "1px solid #ffb3b3",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px",
    }}
  >
    <h3>🔴 Overdue Follow-ups</h3>

    {overdueLeads.map((lead) => (
      <div key={lead.id} style={{ marginTop: "8px" }}>
        <strong>{lead.name}</strong> — missed on {lead.followupDate}
      </div>
    ))}
  </div>
)}

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Stage</th>
              <th>Follow-up Date</th>
              <th>Status</th>
              <th>Last Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {followupLeads.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No follow-up tasks available
                </td>
              </tr>
            ) : (
              followupLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.country}</td>
                  <td>{lead.stage}</td>
                  <td>{lead.followupDate}</td>
                  
                  <td>
                    {lead.lastFollowupDone === today
                      ? "✅ Completed"
                      : "⏳ Pending"}
                  </td>

                    {/* Last Note */}
                    <td style={{ maxWidth: "250px" }}>
                      {lead.notes
                        ? lead.notes.split("\n").slice(-1)[0].replace(/\[.*?\]\s*/, "")
                        : "No notes"}
                    </td>

                      {/* Action */}
                      <td>
                        {lead.lastFollowupDone !== today && (
                          <button onClick={() => markCompleted(lead)}>
                            Mark Complete
                          </button>
                        )}
                      </td>
                       
                       <button
                            style={{ marginLeft: "8px" }}
                            onClick={() => {
                              setHistoryLead(lead);
                              setShowHistory(true);
                            }}
                          >
                            View History
                          </button>
                      </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showReschedule && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✅ Task Completed</h3>
            <p>Would you like to schedule the next follow-up?</p>
             

            <input
              type="date"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button onClick={() => setFollowupNote("Called")}>✅ Called</button>
            <button onClick={() => setFollowupNote("No Answer")}>📵 No Answer</button>
            <button onClick={() => setFollowupNote("Call Later")}>🔁 Call Later</button>
            <button onClick={() => setFollowupNote("Switched Off")}>📴 Switched Off</button>
          </div>
            <textarea
              placeholder="Write follow-up discussion notes..."
              value={followupNote}
              onChange={(e) => setFollowupNote(e.target.value)}
              rows="4"
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />

            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button onClick={saveCompletion}>Save</button>
              <button onClick={() => setShowReschedule(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {showHistory && historyLead && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>📜 Follow-up History</h3>

      <div
        style={{
          whiteSpace: "pre-line",
          marginTop: "15px",
          lineHeight: "1.8",
        }}
      >
        {historyLead.notes || "No follow-up history"}
      </div>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => setShowHistory(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}
