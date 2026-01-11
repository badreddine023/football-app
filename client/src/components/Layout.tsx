import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X, User } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: string;
}

export default function Layout({ children, activeRoute }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isRTL, t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar / Navigation */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
          isSidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full"),
          "w-full lg:w-80"
        )}
      >
        <Sidebar activeRoute={activeRoute} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header - Matching Screenshot */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#1A1A1A] sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <h1 className="text-xl font-bold flex items-center gap-2">
                {t.appTitle}
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </h1>
              <p className="text-[10px] text-gray-400">{t.appSubtitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
