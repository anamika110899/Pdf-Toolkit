import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Card } from "@mui/material";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/api/register", {
      name, email, password
    });
    alert("Registered successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5">Register</Typography>
        <TextField fullWidth label="Name" onChange={e => setName(e.target.value)} sx={{ mt: 2 }} />
        <TextField fullWidth label="Email" onChange={e => setEmail(e.target.value)} sx={{ mt: 2 }} />
        <TextField fullWidth label="Password" type="password" onChange={e => setPassword(e.target.value)} sx={{ mt: 2 }} />
        <Button fullWidth variant="contained" onClick={handleRegister} sx={{ mt: 3 }}>
          Register
        </Button>
      </Card>
    </Container>
  );
}
