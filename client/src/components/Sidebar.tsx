import { Link } from "wouter";
import { BarChart3, Calendar, Trophy, TrendingUp, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeRoute?: string;
}

export default function Sidebar({ activeRoute }: SidebarProps) {
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/fixtures", label: "Fixtures", icon: Calendar },
    { href: "/results", label: "Results", icon: Trophy },
    { href: "/standings", label: "Standings", icon: BarChart3 },
    { href: "/predictions", label: "Predictions", icon: TrendingUp },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
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
      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
        <p>© 2026 FootScore</p>
        <p>Football Data & Predictions</p>
      </div>
    </aside>
  );
}
