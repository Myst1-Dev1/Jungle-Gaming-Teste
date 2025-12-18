import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { RegisterFormData } from "@/schemas/register.schema";
import { Spinner } from "@/components/ui/spinner"
import { registerSchema } from "@/schemas/register.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RegisterFormProps {
  setSignType: (type: "signIn" | "signUp") => void
}

export function RegisterForm({ setSignType }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterFormData) {
  try {
    const res = await fetch(
      `http://localhost:3001/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("Registration failed:", result);
      return;
    }

    setSignType("signIn");
  } catch (error) {
    console.error("Network error:", error);
  }
}

  return (
    <>
      <h1 className="text-xl font-bold py-5">Crie sua conta</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Nome de usuário</Label>
          <Input
            id="username"
            placeholder="john"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-sm text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <span className="text-center text-sm">
          Já possui uma conta?{" "}
          <span
            onClick={() => setSignType("signIn")}
            className="text-muted-foreground font-semibold cursor-pointer hover:underline"
          >
            Entrar
          </span>
        </span>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner  /> : "Criar conta"}
        </Button>
      </form>
    </>
  )
}
