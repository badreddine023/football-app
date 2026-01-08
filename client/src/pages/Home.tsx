import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import MatchCard from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Zap, Calendar as CalendarIcon, Trophy as TrophyIcon } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useMatches } from "@/hooks/useMatches";

export default function Home() {
  const { t, isRTL } = useLanguage();
  const { matches, loading, error, refetch } = useMatches();

  const liveMatches = matches.filter((m) => m.status === "LIVE" || m.status === "IN_PLAY");
  const upcomingMatches = matches.filter((m) => m.status === "SCHEDULED" || m.status === "TIMED");
  const finishedMatches = matches.filter((m) => m.status === "FINISHED");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeRoute="/" />
      <main className={cn("flex-1 transition-all duration-300", isRTL ? "mr-64" : "ml-64")}>
        <HeroBanner
          title={t.liveFootball}
          subtitle={t.realTimeUpdates}
          backgroundImage="/images/hero-stadium.jpg"
        />

        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-black font-heading tracking-tight">{t.todayMatches}</h2>
            </div>
            <Button
              onClick={refetch}
              disabled={loading}
              variant="outline"
              size="sm"
              className="gap-2 rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              {t.refresh}
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-6 rounded-2xl mb-8 flex items-center gap-4">
              <div className="p-2 bg-destructive/20 rounded-full">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">API Connection Issue</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-card/50 animate-pulse rounded-2xl border border-border" />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Live Matches */}
              {liveMatches.length > 0 && (
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <h3 className="text-xl font-bold font-heading text-red-500 uppercase tracking-wider">
                      {t.liveNow} ({liveMatches.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveMatches.map((match) => (
                      <MatchCard key={match.id} {...match} />
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming Matches */}
              {upcomingMatches.length > 0 && (
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-2 mb-6">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold font-heading uppercase tracking-wider">
                      {t.upcomingMatches} ({upcomingMatches.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingMatches.map((match) => (
                      <MatchCard key={match.id} {...match} />
                    ))}
                  </div>
                </section>
              )}

              {/* Finished Matches */}
              {finishedMatches.length > 0 && (
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="flex items-center gap-2 mb-6">
                    <TrophyIcon className="w-5 h-5 text-muted-foreground" />
                    <h3 className="text-xl font-bold font-heading text-muted-foreground uppercase tracking-wider">
                      {t.recentResults} ({finishedMatches.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
                    {finishedMatches.map((match) => (
                      <MatchCard key={match.id} {...match} />
                    ))}
                  </div>
                </section>
              )}

              {/* No Matches */}
              {matches.length === 0 && (
                <div className="text-center py-20 bg-card/30 rounded-3xl border border-dashed border-border">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <CalendarIcon className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-bold text-muted-foreground mb-6">{t.noMatches}</p>
                  <Button onClick={refetch} variant="default" className="rounded-full px-8">
                    {t.tryAgain}
                  </Button>
                </div>
              )}

              {/* CTA Section */}
              <section className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <h3 className="text-2xl font-bold font-heading mb-3">
                  {t.wantPredictions}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t.checkPredictions}
                </p>
                <Link href="/predictions">
                  <a>
                    <Button className="gap-2">
                      {t.viewPredictions}
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
