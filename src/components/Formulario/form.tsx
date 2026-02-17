import { useEffect, useState } from "react";
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
  initialData?: User | null;
}

interface FormState {
  name: string;
  email: string;
  status: "active" | "inactive";
}

export default function Form({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    status: "active",
  });
  
  // VALIDATION STATE  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    emailInvalid: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (!open) return;

    setFormData(
      initialData ?? {
        name: "",
        email: "",
        status: "active",
      }
    );

    setErrors({
      name: false,
      email: false,
      emailInvalid: false,
    });
  }, [initialData, open]);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    };

  
  // SUBMIT  
  const handleSubmit = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      emailInvalid: !emailRegex.test(formData.email),
    };

    if (newErrors.email) {
      newErrors.emailInvalid = false;
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.emailInvalid) return;

    const newUser: User = {
      id: initialData ? initialData.id : Date.now(),
      ...formData,
    };

    onSave(newUser);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initialData ? "Editar usuário" : "Novo usuário"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange("name")}
          error={errors.name}
          helperText={errors.name && "Nome é obrigatório"}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange("email")}
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
          value={formData.status}
          onChange={handleChange("status")}
        >
          <MenuItem value="active">Ativo</MenuItem>
          <MenuItem value="inactive">Inativo</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Atualizar" : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
