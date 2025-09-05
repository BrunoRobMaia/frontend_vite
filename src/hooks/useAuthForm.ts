import { useForm } from "react-hook-form";

import { authSchema } from "../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function useAuthForm() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  return {
    errors,
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    resetField,
  };
}
