import { useState } from "react"
import { SideBar } from "@/components/SideBar"
import Header from "@/components/Header"
import { TaskTable } from "@/components/TaskTable"
import { useTasks } from "@/services/hooks/useTasks"
import { CreateTaskModal } from "@/components/CreateTaskModal"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data, isLoading } = useTasks()

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1">
          <div className="lg:flex justify-between items-center hidden h-15.25 px-4 border-b border-gray-300">
            <h1>Bem vindo, John Doe</h1>
            <img src="/images/user-img.png" className="w-10 object-cover" />
          </div>
          <div className="px-4 py-12">
            <div className="flex flex-wrap gap-4 lg:gap-0 justify-between items-center">
                <h2 className="text-xl font-bold">Minhas tarefas</h2>
                <CreateTaskModal />
            </div>
            <div className="py-12">
                <TaskTable tasks={data} isLoading={isLoading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
