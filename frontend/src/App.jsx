import { useState } from "react";
import "./App.css";
import {
  Candy, Home, Users, Menu, LogOut, User,
  Plus, X, MapPin, Clock, Calendar, Tag, FileText, Trash2, Pencil
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
const activities = [
  { id: 1, day: "3",  month: "April", name: "THIS IS FOR World Tour", time: "07:30 PM", place: "Boston, MA", tag: "Concert", description: "TWICE 5TH WORLD TOUR 'READY TO BE' — Floor GA standing. Doors open at 6:00 PM. Do not forget to bring your lightstick!" },
  { id: 2, day: "4",  month: "April", name: "THIS IS FOR World Tour", time: "08:00 PM", place: "Boston, MA", tag: "Concert", description: "Night 2 of TWICE in Boston. Seat: Section 104, Row C. Pick up tickets at will-call window." },
];

const members = [
  { name: "Nine", color: "#38BDF8", bg: "#0c2a3a" },
  { name: "Fern", color: "#A78BFA", bg: "#1e1535" },
  { name: "Mei",  color: "#34D399", bg: "#0d2a22" },
];

// ── App ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("signup");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showAddModal, setShowAddModal]         = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [menuAnchor, setMenuAnchor]             = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "error" });

  const isLoggedIn = page !== "login" && page !== "signup";
  const goTo = (p) => { setPage(p); setMenuAnchor(null); };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ── แจ้งเตือน ── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
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

            <Stack direction="row" alignItems="center" gap={1}>
              <Button
                startIcon={<Home size={15} />}
                onClick={() => goTo("home")}
                variant={page === "home" ? "contained" : "text"}
                color="primary"
                size="small"
              >
                Home
              </Button>
              

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
                slotProps={{
                  paper: { sx: { mt: 1 } }
                }}
              >
                
                <MenuItem onClick={() => goTo("profile")}>
                  <User size={15} /> Profile
                </MenuItem>
                <MenuItem onClick={() => goTo("credits")}>  {/* เพิ่มตรงนี้ */}
                  <Users size={15} /> Credit
                </MenuItem>
                <Divider />
                <MenuItem className="menu-item-danger" onClick={() => goTo("login")}>
                  <LogOut size={15} /> Log Out
                </MenuItem>
              </MuiMenu>
            </Stack>
          </Toolbar>
        </AppBar>
      )}

      {/* ── ADD MODAL ── */}
      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} fullWidth maxWidth="sm">
        <DialogTitle className="modal-title">
          Add Activity
          <IconButton className="modal-close-btn" size="small" onClick={() => setShowAddModal(false)}>
            <X size={14} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack gap={2} mt={1}>
            <TextField label="Activity Name" placeholder="e.g. TWICE World Tour" fullWidth />

            <Stack direction="row" gap={2}>
              <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }}
                InputProps={{ startAdornment: <Calendar size={15} className="modal-icon-white" /> }} />
              <TextField label="Time" type="time" fullWidth InputLabelProps={{ shrink: true }}
                InputProps={{ startAdornment: <Clock size={15} className="modal-icon-white" /> }} />
            </Stack>

            <Stack direction="row" gap={2}>
              <TextField label="Place" placeholder="e.g. Boston, MA" fullWidth
                InputProps={{ startAdornment: <MapPin size={15} className="modal-icon-muted" /> }} />
              <TextField label="Tag" placeholder="e.g. Concert" fullWidth
                InputProps={{ startAdornment: <Tag size={15} className="modal-icon-muted" /> }} />
            </Stack>

            <TextField label="Description" placeholder="Add details, notes, or reminders..."
              multiline minRows={3} fullWidth
              InputProps={{ startAdornment: <FileText size={15} className="modal-icon-muted-top" /> }} />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button fullWidth variant="outlined" color="inherit" className="modal-cancel-btn" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button fullWidth variant="contained" startIcon={<Plus size={15} />}>
            Add Activity
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
              <Button fullWidth variant="outlined" color="error" startIcon={<Trash2 size={14} />}>Delete</Button>
              <Button fullWidth variant="contained" startIcon={<Pencil size={14} />}>Edit</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      {/* ── SIGNUP PAGE ── */}
      {page === "signup" && (
        <div className="login-page">
          <Card className="login-card">
            <CardContent>
              <div className="login-icon-box">
                <Candy size={26} color="#fff" />
              </div>
              <Typography className="login-title">Create Account</Typography>
              <Typography className="login-sub">Sign up to get started.</Typography>

              <Stack gap={2.5}>
                <TextField label="Email" type="email" placeholder="Enter your email" fullWidth />
                <TextField label="Username" placeholder="Enter your username" fullWidth />
                <TextField label="Password" type="password" placeholder="Enter your password" fullWidth />
                <Button fullWidth variant="contained" size="large" className="login-btn" onClick={() => setPage("home")}>
                  Sign Up →
                </Button>
              
              </Stack>
              

              {/* ลิงก์ไปหน้า Login */}
              <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: "#64748B" }}>
                Already have an account?{" "}
                <span onClick={() => setPage("login")} style={{ color: "#38BDF8", cursor: "pointer", fontWeight: 600 }}>
                  Sign In
                </span>
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
              <div className="login-icon-box">
                <Candy size={26} color="#fff" />
              </div>
              <Typography className="login-title">Welcome</Typography>
              <Typography className="login-sub">Please log in to continue.</Typography>

              <Stack gap={2.5}>
                <TextField label="Username" placeholder="Enter your username" fullWidth
                  value={user} onChange={(e) => setUser(e.target.value)} />
                <TextField label="Password" type="password" placeholder="Enter your password" fullWidth
                  value={pass} onChange={(e) => setPass(e.target.value)} />
                <Button fullWidth variant="contained" size="large" className="login-btn" onClick={() => setPage("home")}>
                  Login →
                </Button>
                {/*
                <Button fullWidth variant="contained" size="large" className="login-btn"
                  onClick={() => {
                    setToast({ open: true, message: "Username or password is incorrect", severity: "error" });
                  }}
                >
                  Login2 →
                </Button> 
                */}
                <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: "#64748B" }}>
                Don't have an account?{" "}
                <span onClick={() => setPage("signup")} style={{ color: "#38BDF8", cursor: "pointer", fontWeight: 600 }}>
                  Sign Up
                </span>
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
          <Typography className="home-title">
            Activity, <span className="home-title-accent">In coming</span>
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography className="section-label">All Schedules</Typography>
            <Button variant="contained" size="small" className="add-btn" startIcon={<Plus size={14} />} onClick={() => setShowAddModal(true)}>
              Add
            </Button>
          </Stack>

          <Stack gap={1.5}>
            {activities.map((a) => (
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
            ))}
          </Stack>
          
        </div>
      )}

      {/* ── CREDITS PAGE ── */}
      {page === "credits" && (
        <div className="credits-page">
          <Box width="100%" maxWidth={660}>
            <Box textAlign="center" mb={6}>
              <Chip className="credits-badge" label="GROUP PROJECT" size="small" />
              <Typography className="credits-title">Members</Typography>
              <Typography className="credits-sub">Sub</Typography>
            </Box>

            <Stack gap={1.5}>
              {members.map((m, i) => (
                <Card key={i} className="member-card">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <div className="member-avatar" style={{ background: m.bg, color: m.color }}>
                      {m.name.charAt(0)}
                    </div>
                    <Typography className="member-name">{m.name}</Typography>
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
              <div className="login-icon-box" style={{ margin: "0 auto 24px" }}>
                <User size={26} color="#fff" />
              </div>
              <Typography className="profile-title">{user || "Profile"}</Typography>
              <Typography className="profile-sub">Profile page — coming soon</Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </ThemeProvider>
  );
}
