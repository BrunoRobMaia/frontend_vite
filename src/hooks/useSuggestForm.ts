import { useForm } from "react-hook-form";

import { suggestionSchema } from "../schema/suggestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function useSuggestForm() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<z.infer<typeof suggestionSchema>>({
    resolver: zodResolver(suggestionSchema),
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
