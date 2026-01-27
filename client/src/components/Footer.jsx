import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", mt: 10 }}>
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>

          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">
              PDF Toolkit
            </Typography>
            <Typography variant="body2" mt={1} color="text.secondary">
              The easiest way to work with PDF files online.
            </Typography>
          </Grid>

          {/* Product */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="600">Product</Typography>
            <Stack spacing={1} mt={1}>
              <Link href="/merge" underline="hover">Merge PDF</Link>
              <Link href="/split" underline="hover">Split PDF</Link>
              <Link href="/compress" underline="hover">Compress PDF</Link>
              <Link href="/ocr-pdf" underline="hover">OCR PDF</Link>
            </Stack>
          </Grid>

          {/* Company */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="600">Company</Typography>
            <Stack spacing={1} mt={1}>
              <Link href="#" underline="hover">About</Link>
              <Link href="#" underline="hover">Contact</Link>
              <Link href="#" underline="hover">Blog</Link>
            </Stack>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="600">Legal</Typography>
            <Stack spacing={1} mt={1}>
              <Link href="#" underline="hover">Privacy</Link>
              <Link href="#" underline="hover">Terms</Link>
            </Stack>
          </Grid>

          {/* Social */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="600">Follow</Typography>
            <Stack spacing={1} mt={1}>
              <Link href="#" underline="hover">LinkedIn</Link>
              <Link href="#" underline="hover">GitHub</Link>
              <Link href="#" underline="hover">Twitter</Link>
            </Stack>
          </Grid>

        </Grid>
      </Container>

      {/* Bottom bar */}
      <Box sx={{ textAlign: "center", py: 2, borderTop: "1px solid #e2e8f0" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} PDF Toolkit. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
