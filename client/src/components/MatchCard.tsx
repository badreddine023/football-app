import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED";
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
  const isLive = status === "LIVE";
  const isFinished = status === "FINISHED";
  const isScheduled = status === "SCHEDULED";

  const getStatusColor = () => {
    if (isLive) return "bg-red-500 text-white";
    if (isFinished) return "bg-green-500 text-white";
    if (isScheduled) return "bg-blue-500 text-white";
    return "bg-gray-500 text-white";
  };

  const getStatusLabel = () => {
    if (isLive) return "LIVE";
    if (isFinished) return "FINISHED";
    if (isScheduled) return "SCHEDULED";
    return status;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 space-y-3">
        {/* Header with competition and status */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            {competition}
            {matchday && ` · MD ${matchday}`}
          </span>
          <Badge className={cn("text-xs font-bold", getStatusColor())}>
            {getStatusLabel()}
          </Badge>
        </div>

        {/* Match Score Section */}
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <p className="font-semibold text-sm truncate">{homeTeam}</p>
            {isFinished || isLive ? (
              <p className="text-3xl font-bold text-primary mt-1">{homeScore}</p>
            ) : null}
          </div>

          {/* VS or Score Divider */}
          <div className="flex flex-col items-center gap-1">
            {isFinished || isLive ? (
              <span className="text-xl font-bold text-muted-foreground">-</span>
            ) : (
              <span className="text-xs font-semibold text-muted-foreground">VS</span>
            )}
            {isLive && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <p className="font-semibold text-sm truncate">{awayTeam}</p>
            {isFinished || isLive ? (
              <p className="text-3xl font-bold text-primary mt-1">{awayScore}</p>
            ) : null}
          </div>
        </div>

        {/* Date/Time */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
