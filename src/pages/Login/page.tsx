import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import useAuthForm from "@/hooks/useAuthForm";
import type { AuthFormData } from "@/schema/authSchema";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/authHook";

export function Login() {
  const { handleSubmit, register, errors } = useAuthForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleLogin(data: AuthFormData) {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Login realizado com sucesso");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Ocorreu um erro ao realizar o login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Entre na sua conta
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="rounded-md space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="seu@email.com"
                {...register("email")}
                error={errors.email ? true : false}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}

              <Input
                type="password"
                label="Senha"
                placeholder="Sua senha"
                {...register("password")}
                error={errors.password ? true : false}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              fullWidth
            >
              Entrar
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
