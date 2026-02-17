import { useEffect, useState } from "react";
import { getUsers } from "../../services/user-service";
import type { User } from "../../types/User";
import styles from "./user-list.module.css";
import Form from "../Formulario/form";

import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TableSortLabel,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  // ordenação
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
    setOpenForm(false);
  };

  const handleDelete = (id: number) => {
    console.log("Deletar usuário:", id);
    // deleteUser()
  };

  const handleEdit = (id: number) => {
    console.log("Editar usuário:", id);
    // updateUser()
  };

  // alternar ordenação
  const handleSortByName = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // filtrar user
  const searchUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  // lista ordenada
  const sortedUsers = [...searchUsers].sort((a, b) => {
    if (order === "asc") {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box className={styles.btn}>
            <Typography variant="h5">Lista de Usuários</Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenForm(true)}
            >
              Cadastrar novo usuário
            </Button>
          </Box>

          <TextField
            label="Buscar por nome"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active
                      direction={order}
                      onClick={handleSortByName}
                    >
                      <strong>Nome</strong>
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>

                  <TableCell align="center">
                    <strong>Ações</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === "active" ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(user.id)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Form
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddUser}
      />
    </>
  );
}
