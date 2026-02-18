import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import UsersList from "../components/Usuarios/user-list";
import * as userService from "../services/user-service";
import type { User } from "../types/User";

vi.mock("../services/user-service");

describe("UsersList - atualização de estado global", () => {
  it("deve atualizar o usuário após edição e refletir na tabela", async () => {
    const user = userEvent.setup();

    const mockUsers: User[] = [
      {
        id: 1,
        name: "João Original",
        email: "joao@email.com",
        status: "active",
      },
    ];

    // GET inicial
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers);

    // PUT update
    vi.mocked(userService.updateUser).mockImplementation(
      async (updated) => updated,
    );

    render(<UsersList />);

    // espera carregar lista
    await waitFor(() => {
      expect(screen.getByText("João Original")).toBeInTheDocument();
    });

    // clicar no botão editar (primeiro botão de edição)
    const editButtons = screen.getAllByRole("button");
    const editButton = editButtons.find((btn) =>
      btn.querySelector("svg[data-testid='EditIcon']"),
    );

    await user.click(editButton!);

    // verifica se modal abriu com dados preenchidos
    const nameInput = screen.getByLabelText("Nome") as HTMLInputElement;
    expect(nameInput.value).toBe("João Original");

    // altera nome
    await user.clear(nameInput);
    await user.type(nameInput, "João Atualizado");

    // salva atualização
    await user.click(screen.getByRole("button", { name: /atualizar/i }));

    // verifica se estado global foi atualizado (tabela)
    await waitFor(() => {
      expect(screen.getByText("João Atualizado")).toBeInTheDocument();
    });

    // garante que nome antigo sumiu
    expect(screen.queryByText("João Original")).not.toBeInTheDocument();
  });
});
