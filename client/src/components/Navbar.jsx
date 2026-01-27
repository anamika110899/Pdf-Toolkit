import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", fontWeight: 600, color: "#111827" }}
          onClick={() => navigate("/")}
        >
          PDF Toolkit
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Button onClick={() => navigate("/")} sx={{ color: "#111827" }}>
            Home
          </Button>
          {/* <Button onClick={() => navigate("/dashboard")} sx={{ color: "#111827" }}>
            Dashboard
          </Button>
          <Button onClick={() => navigate("/login")} sx={{ color: "#111827" }}>
            Login
          </Button> */}
        </Box>

      </Toolbar>
    </AppBar>
  );
}
