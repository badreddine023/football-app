import { useState } from "react";
import { Menu, X, Settings, Home as HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface MobileHeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export default function MobileHeader({ onMenuClick, isSidebarOpen }: MobileHeaderProps) {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-sidebar text-sidebar-foreground border-b border-sidebar-border/50">
      {/* Top Status Bar */}
      <div className="px-4 py-2 flex items-center justify-between text-xs border-b border-sidebar-border/30 bg-sidebar/50">
        <div className="flex items-center gap-1">
          <span>📡</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
        <span className="font-bold">19:31</span>
      </div>

      {/* Main Navigation Bar */}
      <div className={cn("px-4 py-3 flex items-center justify-between", isRTL && "flex-row-reverse")}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-sidebar-foreground hover:bg-sidebar-border/50"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        <div className={cn("flex-1 mx-3 flex items-center gap-2", isRTL && "flex-row-reverse")}>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-border/50"
          >
            <div className="w-5 h-5 border-2 border-sidebar-foreground rounded-md" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-border/50"
          >
            <span className="text-lg">➕</span>
          </Button>
          <div className={cn("flex-1 px-3 py-1.5 bg-sidebar-border/30 rounded-full flex items-center gap-2", isRTL && "flex-row-reverse")}>
            <span className="text-xs text-sidebar-foreground/70">dwel.com/today/</span>
          </div>
        </div>

        <Link href="/">
          <a>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-border/50"
            >
              <HomeIcon className="w-5 h-5" />
            </Button>
          </a>
        </Link>
      </div>

      {/* Title Section with Settings */}
      <div className={cn("px-4 py-3 flex items-center justify-between border-t border-sidebar-border/30", isRTL && "flex-row-reverse")}>
        <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">👤</span>
          </div>
          <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
            <span className="text-sm font-bold text-sidebar-foreground">جدول</span>
            <span className="text-xs text-sidebar-foreground/60">|</span>
            <span className="text-xs text-sidebar-foreground/60">الترتيب والمباريات بسهاطة</span>
          </div>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="text-sidebar-foreground hover:bg-sidebar-border/50"
          >
            <Settings className="w-5 h-5" />
          </Button>
          {showLanguageMenu && (
            <div className={cn("absolute top-full mt-2 bg-sidebar border border-sidebar-border rounded-lg shadow-lg z-50", isRTL ? "right-0" : "left-0")}>
              <button
                onClick={() => {
                  setLanguage('ar');
                  setShowLanguageMenu(false);
                }}
                className={cn("w-full px-4 py-2 text-left text-sm hover:bg-sidebar-border/50 transition-colors", language === 'ar' && "text-primary font-bold")}
              >
                العربية
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setShowLanguageMenu(false);
                }}
                className={cn("w-full px-4 py-2 text-left text-sm hover:bg-sidebar-border/50 transition-colors", language === 'en' && "text-primary font-bold")}
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
