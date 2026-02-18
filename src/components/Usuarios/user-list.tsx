import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/user-service";
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
import BtnToggle from "../Button/btn-toggle";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  // CREATE

  const handleAddUser = async (userData: User) => {
    try {
      const payload: Omit<User, "id"> = {
        name: userData.name,
        email: userData.email,
        status: userData.status,
      };

      const createdUser = await createUser(payload);

      const userWithStatus = {
        ...createdUser,
        status: userData.status,
      };

      setUsers((prev) => [...prev, userWithStatus]);
      setOpenForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  // UPDATE
  const handleUpdateUser = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser);

      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );

      setOpenForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
    }
  };

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      handleUpdateUser(user);
    } else {
      handleAddUser(user);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este usuário?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
    }
  };

  // Editar
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  //Ordenação
  const handleSortByName = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Busca
  const searchUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

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
            <Typography variant="h5">Gestão de Usuários </Typography>
            <div>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedUser(null);
                  setOpenForm(true);
                }}
              >
                Cadastrar novo usuário
              </Button>
              <BtnToggle />
            </div>
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
                        onClick={() => handleEdit(user)}
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
        onClose={() => {
          setOpenForm(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveUser}
        initialData={selectedUser}
      />
    </>
  );
}
