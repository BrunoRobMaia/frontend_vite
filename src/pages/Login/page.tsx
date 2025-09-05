import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import useAuthForm from "../../hooks/useAuthForm";
import type { AuthFormData } from "../../schema/authSchema";
import { api } from "../../services/api";
import { toast, Toaster } from "sonner";
import axios from "axios";

export function Login() {
  const { handleSubmit, register, errors } = useAuthForm();

  const [loading, setLoading] = useState(false);

  async function handleLogin(data: AuthFormData) {
    setLoading(true);
    try {
      await api.post("/api/v1/login", data);
      toast.success("Login realizado com sucesso");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Ocorreu um erro ao realizar o login"
        );
      } else {
        toast.error(
          "Erro inesperado na aplicação, entre em contato com o suporte"
        );
      }
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

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-900">Lembrar-me</span>
              </label>

              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Esqueceu sua senha?
              </a>
            </div>

            <Button type="submit" variant="primary" isLoading={loading}>
              Entrar
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
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
