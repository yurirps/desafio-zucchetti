# 📋 Painel de Gestão de Usuários  (React + TypeScript)

Aplicação web para gerenciamento de usuários com listagem, criação, edição e exclusão, consumindo uma API mock externa.

Projeto desenvolvido como desafio técnico front-end.

---

## 🚀 Funcionalidades

### ✅ Listagem de usuários
- Busca por nome
- Ordenação alfabética
- Indicador visual de status (ativo / inativo)

### ✅ Cadastro de usuário
- Modal reutilizável
- Validação obrigatória:
  - Nome
  - Email
- Validação de formato de email
- Status selecionável (ativo ou inativo)
- Integração com API mock

### ✅ Edição de usuário
- Reutiliza o mesmo modal do cadastro
- Campos pré-preenchidos
- Atualização via API
- Atualização imediata da listagem (estado global local)

### ✅ Exclusão de usuário
- Confirmação antes de excluir
- Chamada DELETE na API
- Atualização imediata da listagem

---

## 🔌 API utilizada

API pública mock:
```
https://jsonplaceholder.typicode.com/users
```

### ⚠️ Importante
A API é simulada e **não persiste alterações reais**.

Isso significa que:
- dados criados não ficam salvos no servidor
- edição e exclusão são simuladas
- o estado real é mantido apenas no frontend

---

## 🛠️ Tecnologias utilizadas

- React
- TypeScript
- Vite
- Material UI
- Axios
- CSS Modules

---

## 📁 Estrutura do projeto

```
src/
  components/
    Formulario/
      form.tsx
    UserList/
      user-list.tsx
      user-list.module.css

  services/
    user-service.ts

  types/
    User.ts
```

---

## 🔄 Fluxo de dados

1. Aplicação carrega usuários da API (GET)
2. Dados armazenados em estado local global da tela
3. Operações CRUD chamam a API mock
4. Estado local é atualizado manualmente para refletir mudanças

---

## 🧪 Testes

### Testes unitários
- Renderização da listagem
- Criação de usuário
- Atualização do estado global

## ▶️ Como rodar o projeto

### clonar o repositório
```
https://github.com/yurirps/desafio-zucchetti.git
```

### Instalar dependências

```bash
npm install
```

### Executar ambiente de desenvolvimento

```bash
npm run dev
```

### Rodar os testes

```bash
npm run test
```
