import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileMatchCard from "./MobileMatchCard";

interface LeagueSectionProps {
  leagueName: string;
  leagueLogo?: string;
  matches: Array<{
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    status: "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED" | "IN_PLAY" | "TIMED";
    date: string;
    competition: string;
    matchday?: number;
  }>;
  className?: string;
}

export default function LeagueSection({ leagueName, leagueLogo, matches, className }: LeagueSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={cn("w-full bg-sidebar/50 rounded-lg overflow-hidden my-4", className)}>
      {/* League Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between px-4 py-3 bg-sidebar border-b border-sidebar-border/50 cursor-pointer hover:bg-sidebar-border/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {leagueLogo && (
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-xs font-bold">
              {leagueLogo}
            </div>
          )}
          <h3 className="text-sm font-bold text-sidebar-foreground">{leagueName}</h3>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-sidebar-foreground/60 transition-transform duration-300",
            !isExpanded && "rotate-180"
          )}
        />
      </div>

      {/* Matches List */}
      {isExpanded && (
        <div className="space-y-0">
          {matches.map((match) => (
            <MobileMatchCard key={match.id} {...match} />
          ))}
        </div>
      )}
    </div>
  );
}
