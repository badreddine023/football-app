import { useState, useEffect } from "react";
import { footballApi } from "@/lib/footballApi";

interface StandingsRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface UseStandingsResult {
  standings: StandingsRow[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStandings(competitionCode: string): UseStandingsResult {
  const [standings, setStandings] = useState<StandingsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await footballApi.getStandings(competitionCode);

      if (response.error) {
        setError(response.error);
        setStandings([]);
      } else if (response.data?.standings && response.data.standings.length > 0) {
        // Transform API response to our format
        const table = response.data.standings[0].table;
        const transformedStandings: StandingsRow[] = table.map((row: any) => ({
          position: row.position,
          team: row.team.name,
          played: row.playedGames,
          won: row.won,
          drawn: row.draw,
          lost: row.lost,
          goalsFor: row.goalsFor,
          goalsAgainst: row.goalsAgainst,
          goalDifference: row.goalDifference,
          points: row.points,
        }));
        setStandings(transformedStandings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch standings");
      setStandings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [competitionCode]);

  return { standings, loading, error, refetch: fetchStandings };
}
