import { useState } from "react";
import { Calendar, Trophy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface MatchTabsProps {
  activeTab: "today" | "tournaments" | "dates";
  onTabChange: (tab: "today" | "tournaments" | "dates") => void;
}

export default function MatchTabs({ activeTab, onTabChange }: MatchTabsProps) {
  const { isRTL } = useLanguage();

  const tabs = [
    {
      id: "today" as const,
      label: "مباريات اليوم",
      icon: Calendar,
    },
    {
      id: "tournaments" as const,
      label: "البطولات",
      icon: Trophy,
    },
    {
      id: "dates" as const,
      label: "أهم التواريخ",
      icon: Clock,
    },
  ];

  return (
    <div className="w-full bg-sidebar text-sidebar-foreground border-b border-sidebar-border/50">
      <div className={cn("flex items-center justify-between px-4 py-3 overflow-x-auto", isRTL && "flex-row-reverse")}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 min-w-fit transition-all duration-300 relative",
                isActive ? "text-primary" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="text-xs font-bold whitespace-nowrap">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-tabs for Yesterday/Today/Tomorrow */}
      <div className={cn("flex items-center gap-4 px-4 py-2 border-t border-sidebar-border/30 bg-sidebar/50", isRTL && "flex-row-reverse")}>
        <button className="text-xs font-bold text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
          أمس
        </button>
        <span className="text-xs text-sidebar-foreground/30">|</span>
        <button className="text-xs font-bold text-primary">
          اليوم
        </button>
        <span className="text-xs text-sidebar-foreground/30">|</span>
        <button className="text-xs font-bold text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
          غدا
        </button>
      </div>
    </div>
  );
}
