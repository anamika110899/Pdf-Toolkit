import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Merge from "./pages/Merge";
import Split from "./pages/Split";
import Compress from "./pages/Compress";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import PdfToWord from "./pages/PdfToWord";
import WordToPdf from "./pages/WordToPdf";
import PdfToJpg from "./pages/PdfToJpg";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import EditPdf from "./pages/EditPdf";
import ProtectPdf from "./pages/ProtectPdf";
import SignPdf from "./pages/SignPdf";
import OcrPdf from "./pages/OcrPdf";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Switch, Box, Typography } from "@mui/material";
import { useState } from "react";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/merge" element={<PageWrapper><Merge /></PageWrapper>} />
        <Route path="/split" element={<PageWrapper><Split /></PageWrapper>} />
        <Route path="/compress" element={<PageWrapper><Compress /></PageWrapper>} />
        {/* <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} /> */}
        {/* <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} /> */}
        <Route path="/pdf-to-word" element={<PageWrapper><PdfToWord /></PageWrapper>} />
        <Route path="/word-to-pdf" element={<PageWrapper><WordToPdf /></PageWrapper>} />
        <Route path="/pdf-to-jpg" element={<PageWrapper><PdfToJpg /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/edit-pdf" element={<PageWrapper><EditPdf /></PageWrapper>} />
        <Route path="/protect-pdf" element={<PageWrapper><ProtectPdf /></PageWrapper>} />
        <Route path="/sign-pdf" element={<PageWrapper><SignPdf /></PageWrapper>} />
        <Route path="/ocr-pdf" element={<PageWrapper><ocrPdf /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>

        {/* Top Bar */}
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end", px: 3, py: 1 }}>
          <Typography mr={1}>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box> */}

        <Navbar />

        {/* Animated Page Transitions */}
        <AnimatedRoutes />

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
