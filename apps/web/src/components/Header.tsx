import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {

  return (
    <>
      <header className="flex items-center justify-between border-b p-4 md:hidden">
            <div className="flex items-center gap-3">
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                >
                <Menu className="h-5 w-5" />
                </Button>

                <h1 className="text-sm font-medium">
                Bem vindo, John Doe
                </h1>
            </div>

            <img
                src="/images/user-img.png"
                alt="User avatar"
                className="h-9 w-9 rounded-full object-cover"
            />
        </header>
    </>
  )
}
