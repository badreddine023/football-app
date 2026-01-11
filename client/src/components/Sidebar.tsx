import { Link } from "wouter";
import { BarChart3, Calendar, Trophy, TrendingUp, Home, Languages, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeRoute?: string;
}

export default function Sidebar({ activeRoute }: SidebarProps) {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const navItems = [
    { href: "/", label: t.today, icon: Home },
    { href: "/standings", label: t.leagues, icon: Trophy },
    { href: "/fixtures", label: t.importantDates, icon: Calendar },
  ];

  return (
    <aside className={cn(
      "h-full w-64 bg-[#1A1A1A] text-white flex flex-col border-sidebar-border shadow-2xl transition-all duration-300",
      isRTL ? "border-l" : "border-r"
    )}>
      {/* Top Header Section */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
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
      </div>

      {/* Navigation Tabs (Horizontal Style) */}
      <div className="flex border-b border-white/10">
        {navItems.map((item) => {
          const isActive = activeRoute === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex-1 py-4 text-center text-sm font-medium transition-all relative",
                isActive ? "text-blue-500" : "text-gray-400 hover:text-white"
              )}>
                <div className="flex flex-col items-center gap-1">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
                )}
              </a>
            </Link>
          );
        })}
      </div>

      {/* Date Selector Style Navigation */}
      <div className="p-4 flex justify-around border-b border-white/10 text-sm">
        <button className="text-gray-400 hover:text-white">{t.yesterday}</button>
        <div className="h-4 w-[1px] bg-white/10" />
        <button className="text-gray-400 hover:text-white">{t.tomorrow}</button>
      </div>

      {/* Promo Banner Style */}
      <div className="m-4 p-4 bg-[#2A2A2A] rounded-lg border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-blue-400 font-bold text-lg mb-1">{t.easyFootballApp}</h3>
          <div className="flex items-center gap-2">
             <span className="text-xl font-bold">{t.appTitle}</span>
             <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
          </div>
          <button className="mt-3 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold">
            {t.downloadApp}
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20">
           <Trophy className="w-24 h-24 text-blue-500" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-white/10">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-white/5 transition-colors text-sm text-gray-400"
        >
          <Languages className="w-4 h-4" />
          <span>{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>
    </aside>
  );
}
