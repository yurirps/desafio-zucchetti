import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import UsersList from "../components/Usuarios/user-list";
import * as userService from "../services/user-service";

vi.mock("../services/user-service");

describe("UsersList - criação de usuário", () => {
  it("deve permitir criar um novo usuário pelo modal", async () => {
    const user = userEvent.setup();

    // lista inicial vazia
    vi.mocked(userService.getUsers).mockResolvedValue([]);

    // mock da criação
    vi.mocked(userService.createUser).mockImplementation(async (payload) => ({
      id: 999,
      ...payload,
    }));

    render(<UsersList />);

    // espera carregar
    await waitFor(() => {
      expect(screen.getByText("Lista de Usuários")).toBeInTheDocument();
    });

    // abre modal
    await user.click(
      screen.getByRole("button", { name: /cadastrar novo usuário/i }),
    );

    // preenche nome
    await user.type(screen.getByLabelText("Nome"), "Pedro Teste");

    // preenche email
    await user.type(screen.getByLabelText("Email"), "pedro@teste.com");

    // status já é active por padrão

    // salva
    await user.click(screen.getByRole("button", { name: /salvar/i }));

    // verifica se apareceu na tabela
    await waitFor(() => {
      expect(screen.getByText("Pedro Teste")).toBeInTheDocument();
      expect(screen.getByText("pedro@teste.com")).toBeInTheDocument();
    });
  });
});
