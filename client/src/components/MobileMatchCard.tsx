import { cn } from "@/lib/utils";

interface MobileMatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED" | "IN_PLAY" | "TIMED";
  date: string;
  competition: string;
  matchday?: number;
  className?: string;
}

export default function MobileMatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  date,
  competition,
  matchday,
  className,
}: MobileMatchCardProps) {
  const isLive = status === "LIVE" || status === "IN_PLAY";
  const isFinished = status === "FINISHED";
  const isScheduled = status === "SCHEDULED" || status === "TIMED";

  return (
    <div className={cn(
      "px-4 py-3 border-b border-sidebar-border/30 hover:bg-sidebar-border/20 transition-colors",
      className
    )}>
      {/* Match Header with Tabs */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-sidebar-foreground/60">المباريات</span>
          <span className="text-sidebar-foreground/60">●</span>
          <span className="text-sidebar-foreground/60">المدافعين</span>
          <span className="text-sidebar-foreground/60">●</span>
          <span className="text-sidebar-foreground/60">الترتيب</span>
        </div>
      </div>

      {/* Match Score */}
      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex-1 text-right">
          <p className="text-sm font-bold text-sidebar-foreground mb-1">{homeTeam}</p>
          <div className="w-10 h-10 bg-sidebar-border/50 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-xs font-bold text-sidebar-foreground/60">
              {homeTeam.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-1">
          {isFinished || isLive ? (
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-primary">{homeScore ?? 0}</span>
              <span className="text-sm font-bold text-sidebar-foreground/30">-</span>
              <span className="text-2xl font-black text-primary">{awayScore ?? 0}</span>
            </div>
          ) : (
            <div className="text-xs font-bold text-sidebar-foreground/60">VS</div>
          )}
          {isLive && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-red-500">LIVE</span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1 text-left">
          <p className="text-sm font-bold text-sidebar-foreground mb-1">{awayTeam}</p>
          <div className="w-10 h-10 bg-sidebar-border/50 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-xs font-bold text-sidebar-foreground/60">
              {awayTeam.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Live Indicator for Live Matches */}
      {isLive && (
        <div className="absolute right-4 top-3 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}
