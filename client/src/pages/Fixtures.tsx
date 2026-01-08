import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import MatchCard from "@/components/MatchCard";

export default function Fixtures() {
  const upcomingMatches = [
    {
      id: "1",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      status: "SCHEDULED" as const,
      date: "2026-01-09T19:30:00Z",
      competition: "Bundesliga",
      matchday: 18,
    },
    {
      id: "2",
      homeTeam: "Paris Saint-Germain",
      awayTeam: "Marseille",
      status: "SCHEDULED" as const,
      date: "2026-01-09T20:00:00Z",
      competition: "Ligue 1",
      matchday: 20,
    },
    {
      id: "3",
      homeTeam: "Manchester City",
      awayTeam: "Chelsea",
      status: "SCHEDULED" as const,
      date: "2026-01-10T15:00:00Z",
      competition: "Premier League",
      matchday: 22,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeRoute="/fixtures" />
      <main className="flex-1 ml-64">
        <HeroBanner
          title="Upcoming Fixtures"
          subtitle="All scheduled matches from major football leagues"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} {...match} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
