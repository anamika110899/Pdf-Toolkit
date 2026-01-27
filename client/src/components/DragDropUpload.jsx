import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function DragDropUpload({ onFiles, multiple }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => {
      onFiles(acceptedFiles);
    },
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <Box
        {...getRootProps()}
        sx={{
          border: isDragActive ? "2px solid #1976d2" : "2px dashed #1976d2",
          p: 5,
          textAlign: "center",
          borderRadius: "18px",
          cursor: "pointer",
          background: isDragActive
            ? "linear-gradient(135deg, #e3f2fd, #f8fbff)"
            : "linear-gradient(135deg, #ffffff, #f3f4f6)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Upload your PDF
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isDragActive
            ? "Drop your files here..."
            : "Drag & drop PDF here, or click to select"}
        </Typography>
      </Box>
    </motion.div>
  );
}
