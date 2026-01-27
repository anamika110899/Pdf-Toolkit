import { Box, Button } from "@mui/material";

export default function FileUpload({ multiple, onChange }) {
  return (
    <Box textAlign="center" mt={4}>
      <input
        type="file"
        multiple={multiple}
        hidden
        id="upload-input"
        onChange={onChange}
      />
      <label htmlFor="upload-input">
        <Button variant="contained" component="span">
          Upload PDF
        </Button>
      </label>
    </Box>
  );
}
