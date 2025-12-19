import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import type { LoginFormData } from "@/schemas/login.schema";
import { Spinner } from "@/components/ui/spinner"
import { loginSchema } from "@/schemas/login.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/services/store/auth.store";

interface LoginFormProps {
  setSignType: (type: "signIn" | "signUp") => void
}

export function LoginForm({ setSignType }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
      const res = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })

      if (!res.ok) {
          throw new Error("Login inválido")
      }

      const result = await res.json()

      const login = useAuthStore.getState().login

      login({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: result.user,
      });

      navigate({to: '/dashboard'});
  }

  return (
    <>
      <h1 className="text-xl font-bold py-5">Bem vindo</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >

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
          Não possui uma conta?{" "}
          <span
            onClick={() => setSignType("signUp")}
            className="text-muted-foreground font-semibold cursor-pointer hover:underline"
          >
            Cadastro
          </span>
        </span>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner  /> : "Entrar"}
        </Button>
      </form>
    </>
  )
}
