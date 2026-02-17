import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import type { User } from "../../types/User";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function Form({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    emailInvalid: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    const newErrors = {
      name: name.trim() === "",
      email: email.trim() === "",
      emailInvalid: !emailRegex.test(email),
    };

    // se estiver vazio, não precisa validar formato
    if (newErrors.email) {
      newErrors.emailInvalid = false;
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.emailInvalid) return;

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      status,
    };

    onSave(newUser);
    onClose();

    // reset
    setName("");
    setEmail("");
    setStatus("active");
    setErrors({
      name: false,
      email: false,
      emailInvalid: false,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Novo usuário</DialogTitle>

      <DialogContent>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          helperText={errors.name && "Nome é obrigatório"}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email || errors.emailInvalid}
          helperText={
            errors.email
              ? "Email é obrigatório"
              : errors.emailInvalid
              ? "Formato de email inválido"
              : ""
          }
        />

        <TextField
          select
          label="Status"
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "active" | "inactive")
          }
        >
          <MenuItem value="active">Ativo</MenuItem>
          <MenuItem value="inactive">Inativo</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
