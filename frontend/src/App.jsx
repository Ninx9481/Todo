import { useState } from "react";
import {
  Candy, Home, Users, Menu, LogOut, User,
  Plus, X, MapPin, Clock, Calendar, Tag, FileText, Trash2, Pencil
} from "lucide-react";

// MUI
import {
  createTheme, ThemeProvider, CssBaseline,
  AppBar, Toolbar, Typography, IconButton,
  Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Card, CardActionArea,
  CardContent, Chip, MenuItem, Menu as MuiMenu,
  Divider, Box, Stack
} from "@mui/material";

// ── MUI Dark Theme ──────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:   { main: "#38BDF8" },
    error:     { main: "#F87171" },
    background:{ default: "#0A0F1E", paper: "#111827" },
    text:      { primary: "#F1F5F9", secondary: "#64748B" },
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
  const [page, setPage] = useState("login");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showAddModal, setShowAddModal]     = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [menuAnchor, setMenuAnchor]         = useState(null);

  const isLoggedIn = page !== "login";
  const goTo = (p) => { setPage(p); setMenuAnchor(null); };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* background orbs */}
      <Box sx={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "#38BDF8", filter: "blur(80px)", opacity: 0.12, top: -150, right: -100, pointerEvents: "none", zIndex: 0 }} />
      <Box sx={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "#6366F1", filter: "blur(80px)", opacity: 0.12, bottom: -100, left: -80,  pointerEvents: "none", zIndex: 0 }} />

      {/* ── NAVBAR ── */}
      {isLoggedIn && (
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Candy size={20} color="#38BDF8" />
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#38BDF8", fontSize: 20 }}>
                TWICE
              </Typography>
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
              <Button
                startIcon={<Users size={15} />}
                onClick={() => goTo("credits")}
                variant={page === "credits" ? "contained" : "text"}
                color="primary"
                size="small"
              >
                Credit
              </Button>

              {/* Hamburger → MUI IconButton + Menu */}
              <IconButton
                onClick={(e) => setMenuAnchor(e.currentTarget)}
                sx={{ border: "1px solid #1E2D45", borderRadius: "8px", width: 36, height: 36, color: menuAnchor ? "#38BDF8" : "#64748B" }}
              >
                <Menu size={16} />
              </IconButton>

              <MuiMenu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => goTo("profile")}>
                  <User size={15} /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => goTo("login")} sx={{ color: "#F87171" }}>
                  <LogOut size={15} /> Log Out
                </MenuItem>
              </MuiMenu>
            </Stack>
          </Toolbar>
        </AppBar>
      )}

      {/* ── ADD MODAL ── */}
      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Add Activity
          <IconButton size="small" onClick={() => setShowAddModal(false)} sx={{ color: "#64748B" }}>
            <X size={14} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack gap={2} mt={1}>
            <TextField label="Activity Name" placeholder="e.g. TWICE World Tour" fullWidth />

            <Stack direction="row" gap={2}>
              <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }}
                InputProps={{ startAdornment: <Calendar size={15} style={{ marginRight: 8, color: "#F1F5F9" }} /> }} />
              <TextField label="Time" type="time" fullWidth InputLabelProps={{ shrink: true }}
                InputProps={{ startAdornment: <Clock size={15} style={{ marginRight: 8, color: "#F1F5F9" }} /> }} />
            </Stack>

            <Stack direction="row" gap={2}>
              <TextField label="Place" placeholder="e.g. Boston, MA" fullWidth
                InputProps={{ startAdornment: <MapPin size={15} style={{ marginRight: 8, color: "#64748B" }} /> }} />
              <TextField label="Tag" placeholder="e.g. Concert" fullWidth
                InputProps={{ startAdornment: <Tag size={15} style={{ marginRight: 8, color: "#64748B" }} /> }} />
            </Stack>

            <TextField label="Description" placeholder="Add details, notes, or reminders..."
              multiline minRows={3} fullWidth
              InputProps={{ startAdornment: <FileText size={15} style={{ marginRight: 8, color: "#64748B", alignSelf: "flex-start", marginTop: 4 }} /> }} />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button fullWidth variant="outlined" color="inherit" sx={{ color: "#64748B", borderColor: "#1E2D45" }} onClick={() => setShowAddModal(false)}>
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
              <Chip label={selectedActivity.tag} size="small" sx={{ background: "#38BDF822", color: "#38BDF8", border: "1px solid #38BDF833" }} />
              <IconButton size="small" onClick={() => setSelectedActivity(null)} sx={{ color: "#64748B" }}>
                <X size={14} />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, mb: 2 }}>
                {selectedActivity.name}
              </Typography>

              <Stack gap={1.5} mb={2}>
                {[
                  { icon: <Calendar size={18} color="#38BDF8" />, label: "Date",  value: `${selectedActivity.day} ${selectedActivity.month}` },
                  { icon: <Clock    size={18} color="#38BDF8" />, label: "Time",  value: selectedActivity.time },
                  { icon: <MapPin   size={18} color="#38BDF8" />, label: "Place", value: selectedActivity.place },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1.5, background: "#1a2235", borderRadius: 2, px: 2, py: 1.5 }}>
                    {item.icon}
                    <Box>
                      <Typography variant="caption" sx={{ color: "#64748B", textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600 }}>{item.label}</Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{item.value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              {selectedActivity.description && (
                <Box sx={{ background: "#1a2235", borderRadius: 2, p: 2 }}>
                  <Typography variant="caption" sx={{ color: "#64748B", textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600, display: "block", mb: 1 }}>Description</Typography>
                  <Typography sx={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.7 }}>{selectedActivity.description}</Typography>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button fullWidth variant="outlined" color="error" startIcon={<Trash2 size={14} />}>Delete</Button>
              <Button fullWidth variant="contained" startIcon={<Pencil size={14} />}>Edit</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── LOGIN PAGE ── */}
      {page === "login" && (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 3, position: "relative", zIndex: 1 }}>
          <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 4, p: 2, boxShadow: "0 0 60px rgba(56,189,248,0.08)" }}>
            <CardContent>
              <Box sx={{ width: 52, height: 52, background: "linear-gradient(135deg,#38BDF8,#6366F1)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                <Candy size={26} color="#fff" />
              </Box>
              <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, mb: 0.5 }}>Welcome</Typography>
              <Typography sx={{ color: "#64748B", fontSize: 14, mb: 4 }}>Please log in to continue.</Typography>

              <Stack gap={2.5}>
                <TextField label="Username" placeholder="Enter your username" fullWidth value={user} onChange={(e) => setUser(e.target.value)} />
                <TextField label="Password" type="password" placeholder="Enter your password" fullWidth value={pass} onChange={(e) => setPass(e.target.value)} />
                <Button fullWidth variant="contained" size="large" onClick={() => setPage("home")}
                  sx={{ background: "linear-gradient(135deg,#38BDF8,#6366F1)", mt: 1, py: 1.5, fontSize: 15 }}>
                  Login →
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <Box sx={{ pt: "100px", px: 3, pb: 5, position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <Box mb={4}>
            <Typography sx={{ fontSize: 13, color: "#38BDF8", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", mb: 1 }}>
              Hello, {user}
            </Typography>
            <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 38, lineHeight: 1.1 }}>
              Activity, <Box component="span" sx={{ color: "#38BDF8" }}>In coming</Box>
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#64748B" }}>
              All Schedules
            </Typography>
            <Button variant="contained" size="small" startIcon={<Plus size={14} />} onClick={() => setShowAddModal(true)}
              sx={{ fontSize: 13, fontWeight: 700, color: "#0A0F1E" }}>
              Add
            </Button>
          </Stack>

          <Stack gap={1.5}>
            {activities.map((a) => (
              <Card key={a.id} sx={{ borderRadius: 3, transition: "all 0.2s", "&:hover": { borderColor: "#38BDF855", transform: "translateX(4px)" } }}>
                <CardActionArea onClick={() => setSelectedActivity(a)}>
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2.5, py: 2.5 }}>
                    <Box sx={{ minWidth: 56, textAlign: "center", background: "#1a2235", borderRadius: 2, py: 1.5, px: 1 }}>
                      <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#38BDF8", lineHeight: 1 }}>{a.day}</Typography>
                      <Typography sx={{ fontSize: 10, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5, mt: 0.3 }}>{a.month}</Typography>
                    </Box>
                    <Box flex={1}>
                      <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 0.5 }}>{a.name}</Typography>
                      <Stack direction="row" gap={1.5}>
                        <Typography sx={{ fontSize: 13, color: "#64748B", display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Clock size={12} /> {a.time}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#64748B", display: "flex", alignItems: "center", gap: 0.5 }}>
                          <MapPin size={12} /> {a.place}
                        </Typography>
                      </Stack>
                    </Box>
                    <Chip label={a.tag} size="small" sx={{ background: "#38BDF822", color: "#38BDF8", border: "1px solid #38BDF833" }} />
                    <Typography sx={{ fontSize: 22, color: "#1E2D45" }}>›</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* ── CREDITS PAGE ── */}
      {page === "credits" && (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 3, pt: "80px", position: "relative", zIndex: 1 }}>
          <Box width="100%" maxWidth={660}>
            <Box textAlign="center" mb={6}>
              <Chip label="GROUP PROJECT" size="small" sx={{ background: "#38BDF822", color: "#38BDF8", border: "1px solid #38BDF844", mb: 2, letterSpacing: 0.8 }} />
              <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 36 }}>Members</Typography>
              <Typography sx={{ color: "#64748B", fontSize: 15, mt: 1 }}>Sub</Typography>
            </Box>

            <Stack gap={1.5}>
              {members.map((m, i) => (
                <Card key={i} sx={{ borderRadius: 3, transition: "all 0.2s", "&:hover": { borderColor: "#38BDF855", transform: "translateY(-2px)" } }}>
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 46, height: 46, borderRadius: 2, background: m.bg, color: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                      {m.name.charAt(0)}
                    </Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{m.name}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      )}

      {/* ── PROFILE PAGE ── */}
      {page === "profile" && (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 3, position: "relative", zIndex: 1 }}>
          <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 4, p: 2, textAlign: "center" }}>
            <CardContent>
              <Box sx={{ width: 52, height: 52, background: "linear-gradient(135deg,#38BDF8,#6366F1)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", mb: 3, mx: "auto" }}>
                <User size={26} color="#fff" />
              </Box>
              <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, mb: 0.5 }}>{user || "Profile"}</Typography>
              <Typography sx={{ color: "#64748B", fontSize: 14 }}>Profile page — coming soon</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </ThemeProvider>
  );
}
