import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card } from "@mui/material";

export default function SignPdf() {
  const [pdf, setPdf] = useState(null);
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    if (!pdf || !signature) return alert("Upload PDF and signature image");

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("signature", signature);

    try {
      const res = await axios.post("http://localhost:5000/api/sign-pdf", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "signed.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Sign failed", err);
      alert("Signing failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" mb={2}>
          Sign PDF
        </Typography>

        <Typography>Upload PDF</Typography>
        <DragDropUpload multiple={false} onFiles={(files) => setPdf(files[0])} />

        <Typography mt={2}>Upload Signature Image (PNG)</Typography>
        <DragDropUpload multiple={false} onFiles={(files) => setSignature(files[0])} />

        <Button
          variant="contained"
          onClick={handleSign}
          sx={{ mt: 3 }}
          disabled={!pdf || !signature || loading}
          fullWidth
        >
          {loading ? "Signing..." : "Sign PDF"}
        </Button>
      </Card>
    </Container>
  );
}
