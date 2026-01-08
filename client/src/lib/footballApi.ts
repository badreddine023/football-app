/**
 * Football-Data API Service
 * Handles all API calls to football-data.org
 * 
 * API Documentation: https://www.football-data.org/documentation/api
 * Free tier: 10 requests/minute
 */

const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = import.meta.env.VITE_FOOTBALL_DATA_API_KEY || "demo";

interface ApiResponse<T> {
  data: T;
  error?: string;
}

interface Match {
  id: number;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "CANCELLED" | "SUSPENDED";
  stage: string;
  group?: string;
  lastUpdated: string;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    winner?: "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
    duration: "REGULAR" | "EXTRA_TIME" | "PENALTY_SHOOTOUT";
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
  referees: Array<{
    id: number;
    name: string;
    type: string;
    nationality: string;
  }>;
}

interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner?: {
      id: number;
      name: string;
    };
  };
  seasons: Array<{
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  }>;
  lastUpdated: string;
}

interface Standing {
  stage: string;
  type: string;
  group?: string;
  table: Array<{
    position: number;
    team: {
      id: number;
      name: string;
      shortName: string;
      tla: string;
      crest: string;
    };
    playedGames: number;
    form?: string;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
  }>;
}

// Helper function to make API calls
async function fetchFromApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("API Error:", error);
    return {
      data: null as any,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// API Methods
export const footballApi = {
  /**
   * Get matches for today or a specific date range
   */
  async getMatches(params?: {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    competitions?: string;
  }): Promise<ApiResponse<{ matches: Match[] }>> {
    let query = "/matches";
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.dateFrom) queryParams.append("dateFrom", params.dateFrom);
      if (params.dateTo) queryParams.append("dateTo", params.dateTo);
      if (params.status) queryParams.append("status", params.status);
      if (params.competitions) queryParams.append("competitions", params.competitions);
      if (queryParams.toString()) {
        query += `?${queryParams.toString()}`;
      }
    }
    return fetchFromApi<{ matches: Match[] }>(query);
  },

  /**
   * Get matches for a specific competition
   */
  async getCompetitionMatches(
    competitionCode: string,
    params?: {
      season?: number;
      stage?: string;
      status?: string;
      matchday?: number;
    }
  ): Promise<ApiResponse<{ matches: Match[] }>> {
    let query = `/competitions/${competitionCode}/matches`;
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.season) queryParams.append("season", params.season.toString());
      if (params.stage) queryParams.append("stage", params.stage);
      if (params.status) queryParams.append("status", params.status);
      if (params.matchday) queryParams.append("matchday", params.matchday.toString());
      if (queryParams.toString()) {
        query += `?${queryParams.toString()}`;
      }
    }
    return fetchFromApi<{ matches: Match[] }>(query);
  },

  /**
   * Get standings for a specific competition
   */
  async getStandings(
    competitionCode: string,
    params?: { season?: number }
  ): Promise<ApiResponse<{ standings: Standing[] }>> {
    let query = `/competitions/${competitionCode}/standings`;
    if (params?.season) {
      query += `?season=${params.season}`;
    }
    return fetchFromApi<{ standings: Standing[] }>(query);
  },

  /**
   * Get all available competitions
   */
  async getCompetitions(): Promise<ApiResponse<{ competitions: Competition[] }>> {
    return fetchFromApi<{ competitions: Competition[] }>("/competitions");
  },

  /**
   * Get a specific match details
   */
  async getMatch(matchId: number): Promise<ApiResponse<Match>> {
    return fetchFromApi<Match>(`/matches/${matchId}`);
  },

  /**
   * Get team details
   */
  async getTeam(teamId: number): Promise<ApiResponse<any>> {
    return fetchFromApi<any>(`/teams/${teamId}`);
  },

  /**
   * Get team matches
   */
  async getTeamMatches(
    teamId: number,
    params?: { status?: string; limit?: number }
  ): Promise<ApiResponse<{ matches: Match[] }>> {
    let query = `/teams/${teamId}/matches`;
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append("status", params.status);
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (queryParams.toString()) {
        query += `?${queryParams.toString()}`;
      }
    }
    return fetchFromApi<{ matches: Match[] }>(query);
  },
};

// Popular competition codes
export const COMPETITION_CODES = {
  PL: "Premier League",
  PD: "La Liga",
  BL1: "Bundesliga",
  SA: "Serie A",
  FL1: "Ligue 1",
  PPL: "Primeira Liga",
  DED: "Eredivisie",
  CL: "UEFA Champions League",
  EL: "UEFA Europa League",
  WC: "FIFA World Cup",
};
