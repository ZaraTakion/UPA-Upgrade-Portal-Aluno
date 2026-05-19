import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 min-h-screen p-4">
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/profile">
          Perfil
        </Link>

        <Link to="/subjects">
          Disciplinas
        </Link>

        <Link to="/calendar">
          Calendário
        </Link>
      </nav>
    </aside>
  );
}