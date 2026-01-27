import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card, TextField } from "@mui/material";

export default function ProtectPdf() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProtect = async () => {
    if (!file || !password) return alert("Upload PDF & enter password");

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("password", password);

    try {
      const res = await axios.post("http://localhost:5000/api/protect-pdf", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "protected.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Protect failed", err);
      alert("Protection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" mb={2}>
          Protect PDF with Password
        </Typography>

        <DragDropUpload multiple={false} onFiles={(files) => setFile(files[0])} />

        {file && (
          <Typography mt={2}>
            Selected File: <strong>{file.name}</strong>
          </Typography>
        )}

        <TextField
          fullWidth
          type="password"
          label="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleProtect}
          sx={{ mt: 3 }}
          disabled={!file || !password || loading}
          fullWidth
        >
          {loading ? "Protecting..." : "Protect PDF"}
        </Button>
      </Card>
    </Container>
  );
}
