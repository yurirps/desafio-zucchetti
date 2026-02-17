# 📋 Painel de Gestão de Usuários  (React + TypeScript)

Aplicação web para gerenciamento de usuários com listagem, criação, edição e exclusão, consumindo uma API mock externa.

Projeto desenvolvido como desafio técnico front-end.

Link do deploy -> https://zucchetti-user-management.vercel.app/

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

### ✅ Tema
- Dark - Light

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
    Button/
      btn-toggle.tsx
    Formulario/
      form.tsx
    UserList/
      user-list.tsx
      user-list.module.css
    hooks/
      useThemeMode.ts
    services/
      user-service.ts
    test/
      CreateUser.test.tsx
      setup.ts
      User-interaction.test.tsx
      UserList.test.tsx
    theme/
      themeContext.ts
      themeProvider.ts
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

<img width="907" height="840" alt="image" src="https://github.com/user-attachments/assets/c1718832-ad1e-4247-8410-f11e94b78901" />

<img width="866" height="855" alt="image" src="https://github.com/user-attachments/assets/6c075b02-2d57-4807-a442-4c7fb2e9254e" />

<img width="886" height="708" alt="image" src="https://github.com/user-attachments/assets/9c017f7c-f140-4f31-b2bf-d9fced2ef4d7" />

<img width="927" height="281" alt="image" src="https://github.com/user-attachments/assets/3eeb6a86-71ce-43f0-ad19-ed664324c188" />


