import { useForm } from "react-hook-form";

import { registerSchema } from "../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function useRegisterForm() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
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
