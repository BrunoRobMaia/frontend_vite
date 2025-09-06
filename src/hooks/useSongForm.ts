import { useForm } from "react-hook-form";

import { songSchema } from "../schema/songSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function useSongForm() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<z.infer<typeof songSchema>>({
    resolver: zodResolver(songSchema),
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
