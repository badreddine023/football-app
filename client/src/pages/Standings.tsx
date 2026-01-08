import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

export default function Standings() {
  const { t, isRTL } = useLanguage();
  const premierLeagueStandings: StandingsRow[] = [
    {
      position: 1,
      team: "Manchester City",
      played: 21,
      won: 16,
      drawn: 3,
      lost: 2,
      goalsFor: 52,
      goalsAgainst: 18,
      goalDifference: 34,
      points: 51,
    },
    {
      position: 2,
      team: "Liverpool",
      played: 21,
      won: 15,
      drawn: 4,
      lost: 2,
      goalsFor: 48,
      goalsAgainst: 20,
      goalDifference: 28,
      points: 49,
    },
    {
      position: 3,
      team: "Arsenal",
      played: 21,
      won: 14,
      drawn: 3,
      lost: 4,
      goalsFor: 45,
      goalsAgainst: 24,
      goalDifference: 21,
      points: 45,
    },
    {
      position: 4,
      team: "Manchester United",
      played: 21,
      won: 12,
      drawn: 5,
      lost: 4,
      goalsFor: 40,
      goalsAgainst: 25,
      goalDifference: 15,
      points: 41,
    },
    {
      position: 5,
      team: "Chelsea",
      played: 21,
      won: 11,
      drawn: 4,
      lost: 6,
      goalsFor: 38,
      goalsAgainst: 28,
      goalDifference: 10,
      points: 37,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeRoute="/standings" />
      <main className={cn("flex-1", isRTL ? "mr-64" : "ml-64")}>
        <HeroBanner
          title={t.leagueStandings}
          subtitle={t.currentStandings}
        />
        <div className="container mx-auto px-4 py-12">
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold font-heading mb-6">Premier League</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">{t.pos}</TableHead>
                      <TableHead>{t.team}</TableHead>
                      <TableHead className="text-center">{t.played}</TableHead>
                      <TableHead className="text-center">{t.won}</TableHead>
                      <TableHead className="text-center">{t.drawn}</TableHead>
                      <TableHead className="text-center">{t.lost}</TableHead>
                      <TableHead className="text-center">{t.gf}</TableHead>
                      <TableHead className="text-center">{t.ga}</TableHead>
                      <TableHead className="text-center">{t.gd}</TableHead>
                      <TableHead className="text-center font-bold">{t.pts}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {premierLeagueStandings.map((row) => (
                      <TableRow key={row.position}>
                        <TableCell className="font-bold text-primary">
                          {row.position}
                        </TableCell>
                        <TableCell className="font-semibold">{row.team}</TableCell>
                        <TableCell className="text-center">{row.played}</TableCell>
                        <TableCell className="text-center text-green-600 font-semibold">
                          {row.won}
                        </TableCell>
                        <TableCell className="text-center text-yellow-600 font-semibold">
                          {row.drawn}
                        </TableCell>
                        <TableCell className="text-center text-red-600 font-semibold">
                          {row.lost}
                        </TableCell>
                        <TableCell className="text-center">{row.goalsFor}</TableCell>
                        <TableCell className="text-center">{row.goalsAgainst}</TableCell>
                        <TableCell className="text-center">{row.goalDifference}</TableCell>
                        <TableCell className="text-center font-bold text-primary">
                          {row.points}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
