import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: string;
}

export default function Layout({ children, activeRoute }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isRTL } = useLanguage();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
          isSidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full"),
          "w-64"
        )}
      >
        <Sidebar activeRoute={activeRoute} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card sticky top-0 z-30">
          <div className="flex items-center gap-2">
             <h1 className="text-xl font-black font-heading tracking-tight text-primary">
                FootScore
              </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
