import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/history")
      .then(res => setHistory(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h5" mt={4} mb={2}>
        User History Dashboard
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tool</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.tool}</TableCell>
              <TableCell>{row.filename}</TableCell>
              <TableCell>{new Date(row.date).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
