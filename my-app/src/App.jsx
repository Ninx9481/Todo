import { useState } from "react";
import "./App.css";

const activities = [
  {
    id: 1,
    day: "3", month: "April",
    name: "THIS IS FOR World Tour",
    time: "07:30 PM", place: "Boston, MA", tag: "Concert",
    description: "TWICE 5TH WORLD TOUR 'READY TO BE' — Floor GA standing. Doors open at 6:00 PM. Do not forget to bring your lightstick!",
  },
  {
    id: 2,
    day: "4", month: "April",
    name: "THIS IS FOR World Tour",
    time: "08:00 PM", place: "Boston, MA", tag: "Concert",
    description: "Night 2 of TWICE in Boston. Seat: Section 104, Row C. Pick up tickets at will-call window.",
  },
];

const members = [
  { name: "Nine", color: "#38BDF8", bg: "#0c2a3a" },
  { name: "Fern", color: "#A78BFA", bg: "#1e1535" },
  { name: "Mei",  color: "#34D399", bg: "#0d2a22" },
];

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const isLoggedIn = page !== "login";

  return (
    <div className="app">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* ── NAVBAR ── */}
      {isLoggedIn && (
        <nav className="navbar">
          <div className="nav-logo">🍭 TWICE</div>

          <div className="nav-links">
            <button
              className={`nav-btn ${page === "home" ? "nav-btn-active" : "nav-btn-ghost"}`}
              onClick={() => { setPage("home"); setShowMenu(false); }}
            >
              Home
            </button>
            <button
              className={`nav-btn ${page === "credits" ? "nav-btn-active" : "nav-btn-ghost"}`}
              onClick={() => { setPage("credits"); setShowMenu(false); }}
            >
              Credit
            </button>

            {/* Hamburger */}
            <div className="hamburger-wrapper">
              <button
                className={`hamburger-btn ${showMenu ? "hamburger-btn-active" : ""}`}
                onClick={() => setShowMenu((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>

              {showMenu && (
                <>
                  <div className="hamburger-backdrop" onClick={() => setShowMenu(false)} />
                  <div className="hamburger-dropdown">
                    <button
                      className="dropdown-item dropdown-item-danger"
                      onClick={() => { setPage("login"); setShowMenu(false); }}
                    >
                      <span>→</span> Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* ── ADD MODAL ── */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add Activity</div>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label className="form-label">Activity Name</label>
              <input className="form-input" type="text" placeholder="e.g. TWICE World Tour" />
            </div>

            <div className="modal-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="form-input" type="date" />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input className="form-input" type="time" />
              </div>
            </div>

            <div className="modal-row">
              <div className="form-group">
                <label className="form-label">Place</label>
                <input className="form-input" type="text" placeholder="e.g. Boston, MA" />
              </div>
              <div className="form-group">
                <label className="form-label">Tag</label>
                <input className="form-input" type="text" placeholder="e.g. Concert" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input form-textarea" placeholder="Add details, notes, or reminders..." />
            </div>

            <div className="modal-actions">
              <button className="modal-btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="modal-btn-submit">Add Activity</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {selectedActivity && (
        <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="detail-tag">{selectedActivity.tag}</div>
              <button className="modal-close" onClick={() => setSelectedActivity(null)}>✕</button>
            </div>

            <div className="detail-title">{selectedActivity.name}</div>

            <div className="detail-meta-grid">
              <div className="detail-meta-item">
                <span className="detail-meta-icon">📅</span>
                <div>
                  <div className="detail-meta-label">Date</div>
                  <div className="detail-meta-value">{selectedActivity.day} {selectedActivity.month}</div>
                </div>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-icon">🕐</span>
                <div>
                  <div className="detail-meta-label">Time</div>
                  <div className="detail-meta-value">{selectedActivity.time}</div>
                </div>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-icon">📍</span>
                <div>
                  <div className="detail-meta-label">Place</div>
                  <div className="detail-meta-value">{selectedActivity.place}</div>
                </div>
              </div>
            </div>

            {selectedActivity.description && (
              <div className="detail-desc-box">
                <div className="detail-meta-label" style={{ marginBottom: "8px" }}>Description</div>
                <div className="detail-desc-text">{selectedActivity.description}</div>
              </div>
            )}

            <div className="modal-actions" style={{ marginTop: "24px" }}>
              <button className="modal-btn-delete">🗑 Delete</button>
              <button className="modal-btn-submit">✏️ Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOGIN PAGE ── */}
      {page === "login" && (
        <div className="page">
          <div className="login-card">
            <div className="login-icon">🍭</div>
            <div className="login-title">Welcome</div>
            <div className="login-sub">Please log in to continue.</div>

            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" type="text" placeholder="Enter your username"
                value={user} onChange={(e) => setUser(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter your password"
                value={pass} onChange={(e) => setPass(e.target.value)} />
            </div>

            <button className="submit-btn" onClick={() => setPage("home")}>Login →</button>
          </div>
        </div>
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <div className="page page-top">
          <div className="home-wrapper">
            <div className="home-header">
              <div className="home-greeting">👋 Hello, {user}</div>
              <div className="home-title">Activity, <span>In coming</span></div>
            </div>

            <div className="section-header">
              <div className="section-label">All Schedules</div>
              <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add</button>
            </div>

            <div className="activities-grid">
              {activities.map((a) => (
                <div className="activity-card" key={a.id} onClick={() => setSelectedActivity(a)}>
                  <div className="activity-date-box">
                    <div className="activity-date-day">{a.day}</div>
                    <div className="activity-date-month">{a.month}</div>
                  </div>
                  <div className="activity-info">
                    <div className="activity-name">{a.name}</div>
                    <div className="activity-meta">
                      <span>🕐 {a.time}</span>
                      <span>📍 {a.place}</span>
                    </div>
                  </div>
                  <div className="activity-tag">{a.tag}</div>
                  <div className="activity-arrow">›</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CREDITS PAGE ── */}
      {page === "credits" && (
        <div className="page">
          <div className="credits-wrapper">
            <div className="credits-header">
              <div className="credits-badge">GROUP PROJECT</div>
              <div className="credits-title">Members</div>
              <div className="credits-sub">Sub</div>
            </div>

            <div className="members-grid">
              {members.map((m, i) => (
                <div className="member-card" key={i}>
                  <div className="member-avatar" style={{ background: m.bg, color: m.color }}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
