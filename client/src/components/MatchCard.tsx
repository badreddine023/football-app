import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Trophy, Clock, Calendar as CalendarIcon } from "lucide-react";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED" | "IN_PLAY" | "TIMED";
  date: string;
  competition: string;
  matchday?: number;
}

export default function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  date,
  competition,
  matchday,
}: MatchCardProps) {
  const isLive = status === "LIVE" || status === "IN_PLAY";
  const isFinished = status === "FINISHED";
  const isScheduled = status === "SCHEDULED" || status === "TIMED";

  const getStatusColor = () => {
    if (isLive) return "bg-red-500/10 text-red-500 border-red-500/20";
    if (isFinished) return "bg-green-500/10 text-green-500 border-green-500/20";
    if (isScheduled) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  const getStatusLabel = () => {
    if (isLive) return "LIVE";
    if (isFinished) return "FT";
    if (isScheduled) return "UPCOMING";
    return status;
  };

  return (
    <Card className="group relative overflow-hidden border-none bg-card/50 backdrop-blur-md hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="p-5 space-y-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              {competition} {matchday && `· MD ${matchday}`}
            </span>
          </div>
          <Badge variant="outline" className={cn("text-[10px] font-black px-2 py-0.5 rounded-full border", getStatusColor())}>
            {getStatusLabel()}
          </Badge>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-2">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <span className="text-xl font-black text-muted-foreground/50">{homeTeam.substring(0, 2).toUpperCase()}</span>
            </div>
            <p className="font-bold text-sm leading-tight h-10 flex items-center justify-center">{homeTeam}</p>
          </div>

          {/* Score/VS Divider */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            {isFinished || isLive ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black tracking-tighter text-primary">{homeScore ?? 0}</span>
                <span className="text-lg font-bold text-muted-foreground/30">:</span>
                <span className="text-3xl font-black tracking-tighter text-primary">{awayScore ?? 0}</span>
              </div>
            ) : (
              <div className="px-4 py-1 bg-muted/50 rounded-full">
                <span className="text-xs font-black text-muted-foreground tracking-widest">VS</span>
              </div>
            )}
            {isLive && (
              <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded-full">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-red-500">LIVE</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <span className="text-xl font-black text-muted-foreground/50">{awayTeam.substring(0, 2).toUpperCase()}</span>
            </div>
            <p className="font-bold text-sm leading-tight h-10 flex items-center justify-center">{awayTeam}</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">
              {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">
              {new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
