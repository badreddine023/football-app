import { Link } from "wouter";
import { BarChart3, Calendar, Trophy, TrendingUp, Home, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeRoute?: string;
}

export default function Sidebar({ activeRoute }: SidebarProps) {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const navItems = [
    { href: "/", label: t.home, icon: Home },
    { href: "/fixtures", label: t.fixtures, icon: Calendar },
    { href: "/results", label: t.results, icon: Trophy },
    { href: "/standings", label: t.standings, icon: BarChart3 },
    { href: "/predictions", label: t.predictions, icon: TrendingUp },
  ];

  return (
    <aside className={cn(
      "fixed top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col border-sidebar-border",
      isRTL ? "right-0 border-l" : "left-0 border-r"
    )}>
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/">
          <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold font-heading">FootScore</h1>
          </a>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-border"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-sidebar-border transition-colors text-sm"
        >
          <Languages className="w-4 h-4" />
          <span>{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
        <div className="text-xs text-sidebar-foreground/60">
          <p>© 2026 FootScore</p>
          <p>{t.liveFootball}</p>
        </div>
      </div>
    </aside>
  );
}
