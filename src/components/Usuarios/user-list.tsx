import { useEffect, useState } from "react";
import { getUsers } from "../../services/user-service";
import type { User } from "../../types/User";

import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = (id: number) => {
    console.log("Deletar usuário:", id);
    // deleteUser()
  };

    const handleEdit = (id: number) => {
    console.log("Editar Usuario:", id);
    // updateUser()
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Lista de Usuários
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nome</strong>
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
              {users.map((user) => (
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
  );
}
