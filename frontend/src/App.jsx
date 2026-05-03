import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  Candy, Users, Menu, LogOut, User,
  Plus, X, MapPin, Clock, Calendar, Tag, FileText, Trash2, Pencil, ArrowLeft
} from "lucide-react";
import {
  createTheme, ThemeProvider, CssBaseline,
  AppBar, Toolbar, Typography, IconButton,
  Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Card, CardActionArea,
  CardContent, Chip, MenuItem, Menu as MuiMenu,
  Divider, Box, Stack, Snackbar, Alert
} from "@mui/material";

// ── MUI Dark Theme ──────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:    { main: "#38BDF8" },
    error:      { main: "#F87171" },
    background: { default: "#0A0F1E", paper: "#111827" },
    text:       { primary: "#F1F5F9", secondary: "#64748B" },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "'Space Grotesk', sans-serif" },
  components: {
    MuiAppBar:    { styleOverrides: { root: { background: "rgba(10,15,30,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1E2D45", boxShadow: "none" } } },
    MuiButton:    { styleOverrides: { root: { textTransform: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 } } },
    MuiTextField: { styleOverrides: { root: { "& .MuiOutlinedInput-root": { background: "#1a2235", "& fieldset": { borderColor: "#1E2D45" }, "&:hover fieldset": { borderColor: "#38BDF8" } } } } },
    MuiDialog:    { styleOverrides: { paper: { background: "#111827", border: "1px solid #1E2D45", borderRadius: 20, boxShadow: "0 0 80px rgba(56,189,248,0.1)" } } },
    MuiCard:      { styleOverrides: { root: { background: "#111827", border: "1px solid #1E2D45", boxShadow: "none" } } },
    MuiMenu:      { styleOverrides: { paper: { background: "#111827", border: "1px solid #1E2D45", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" } } },
    MuiMenuItem:  { styleOverrides: { root: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, gap: 10 } } },
    MuiChip:      { styleOverrides: { root: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 11 } } },
    MuiDivider:   { styleOverrides: { root: { borderColor: "#1E2D45" } } },
  },
});

// ── Data ────────────────────────────────────────────────────
const API_BASE_URL = "http://localhost:3000";

const members = [
  { name: "Nine", id: "6634412923", color: "#38BDF8", bg: "#0c2a3a" },
  { name: "Fern", id: "6634413523", color: "#A78BFA", bg: "#1e1535" },
  { name: "Mei",  id: "6634416423", color: "#34D399", bg: "#0d2a22" },
];

// ── App ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]                         = useState("signup");
  const [user, setUser]                         = useState("");
  const [pass, setPass]                         = useState("");
  const [showAddModal, setShowAddModal]         = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [menuAnchor, setMenuAnchor]             = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [toast, setToast]                       = useState({ open: false, message: "", severity: "error" });
  const [modalToast, setModalToast]             = useState("");
  const [email, setEmail]                       = useState("");
  const [activities, setActivities]             = useState([]);
  const [token, setToken]                       = useState("");
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [authLoading, setAuthLoading]           = useState(false);
  const [addLoading, setAddLoading]             = useState(false);
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [deleteLoading, setDeleteLoading]       = useState(false);
  const [newActivityName, setNewActivityName]               = useState("");
  const [newActivityDate, setNewActivityDate]               = useState("");
  const [newActivityTime, setNewActivityTime]               = useState("");
  const [newActivityPlace, setNewActivityPlace]             = useState("");
  const [newActivityTag, setNewActivityTag]                 = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");

  const isLoggedIn = page !== "login" && page !== "signup";
  const goTo = (p) => { setPage(p); setMenuAnchor(null); };
  const clearModalToast = () => setModalToast("");

  useEffect(() => {
    if (!token) return;
    const fetchActivities = async () => {
      setLoadingActivities(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/activities`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const normalized = response.data.map((item) => {
          const date = item.activity_date ? new Date(item.activity_date) : null;
          return {
            id: item.id,
            activity_date: item.activity_date || "",
            day: date ? String(date.getDate()).padStart(2, "0") : item.activity_date || "",
            month: date ? date.toLocaleString("default", { month: "long" }) : "",
            name: item.activity_name || "Untitled activity",
            time: item.activity_time || "",
            place: item.place || "",
            tag: item.tag || "General",
            description: item.description || "",
          };
        });
        setActivities(normalized);
      } catch (error) {
        setToast({ open: true, message: error.response?.data?.message || "Could not load activities", severity: "error" });
      } finally {
        setLoadingActivities(false);
      }
    };
    fetchActivities();
  }, [token]);

  const handleSignup = async () => {
    setAuthLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/users`, { name: user, email, password: pass });
      setToast({ open: true, message: "Account created. Please sign in.", severity: "success" });
      setPage("login");
      setPass("");
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || "Signup failed", severity: "error" });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async () => {
    setAuthLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/tokens`, { email, password: pass });
      setToken(response.data.token);
      setUser((current) => current || email);
      setToast({ open: true, message: "Login successful", severity: "success" });
      setPage("home");
      setPass("");
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || "Login failed", severity: "error" });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    setToken(""); setUser(""); setEmail(""); setPass("");
    setActivities([]);
    goTo("login");
  };

  const resetAddForm = () => {
    setNewActivityName(""); setNewActivityDate(""); setNewActivityTime("");
    setNewActivityPlace(""); setNewActivityTag(""); setNewActivityDescription("");
    setEditingActivityId(null); setModalToast("");
  };

  const openEditActivity = (activity) => {
    setSelectedActivity(null);
    setEditingActivityId(activity.id);
    setNewActivityName(activity.name);
    setNewActivityDate(activity.activity_date || "");
    setNewActivityTime(activity.time || "");
    setNewActivityPlace(activity.place || "");
    setNewActivityTag(activity.tag || "");
    setNewActivityDescription(activity.description || "");
    setShowAddModal(true);
  };

  const handleSaveActivity = async () => {
    if (!token) { setModalToast("Please log in first."); return; }
    if (!newActivityName || !newActivityDate || !newActivityTime) {
      setModalToast("Please complete the name, date, and time.");
      return;
    }
    setAddLoading(true);
    try {
      const payload = {
        activity_name: newActivityName, activity_date: newActivityDate,
        activity_time: newActivityTime, place: newActivityPlace,
        tag: newActivityTag, description: newActivityDescription,
      };
      const normalize = (item) => {
        const date = item.activity_date ? new Date(item.activity_date) : null;
        return {
          id: item.id, activity_date: item.activity_date || "",
          day: date ? String(date.getDate()).padStart(2, "0") : item.activity_date || "",
          month: date ? date.toLocaleString("default", { month: "long" }) : "",
          name: item.activity_name || "Untitled activity", time: item.activity_time || "",
          place: item.place || "", tag: item.tag || "General", description: item.description || "",
        };
      };
      if (editingActivityId) {
        const response = await axios.put(`${API_BASE_URL}/activities/${editingActivityId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivities((prev) => prev.map((a) => a.id === response.data.id ? normalize(response.data) : a));
        setToast({ open: true, message: "Activity updated successfully.", severity: "success" });
      } else {
        const response = await axios.post(`${API_BASE_URL}/activities`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivities((prev) => [normalize(response.data), ...prev]);
        setToast({ open: true, message: "Activity added successfully.", severity: "success" });
      }
      setShowAddModal(false);
      resetAddForm();
    } catch (error) {
      setModalToast(error.response?.data?.message || (editingActivityId ? "Could not update activity" : "Could not add activity"));
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!token) { setToast({ open: true, message: "Please log in first.", severity: "error" }); return; }
    setDeleteLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivities((prev) => prev.filter((a) => a.id !== activityId));
      setSelectedActivity(null);
      setToast({ open: true, message: "Activity deleted successfully.", severity: "success" });
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || "Could not delete activity", severity: "error" });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── Toast ── */}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>{toast.message}</Alert>
      </Snackbar>

      {/* ── Background Orbs ── */}
      <div className="orb-1" />
      <div className="orb-2" />

      {/* ── NAVBAR ── */}
      {isLoggedIn && (
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Candy size={20} color="#38BDF8" />
              <Typography className="nav-logo-text">TWICE</Typography>
            </Stack>
            <IconButton
              className={`hamburger-icon-btn ${menuAnchor ? "active" : ""}`}
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <Menu size={16} />
            </IconButton>
            <MuiMenu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              slotProps={{ paper: { sx: { mt: 1 } } }}
            >
              <MenuItem onClick={() => goTo("profile")}><User size={15} /> Profile</MenuItem>
              <MenuItem onClick={() => goTo("credits")}><Users size={15} /> Credit</MenuItem>
              <Divider />
              <MenuItem className="menu-item-danger" onClick={() => { setMenuAnchor(null); setShowLogoutDialog(true); }}>
                <LogOut size={15} /> Log Out
              </MenuItem>
            </MuiMenu>
          </Toolbar>
        </AppBar>
      )}

      {/* ── LOGOUT CONFIRM DIALOG ── */}
      <Dialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Log Out</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#64748B", fontSize: 14 }}>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button fullWidth variant="outlined" color="inherit" sx={{ color: "#64748B", borderColor: "#1E2D45" }} onClick={() => setShowLogoutDialog(false)}>
            Cancel
          </Button>
          <Button fullWidth variant="outlined" color="error" startIcon={<LogOut size={14} />} onClick={handleLogout}>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── ADD MODAL ── */}
      <Dialog open={showAddModal} onClose={() => { setShowAddModal(false); resetAddForm(); }} fullWidth maxWidth="sm">
        <DialogTitle className="modal-title">
          {editingActivityId ? "Edit Activity" : "Add Activity"}
          <IconButton className="modal-close-btn" size="small" onClick={() => { setShowAddModal(false); resetAddForm(); }}>
            <X size={14} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Modal Toast */}
          {modalToast && (
            <Box sx={{ background: "#F87171", borderRadius: 2, px: 2, py: 1.5, mb: 2 }}>
              <Typography sx={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{modalToast}</Typography>
            </Box>
          )}
          <Stack gap={2} mt={1}>
            <TextField label="Activity Name" placeholder="e.g. TWICE World Tour" fullWidth
              value={newActivityName} onChange={(e) => setNewActivityName(e.target.value)} onFocus={clearModalToast} />
            <Stack direction="row" gap={2}>
              <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }}
                value={newActivityDate} onChange={(e) => setNewActivityDate(e.target.value)}
                InputProps={{ startAdornment: <Calendar size={15} className="modal-icon-white" /> }}
                onFocus={clearModalToast} />
              <TextField label="Time" type="time" fullWidth InputLabelProps={{ shrink: true }}
                value={newActivityTime} onChange={(e) => setNewActivityTime(e.target.value)}
                InputProps={{ startAdornment: <Clock size={15} className="modal-icon-white" /> }}
                onFocus={clearModalToast} />
            </Stack>
            <Stack direction="row" gap={2}>
              <TextField label="Place" placeholder="e.g. Boston, MA" fullWidth
                value={newActivityPlace} onChange={(e) => setNewActivityPlace(e.target.value)}
                InputProps={{ startAdornment: <MapPin size={15} className="modal-icon-muted" /> }}
                onFocus={clearModalToast} />
              <TextField label="Tag" placeholder="e.g. Concert" fullWidth
                value={newActivityTag} onChange={(e) => setNewActivityTag(e.target.value)}
                InputProps={{ startAdornment: <Tag size={15} className="modal-icon-muted" /> }}
                onFocus={clearModalToast} />
            </Stack>
            <TextField label="Description" placeholder="Add details, notes, or reminders..." multiline minRows={3} fullWidth
              value={newActivityDescription} onChange={(e) => setNewActivityDescription(e.target.value)}
              InputProps={{ startAdornment: <FileText size={15} className="modal-icon-muted-top" /> }}
              onFocus={clearModalToast} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button fullWidth variant="outlined" color="inherit" className="modal-cancel-btn" onClick={() => { setShowAddModal(false); resetAddForm(); }}>Cancel</Button>
          <Button fullWidth variant="contained" startIcon={<Plus size={15} />} onClick={handleSaveActivity} disabled={addLoading}>
            {editingActivityId ? "Update Activity" : "Add Activity"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── DETAIL MODAL ── */}
      <Dialog open={Boolean(selectedActivity)} onClose={() => setSelectedActivity(null)} fullWidth maxWidth="sm">
        {selectedActivity && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Chip className="detail-chip" label={selectedActivity.tag} size="small" />
              <IconButton className="modal-close-btn" size="small" onClick={() => setSelectedActivity(null)}>
                <X size={14} />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography className="detail-title">{selectedActivity.name}</Typography>
              <Stack gap={1.5} mb={2}>
                {[
                  { icon: <Calendar size={18} color="#38BDF8" />, label: "Date",  value: `${selectedActivity.day} ${selectedActivity.month}` },
                  { icon: <Clock    size={18} color="#38BDF8" />, label: "Time",  value: selectedActivity.time },
                  { icon: <MapPin   size={18} color="#38BDF8" />, label: "Place", value: selectedActivity.place },
                ].map((item) => (
                  <div key={item.label} className="detail-meta-item">
                    {item.icon}
                    <div>
                      <Typography variant="caption" className="detail-meta-label">{item.label}</Typography>
                      <Typography className="detail-meta-value">{item.value}</Typography>
                    </div>
                  </div>
                ))}
              </Stack>
              {selectedActivity.description && (
                <div className="detail-desc-box">
                  <Typography variant="caption" className="detail-meta-label">Description</Typography>
                  <Typography className="detail-desc-text">{selectedActivity.description}</Typography>
                </div>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button fullWidth variant="outlined" color="error" startIcon={<Trash2 size={14} />} onClick={() => handleDeleteActivity(selectedActivity.id)} disabled={deleteLoading}>Delete</Button>
              <Button fullWidth variant="contained" startIcon={<Pencil size={14} />} onClick={() => openEditActivity(selectedActivity)}>Edit</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── SIGNUP PAGE ── */}
      {page === "signup" && (
        <div className="login-page">
          <Card className="login-card">
            <CardContent>
              <div className="login-icon-box"><Candy size={26} color="#fff" /></div>
              <Typography className="login-title">Create Account</Typography>
              <Typography className="login-sub">Sign up to get started.</Typography>
              <Stack gap={2.5}>
                <TextField label="Email" type="email" placeholder="Enter your email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Username" placeholder="Enter your username" fullWidth value={user} onChange={(e) => setUser(e.target.value)} />
                <TextField label="Password" type="password" placeholder="Enter your password" fullWidth value={pass} onChange={(e) => setPass(e.target.value)} />
                <Button fullWidth variant="contained" size="large" className="login-btn" onClick={handleSignup} disabled={authLoading}>Sign Up →</Button>
              </Stack>
              <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: "#64748B" }}>
                Already have an account?{" "}
                <span onClick={() => setPage("login")} style={{ color: "#38BDF8", cursor: "pointer", fontWeight: 600 }}>Sign In</span>
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── LOGIN PAGE ── */}
      {page === "login" && (
        <div className="login-page">
          <Card className="login-card">
            <CardContent>
              <div className="login-icon-box"><Candy size={26} color="#fff" /></div>
              <Typography className="login-title">Welcome</Typography>
              <Typography className="login-sub">Please log in to continue.</Typography>
              <Stack gap={2.5}>
                <TextField label="Email" type="email" placeholder="Enter your email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" placeholder="Enter your password" fullWidth value={pass} onChange={(e) => setPass(e.target.value)} />
                <Button fullWidth variant="contained" size="large" className="login-btn" onClick={handleLogin} disabled={authLoading}>Login →</Button>
                <Typography sx={{ textAlign: "center", fontSize: 14, color: "#64748B" }}>
                  Don't have an account?{" "}
                  <span onClick={() => setPage("signup")} style={{ color: "#38BDF8", cursor: "pointer", fontWeight: 600 }}>Sign Up</span>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <div className="home-page">
          <Typography className="home-greeting">Hello, {user}</Typography>
          <Typography className="home-title">Activity, <span className="home-title-accent">In coming</span></Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography className="section-label">All Schedules</Typography>
            <Button variant="contained" size="small" className="add-btn" startIcon={<Plus size={14} />} onClick={() => setShowAddModal(true)}>Add</Button>
          </Stack>
          <Stack gap={1.5}>
            {loadingActivities ? (
              <Typography sx={{ color: "#64748B" }}>Loading activities…</Typography>
            ) : activities.length > 0 ? (
              activities.map((a) => (
                <Card key={a.id} className="activity-card">
                  <CardActionArea onClick={() => setSelectedActivity(a)}>
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2.5, py: 2.5 }}>
                      <div className="activity-date-box">
                        <Typography className="activity-date-day">{a.day}</Typography>
                        <Typography className="activity-date-month">{a.month}</Typography>
                      </div>
                      <Box flex={1}>
                        <Typography className="activity-name">{a.name}</Typography>
                        <Stack direction="row" gap={1.5}>
                          <Typography className="activity-meta-text"><Clock size={12} /> {a.time}</Typography>
                          <Typography className="activity-meta-text"><MapPin size={12} /> {a.place}</Typography>
                        </Stack>
                      </Box>
                      <Chip className="activity-chip" label={a.tag} size="small" />
                      <Typography className="activity-arrow">›</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            ) : (
              <Typography sx={{ color: "#64748B" }}>No activities found yet. Create an account, log in, and start adding schedules.</Typography>
            )}
          </Stack>
        </div>
      )}

      {/* ── CREDITS PAGE ── */}
      {page === "credits" && (
        <div className="credits-page">
          <Box width="100%" maxWidth={660}>
            <Button startIcon={<ArrowLeft size={15} />} onClick={() => goTo("home")} sx={{ color: "#38BDF8", mb: 2, pl: 0 }}>Home</Button>
            <Box textAlign="center" mb={6}>
              <Chip className="credits-badge" label="GROUP PROJECT" size="small" />
              <Typography className="credits-title">Members</Typography>
              <Typography className="credits-sub">one in a million</Typography>
            </Box>
            <Stack gap={1.5}>
              {members.map((m, i) => (
                <Card key={i} className="member-card">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", "&:last-child": { pb: 2 }, "&:first-of-type": { pt: 2 } }}>
                    <div className="member-avatar" style={{ background: m.bg, color: m.color }}>{m.name.charAt(0)}</div>
                    <Typography className="member-name">{m.name} — {m.id}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </div>
      )}

      {/* ── PROFILE PAGE ── */}
      {page === "profile" && (
        <div className="profile-page">
          <Card className="profile-card">
            <CardContent>
              <Button startIcon={<ArrowLeft size={15} />} onClick={() => goTo("home")} sx={{ color: "#38BDF8", mb: 2, pl: 0 }}>Home</Button>
              <div className="login-icon-box" style={{ margin: "0 auto 24px" }}><User size={26} color="#fff" /></div>
              <Typography className="profile-title">Profile</Typography>
              <Stack gap={1.5} mt={3}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>Username</Typography>
                  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{user || "-"}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>Email</Typography>
                  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{email || "-"}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </div>
      )}
    </ThemeProvider>
  );
}
