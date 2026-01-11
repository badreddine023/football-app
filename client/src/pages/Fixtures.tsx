import { useState } from "react";
import Layout from "@/components/Layout";
import MobileHeader from "@/components/MobileHeader";
import MatchTabs from "@/components/MatchTabs";
import DatePicker from "@/components/DatePicker";
import PromoBanner from "@/components/PromoBanner";
import LeagueSection from "@/components/LeagueSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMatches } from "@/hooks/useMatches";
import { Loader2 } from "lucide-react";

export default function Fixtures() {
  const { t, isRTL } = useLanguage();
  const { matches, loading } = useMatches();
  const [activeTab, setActiveTab] = useState<"today" | "tournaments" | "dates">("today");
  const [selectedDate, setSelectedDate] = useState(new Date("2026-01-11"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Group matches by league
  const groupedMatches = matches.reduce((acc, match) => {
    const league = match.competition || "Other";
    if (!acc[league]) {
      acc[league] = [];
    }
    acc[league].push(match);
    return acc;
  }, {} as Record<string, typeof matches>);

  return (
    <Layout activeRoute="/fixtures">
      <div className="min-h-screen bg-sidebar text-sidebar-foreground flex flex-col lg:hidden">
        {/* Mobile Header */}
        <MobileHeader
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Match Tabs */}
        <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Date Picker */}
        <DatePicker onDateChange={setSelectedDate} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {/* Promotional Banner */}
          <PromoBanner />

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Matches by League */}
              {Object.entries(groupedMatches).map(([league, leagueMatches]) => (
                <LeagueSection
                  key={league}
                  leagueName={league}
                  matches={leagueMatches}
                />
              ))}

              {/* No Matches */}
              {matches.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sidebar-foreground/60">{t.noMatches}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-black mb-8">{t.fixtures}</h1>
          {/* Desktop layout can remain the same */}
        </div>
      </div>
    </Layout>
  );
}
