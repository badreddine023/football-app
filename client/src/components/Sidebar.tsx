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
      "h-full w-64 bg-sidebar text-sidebar-foreground flex flex-col border-sidebar-border shadow-2xl transition-all duration-300",
      isRTL ? "border-l" : "border-r"
    )}>
      {/* Logo Section */}
      <div className="p-8 border-b border-sidebar-border/50">
        <Link href="/">
          <a className="flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Trophy className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sidebar-foreground to-sidebar-foreground/70">
                FootScore
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Pro Dashboard</p>
            </div>
          </a>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                )}
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-primary/60"
                )} />
                <span className="font-bold tracking-wide">{item.label}</span>
                {isActive && (
                  <div className={cn(
                    "absolute w-1.5 h-6 bg-primary-foreground rounded-full",
                    isRTL ? "left-0" : "right-0"
                  )} />
                )}
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
