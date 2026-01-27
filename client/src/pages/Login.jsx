import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Card } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/login", {
      email, password
    });
    localStorage.setItem("token", res.data.token);
    alert("Login successful");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5">Login</Typography>
        <TextField fullWidth label="Email" onChange={e => setEmail(e.target.value)} sx={{ mt: 2 }} />
        <TextField fullWidth label="Password" type="password" onChange={e => setPassword(e.target.value)} sx={{ mt: 2 }} />
        <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 3 }}>
          Login
        </Button>
      </Card>
    </Container>
  );
}
