import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import Header from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { useTask } from "@/services/hooks/useTask";

export function TaskPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { id } = useParams({ strict: false })

    const {
        data: task,
        isLoading,
        error,
    } = useTask(id || "");

    if (isLoading) return <div>Carregando...</div>
    if (error || !task) return <div>Erro ao carregar task</div>

    console.log(task);

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
                <div className="flex-1 flex flex-col">
                    <Header setSidebarOpen={setSidebarOpen} />
        
                    <main className="flex-1">
                        <div className="lg:flex justify-between items-center hidden h-15.25 px-4 border-b border-gray-300">
                            <h1>Bem vindo, John Doe</h1>
                            <img src="/images/user-img.png" className="w-10 object-cover" />
                        </div>
                        <div className="px-4 py-8 max-w-5xl mx-auto space-y-8">       
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {task.title}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Criada em{' '}
                                    {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                
                            <div className="rounded-lg border bg-white p-6 space-y-2">
                                <h2 className="text-lg font-semibold">
                                Descrição
                                </h2>
                                <p className="text-gray-700">
                                {task.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="rounded-lg border p-4">
                                    <p className="text-sm text-gray-500">
                                        Prazo
                                    </p>
                                    <p className="font-medium">
                                        {new Date(task.deadline).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>
                                    <p className="font-medium">
                                        {task.status}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-sm text-gray-500">
                                        Prioridade
                                    </p>
                                    <p className="font-medium">
                                        {task.priority}
                                    </p>
                                </div>
                            </div>
                            <div className="py-4">
                                <h2 className="text-lg font-semibold mb-2">Comentários</h2>
                                <div className="mt-5">
                                    {task.comments.length === 0 && (
                                        <p className="text-gray-500">Nenhum comentário ainda.</p>
                                    )}
                                    {task.comments.map((comment) => (
                                        <div key={comment.id} className="flex items-center gap-3 border-b border-gray-300 pb-4">
                                            <img src="/images/user-img.png" alt="foto de usuário" className="w-10 object-cover" />
                                            <div className="flex flex-col">
                                                <p className="text-sm text-gray-500">
                                                    {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                                                </p>
                                                <p className="text-sm text-gray-500 font-normal">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}