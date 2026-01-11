import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import MatchCard from "@/components/MatchCard";

export default function Results() {
  const finishedMatches = [
    {
      id: "1",
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      status: "FINISHED" as const,
      date: "2026-01-08T20:00:00Z",
      competition: "Premier League",
      matchday: 21,
    },
    {
      id: "2",
      homeTeam: "Juventus",
      awayTeam: "Inter Milan",
      homeScore: 0,
      awayScore: 2,
      status: "FINISHED" as const,
      date: "2026-01-07T20:45:00Z",
      competition: "Serie A",
      matchday: 19,
    },
    {
      id: "3",
      homeTeam: "Atletico Madrid",
      awayTeam: "Real Sociedad",
      homeScore: 3,
      awayScore: 1,
      status: "FINISHED" as const,
      date: "2026-01-07T21:00:00Z",
      competition: "La Liga",
      matchday: 19,
    },
  ];

  return (
    <Layout activeRoute="/results">
      <HeroBanner
        title="Recent Results"
        subtitle="Latest match results from all major leagues"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {finishedMatches.map((match) => (
            <MatchCard key={match.id} {...match} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
