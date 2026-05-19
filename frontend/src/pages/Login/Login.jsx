import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import useAuthStore from "../../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      setAuth(
        response.data.user,
        response.data.access_token
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert("Erro ao realizar login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-2xl w-96 border border-slate-700">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 rounded-lg mb-6 bg-slate-700 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}