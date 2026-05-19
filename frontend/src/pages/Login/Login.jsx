import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const loginStore = useAuthStore(
    (state) => state.login
  );

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      loginStore(
        response.data.user,
        response.data.access_token
      );

      navigate("/dashboard");

    } catch (error) {
      alert("Credenciais inválidas");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}