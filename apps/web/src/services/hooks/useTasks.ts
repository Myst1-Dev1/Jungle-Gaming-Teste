import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/auth.store"
import type { TaskResponse } from "@/@types/Task"

export function useTasks() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery<TaskResponse>({
    queryKey: ["tasks"],
    enabled: !!accessToken,
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/api/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!res.ok) {
        throw new Error("Erro ao buscar tasks")
      }

      return res.json()
    },
  })
}
