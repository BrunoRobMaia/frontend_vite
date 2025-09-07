import { useAuth } from "@/hooks/authHook";
import { BiLogIn, BiLogOut, BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleLogout() {
    signOut();
    navigate("/");
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          Painel Administrativo
        </h1>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <BiUserCircle className="text-2xl text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <BiLogOut className="text-lg" />
              Sair
            </Button>
          </div>
        ) : (
          <Button onClick={handleLogin} variant="primary">
            <BiLogIn className="text-lg" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
