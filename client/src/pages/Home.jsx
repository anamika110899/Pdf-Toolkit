import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { keyframes } from "@mui/system";
import MergeIcon from "@mui/icons-material/MergeType";
import SplitIcon from "@mui/icons-material/CallSplit";
import CompressIcon from "@mui/icons-material/Compress";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Footer from "../components/Footer";

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function Home() {
  const navigate = useNavigate();

  const tools = [
    { name: "Merge PDF", path: "/merge", icon: <MergeIcon />, color: "#6366f1" },
    { name: "Split PDF", path: "/split", icon: <SplitIcon />, color: "#ec4899" },
    { name: "Compress PDF", path: "/compress", icon: <CompressIcon />, color: "#22c55e" },
    { name: "PDF to Word", path: "/pdf-to-word", icon: <PictureAsPdfIcon />, color: "#f97316" },
    { name: "Word to PDF", path: "/word-to-pdf", icon: <PictureAsPdfIcon />, color: "#0ea5e9" },
    { name: "PDF to JPG", path: "/pdf-to-jpg", icon: <ImageIcon />, color: "#eab308" },
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon />, color: "#64748b" },
    { name: "Edit PDF", path: "/edit-pdf", icon: <EditNoteIcon />, color: "#10b981" },
    { name: "Protect PDF", path: "/protect-pdf", icon: <PictureAsPdfIcon />, color: "#8b5cf6" },
    { name: "Sign PDF", path: "/sign-pdf", icon: <EditNoteIcon />, color: "#f43f5e" },
    { name: "OCR PDF", path: "/ocr-pdf", icon: <PictureAsPdfIcon />, color: "#f59e0b" },
    { name: "Footer", path: "/Footer", icon: <PictureAsPdfIcon />, color: "#f59e0b" },
  ];

  return (
    <>
      {/* HERO SECTION WITH ANIMATED BACKGROUND */}
      <Box
        sx={{
          minHeight: "60vh",
          background: "linear-gradient(-45deg, #fde6f3, #e0e7ff, #fae8ff, #ccfbf1)",
          backgroundSize: "400% 400%",
          animation: `${gradientBG} 12s ease infinite`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          position: "relative",
          overflow: "hidden",

          width: "100%",

        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold">
            The PDF Toolkit
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={1}>
            Merge, compress, split, convert and manage your PDFs easily
          </Typography>
        </Container>
      </Box>

      {/* TOOLS GRID (NORMAL WHITE BACKGROUND) */}
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.06, y: -10 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    borderRadius: "20px",
                    background: "#ffffff",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    height: "100%",
                    
                  }}
                  onClick={() => navigate(tool.path)}
                >
                  <CardContent sx={{ textAlign: "center", py: 5 }}>
                    <Box sx={{ fontSize: 40, color: tool.color }}>
                      {tool.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="600">
                      {tool.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
