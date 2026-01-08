import { useState, useEffect } from "react";
import { footballApi } from "@/lib/footballApi";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED";
  date: string;
  competition: string;
  matchday?: number;
}

interface UseMatchesResult {
  matches: Match[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMatches(
  competitionCode?: string,
  options?: {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
  }
): UseMatchesResult {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;

      if (competitionCode) {
        response = await footballApi.getCompetitionMatches(competitionCode, {
          status: options?.status,
        });
      } else {
        response = await footballApi.getMatches({
          dateFrom: options?.dateFrom,
          dateTo: options?.dateTo,
          status: options?.status,
        });
      }

      if (response.error) {
        setError(response.error);
        setMatches([]);
      } else if (response.data?.matches) {
        // Transform API response to our format
        const transformedMatches: Match[] = response.data.matches.map((match: any) => ({
          id: match.id.toString(),
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          homeScore: match.score.fullTime.home,
          awayScore: match.score.fullTime.away,
          status: mapMatchStatus(match.status),
          date: match.utcDate,
          competition: match.competition.name,
          matchday: match.season.currentMatchday,
        }));
        setMatches(transformedMatches);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch matches");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [competitionCode, options?.dateFrom, options?.dateTo, options?.status]);

  return { matches, loading, error, refetch: fetchMatches };
}

function mapMatchStatus(
  apiStatus: string
): "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED" {
  switch (apiStatus) {
    case "SCHEDULED":
      return "SCHEDULED";
    case "LIVE":
    case "IN_PLAY":
      return "LIVE";
    case "FINISHED":
      return "FINISHED";
    case "POSTPONED":
    case "CANCELLED":
    case "SUSPENDED":
      return "POSTPONED";
    default:
      return "SCHEDULED";
  }
}
