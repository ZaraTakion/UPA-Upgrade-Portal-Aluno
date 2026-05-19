import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4 bg-slate-700"
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded mb-6 bg-slate-700"
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-blue-600 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}