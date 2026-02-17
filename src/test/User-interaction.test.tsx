import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import UsersList from "../components/Usuarios/user-list";
import * as userService from "../services/user-service";
import type { User } from "../types/User";


// Mock das APIs
vi.mock("../services/user-service.ts");

describe("Integração - interação simulada do usuário", () => {
  it("cria um novo usuário via modal e lista atualiza", async () => {
    const user = userEvent.setup();

    const mockUsers: User[] = [
      { id: 1, name: "Maria", email: "maria@email.com", status: "active" },
    ];

    // Mock do getUsers
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers);

    // Mock do createUser
    vi.mocked(userService.createUser).mockImplementation(async (u) => ({
      id: Date.now(),
      ...u,
    }));

    render(<UsersList />);

    // espera a lista carregar
    await waitFor(() => expect(screen.getByText("Maria")).toBeInTheDocument());

    // clica em "Cadastrar novo usuário"
    const addButton = screen.getByRole("button", { name: /cadastrar novo usuário/i });
    await user.click(addButton);

    // preenche o formulário
    await user.type(screen.getByLabelText("Nome"), "João");
    await user.type(screen.getByLabelText("Email"), "joao@email.com");

    // seleciona status Inativo
    await user.click(screen.getByLabelText("Status"));
    await user.click(screen.getByText("Inativo"));

    // clica em Salvar
    await user.click(screen.getByRole("button", { name: /salvar/i }));

    // verifica se novo usuário aparece na tabela
    await waitFor(() => {
      expect(screen.getByText("João")).toBeInTheDocument();
      expect(screen.getByText("Inativo")).toBeInTheDocument();
    });
  });
});
