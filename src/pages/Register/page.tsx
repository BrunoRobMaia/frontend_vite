import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import type { AuthFormData } from "../../types";
import useRegisterForm from "../../hooks/useRegisterForm";
import { api } from "../../services/api";
import { toast, Toaster } from "sonner";
import axios from "axios";

export function Register() {
  const { register, handleSubmit, errors } = useRegisterForm();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleRegister(data: AuthFormData) {
    setLoading(true);
    try {
      await api.post("/api/v1/register", data);
      toast.success("Cadastro realizado com sucesso");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            "Ocorreu um erro ao realizar o cadastro"
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
              Crie sua conta
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="rounded-md space-y-4">
              <div>
                <Input
                  type="text"
                  label="Nome completo"
                  placeholder="Seu nome completo"
                  {...register("name")}
                  error={errors.name ? true : false}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  label="Email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  error={errors.email ? true : false}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  label="Senha"
                  placeholder="Sua senha"
                  {...register("password")}
                  error={errors.password ? true : false}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  label="Confirmar senha"
                  placeholder="Confirme sua senha"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword ? true : false}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button type="submit" variant="primary" isLoading={loading}>
                Cadastrar
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Entre aqui
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
