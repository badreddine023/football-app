import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStandings } from "@/hooks/useStandings";
import { COMPETITION_CODES } from "@/lib/footballApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, AlertCircle } from "lucide-react";

export default function Standings() {
  const { t, isRTL } = useLanguage();
  const [selectedLeague, setSelectedLeague] = useState("PL");
  const { standings, loading, error } = useStandings(selectedLeague);

  const leagues = [
    { code: "PL", name: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { code: "PD", name: "La Liga", icon: "🇪🇸" },
    { code: "BL1", name: "Bundesliga", icon: "🇩🇪" },
    { code: "SA", name: "Serie A", icon: "🇮🇹" },
    { code: "FL1", name: "Ligue 1", icon: "🇫🇷" },
    { code: "ASL", name: "Saudi Pro League", icon: "🇸🇦" },
    { code: "MLS", name: "MLS", icon: "🇺🇸" },
    { code: "BSA", name: "Serie A Brazil", icon: "🇧🇷" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeRoute="/standings" />
      <main className={cn("flex-1 transition-all duration-300", isRTL ? "mr-64" : "ml-64")}>
        <HeroBanner
          title={t.leagueStandings}
          subtitle={t.currentStandings}
        />
        
        <div className="container mx-auto px-4 py-8">
          {/* League Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 pb-2 overflow-x-auto no-scrollbar">
            {leagues.map((league) => (
              <button
                key={league.code}
                onClick={() => setSelectedLeague(league.code)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap",
                  selectedLeague === league.code
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                    : "bg-card text-card-foreground border-border hover:border-primary/50"
                )}
              >
                <span>{league.icon}</span>
                <span className="font-medium">{league.name}</span>
              </button>
            ))}
          </div>

          <Card className="overflow-hidden border-none shadow-xl bg-card/50 backdrop-blur-sm">
            <div className="p-0 sm:p-6">
              <div className="flex items-center gap-3 mb-6 px-6 pt-6 sm:p-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading">
                  {leagues.find(l => l.code === selectedLeague)?.name}
                </h2>
              </div>

              {loading ? (
                <div className="space-y-4 p-6">
                  {[...Array(10)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                  <p className="text-lg font-medium text-destructive">{error}</p>
                  <p className="text-muted-foreground mt-2">Some leagues may require a premium API key</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-16 text-center font-bold">{t.pos}</TableHead>
                        <TableHead className="min-w-[200px]">{t.team}</TableHead>
                        <TableHead className="text-center">{t.played}</TableHead>
                        <TableHead className="text-center">{t.won}</TableHead>
                        <TableHead className="text-center">{t.drawn}</TableHead>
                        <TableHead className="text-center">{t.lost}</TableHead>
                        <TableHead className="text-center hidden md:table-cell">{t.gf}</TableHead>
                        <TableHead className="text-center hidden md:table-cell">{t.ga}</TableHead>
                        <TableHead className="text-center">{t.gd}</TableHead>
                        <TableHead className="text-center font-bold text-primary">{t.pts}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {standings.map((row) => (
                        <TableRow key={row.position} className="hover:bg-primary/5 transition-colors">
                          <TableCell className="text-center font-bold">
                            <span className={cn(
                              "inline-flex items-center justify-center w-8 h-8 rounded-full",
                              row.position <= 4 ? "bg-primary/10 text-primary" : "text-muted-foreground"
                            )}>
                              {row.position}
                            </span>
                          </TableCell>
                          <TableCell className="font-semibold">
                            <div className="flex items-center gap-3">
                              <span className="truncate">{row.team}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-medium">{row.played}</TableCell>
                          <TableCell className="text-center text-green-600 font-bold">
                            {row.won}
                          </TableCell>
                          <TableCell className="text-center text-yellow-600 font-bold">
                            {row.drawn}
                          </TableCell>
                          <TableCell className="text-center text-red-600 font-bold">
                            {row.lost}
                          </TableCell>
                          <TableCell className="text-center hidden md:table-cell text-muted-foreground">
                            {row.gf}
                          </TableCell>
                          <TableCell className="text-center hidden md:table-cell text-muted-foreground">
                            {row.ga}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            <span className={cn(
                              row.goalDifference > 0 ? "text-green-600" : row.goalDifference < 0 ? "text-red-600" : ""
                            )}>
                              {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                            </span>
                          </TableCell>
                          <TableCell className="text-center font-black text-primary text-lg">
                            {row.points}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
