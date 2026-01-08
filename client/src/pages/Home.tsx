import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import MatchCard from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { Link } from "wouter";

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

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulated API call - will be replaced with actual Football-Data API
      const mockMatches: Match[] = [
        {
          id: "1",
          homeTeam: "Manchester United",
          awayTeam: "Liverpool",
          homeScore: 2,
          awayScore: 1,
          status: "FINISHED",
          date: "2026-01-08T20:00:00Z",
          competition: "Premier League",
          matchday: 21,
        },
        {
          id: "2",
          homeTeam: "Real Madrid",
          awayTeam: "Barcelona",
          homeScore: 1,
          awayScore: 1,
          status: "LIVE",
          date: "2026-01-08T21:00:00Z",
          competition: "La Liga",
          matchday: 19,
        },
        {
          id: "3",
          homeTeam: "Bayern Munich",
          awayTeam: "Borussia Dortmund",
          status: "SCHEDULED",
          date: "2026-01-09T19:30:00Z",
          competition: "Bundesliga",
          matchday: 18,
        },
        {
          id: "4",
          homeTeam: "Paris Saint-Germain",
          awayTeam: "Marseille",
          status: "SCHEDULED",
          date: "2026-01-09T20:00:00Z",
          competition: "Ligue 1",
          matchday: 20,
        },
        {
          id: "5",
          homeTeam: "Juventus",
          awayTeam: "Inter Milan",
          homeScore: 0,
          awayScore: 2,
          status: "FINISHED",
          date: "2026-01-07T20:45:00Z",
          competition: "Serie A",
          matchday: 19,
        },
      ];
      setMatches(mockMatches);
    } catch (err) {
      setError("Failed to fetch matches. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const liveMatches = matches.filter((m) => m.status === "LIVE");
  const upcomingMatches = matches.filter((m) => m.status === "SCHEDULED");
  const finishedMatches = matches.filter((m) => m.status === "FINISHED");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeRoute="/" />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Hero Banner */}
        <HeroBanner
          title="Live Football Scores & Predictions"
          subtitle="Get real-time updates on matches, standings, and predictions from all major leagues"
          backgroundImage="/images/hero-stadium.jpg"
        />

        {/* Content Container */}
        <div className="container mx-auto px-4 py-12">
          {/* Refresh Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-heading">Today's Matches</h2>
            <Button
              onClick={fetchMatches}
              disabled={loading}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Live Matches */}
              {liveMatches.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold font-heading mb-4 text-primary">
                    🔴 Live Now ({liveMatches.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {liveMatches.map((match) => (
                      <MatchCard key={match.id} {...match} />
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming Matches */}
              {upcomingMatches.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold font-heading mb-4">
                    📅 Upcoming Matches ({upcomingMatches.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingMatches.map((match) => (
                      <MatchCard key={match.id} {...match} />
                    ))}
                  </div>
                </section>
              )}

              {/* Finished Matches */}
              {finishedMatches.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold font-heading mb-4 text-muted-foreground">
                    ✅ Recent Results ({finishedMatches.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {finishedMatches.map((match) => (
                      <MatchCard key={match.id} {...match} />
                    ))}
                  </div>
                </section>
              )}

              {/* No Matches */}
              {matches.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No matches found</p>
                  <Button onClick={fetchMatches} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {/* CTA Section */}
              <section className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <h3 className="text-2xl font-bold font-heading mb-3">
                  Want Predictions?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Check out our AI-powered predictions for upcoming matches
                </p>
                <Link href="/predictions">
                  <a>
                    <Button className="gap-2">
                      View Predictions →
                    </Button>
                  </a>
                </Link>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
