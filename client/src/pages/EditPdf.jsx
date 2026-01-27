import { useState, useRef, useEffect } from "react";
import { Container, Button, TextField, Box } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";
import * as fabric from "fabric";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function EditPdf() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const fabricCanvas = useRef(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 800,
      });
      fabricCanvas.current = canvas;
    }
  }, []);

  const addText = () => {
    if (!fabricCanvas.current) return;
    const textbox = new fabric.Textbox(text || "Edit me", {
      left: 100,
      top: 100,
      fill: "black",
      fontSize: 18,
    });
    fabricCanvas.current.add(textbox);
  };

  const handleSave = async () => {
    if (!fabricCanvas.current || !file) return;

    const json = fabricCanvas.current.toJSON();

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("objects", JSON.stringify(json.objects));

    const res = await axios.post(
      "http://localhost:5000/api/edit-pdf-advanced",
      formData,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "edited.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Container>
      <h2>Edit PDF</h2>

      <input type="file" accept="application/pdf" onChange={handleFileUpload} />

      {file && (
        <>
          <Box position="relative" width={600} height={800} mt={2}>
            <Document file={file}>
              <Page pageNumber={1} width={600} />
            </Document>

            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                border: "1px solid transparent",
              }}
            />
          </Box>

          <TextField
            fullWidth
            sx={{ my: 2 }}
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button variant="contained" onClick={addText} sx={{ mr: 2 }}>
            Add Text
          </Button>
          <Button variant="outlined" onClick={handleSave}>
            Save PDF
          </Button>
        </>
      )}
    </Container>
  );
}