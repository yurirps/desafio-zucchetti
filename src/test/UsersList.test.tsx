import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import * as userService from "../services/user-service";
import UsersList from "../components/Usuarios/user-list";
import type { User } from "../types/User";

// mock do módulo inteiro
vi.mock("../services/user-service");

describe("UsersList - renderização", () => {
  it("deve renderizar a lista de usuários da API", async () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        status: "active",
      },
      {
        id: 2,
        name: "Maria Souza",
        email: "maria@email.com",
        status: "inactive",
      },
    ];

    // mock da função getUsers
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers);

    render(<UsersList />);

    // loading aparece primeiro
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // espera renderizar os dados
    await waitFor(() => {
      expect(screen.getByText("João Silva")).toBeInTheDocument();
      expect(screen.getByText("Maria Souza")).toBeInTheDocument();
    });

    // valida email
    expect(screen.getByText("joao@email.com")).toBeInTheDocument();
    expect(screen.getByText("maria@email.com")).toBeInTheDocument();

    // valida status
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });
});
